---
title: From dev to prod
---
## Project structure
```yaml
frontend
	files
	Dockerfile.dev
	Dockerfile.prod

backend
	files
	Dockerfile.dev
	Dockerfile.prod

docker-compose
docker-compose.dev
docker-compose.prod
```
Here is how to set up a dev environment, then a production in Docker and Docker Compose, and finally how to write a script to execute it easily.
This example use React+vite & Node+Express.

## Creating the Dockerfile.dev files
### React Example

❗Remember to check if there is a "dev" script in package.json
```dockerfile
# /frontend/Dockerfile.dev

# Base image
FROM node:alpine
# name of our work folder
WORKDIR /frontend_app
# copy package.json and install dependencies
COPY package*.json .
# install dependencies
RUN npm install
# copy all files
COPY . .
# expose port
EXPOSE 5173

CMD [ "npm", "run", "dev" ]
```

### Express example

❗Remember to check if there is a "dev" script in package.json
```dockerfile
# /backend/Dockerfile.dev

FROM node:alpine
# name of our work folder
WORKDIR /backend_app
# copy package.json and install dependencies
COPY package.json .
# install dependencies
RUN npm install
# copy all files
COPY . .
# expose port
EXPOSE 3000
# start app
CMD ["npm", "run" , "dev"]
```

## Creating the Dockerfile.prod files
These will be multi stage built, one to build the project, one to host it.
NGINX will serve the final app (better than default server)

NOTE: you can either use NGINX for the front app only, or at root level to serve each app.
### React Example

FACULTATIVE
First, create a nginx config file (/frontend/nginx.conf).
```nginx
server {
	listen 80;
	location / {
		root /usr/share/nginx/html;
		index index.html index.htm;
		try_files $uri $uri/ /index.html; # For SPA routing
	}
	location /api {
		proxy_pass http://frontend:5173; # Adjust this to your service URL
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}
```


NOTE: Vite exports the build in "/dist" where other tools use "/build"
```Dockerfile
# /frontend/Dockerfile.prod
FROM node:alpine AS build
WORKDIR /frontend_app
COPY package.json .
RUN npm install
COPY . .

# Build the app
RUN npm run build
# Use nginx image
FROM nginx

# Get the built app and copy to nginx folder to serve
# The --from allow to copy from a different image, here the one we called "build"
# IN VITE IT IS IN DIST, not in BUILD
COPY --from=build /frontend_app/dist /usr/share/nginx/html

#if necessary
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

### Express Example

- Note:  by default, NODEjs does not need to build to be used, so you don't need NGINX, unless at root level to manage several apps.

Create your Dockerfile.prod
```Dockerfile
FROM node:alpine
WORKDIR /backend_app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000

CMD [ "node", "index.js" ]
```
## Adding Dockerignore files
Create one in frontend and one in backend folders
```.dockerignore
.git
.vscode
.dockerignore
.gitignore
.env
config
build
node_modules
docker-compose.dev.yaml
docker-compose.prod.yaml
docker-compose.yaml
Dockerfile
Dockerfile.dev
Dockerfile.prod
Makefile
README.md
```

## Docker compose file
At the root of the project (where frontend and backend are):
### Common docker-compose file (dev & prod)

Here we only indicate the root path of the build for each service 
```yaml
# docker-compose.yaml
version: '3.8'
services:
	backend:
		build: 
			context: ./backend
	frontend:
		build:
			context: ./frontend
```

### Docker compose for dev
```yaml
# docker-compose.dev.yaml
services:
	backend:
		image: backend-dev-image
		build:
			dockerfile: Dockerfile.dev
		container_name: backend-dev-container
		volumes:
			- ./backend:/backend_app
			- node_modules:/backend_app/node_modules
		ports:
			- 3000:3000
		environment:
			- NODE_ENV=development
	
	
	frontend:
		image: frontend-dev-image
		depends_on:
			- backend
		build:
			dockerfile: Dockerfile.dev
		container_name: frontend-dev-container
		volumes:
			- ./frontend:/frontend_app
			  # THIS CAN CAUSE ISSUE with VITE !
			- # - node_modules:/frontend_app/node_modules/
		ports:
			- 5173:5173
		environment:
			- NODE_ENV=development

volumes:
	node_modules:
```


### Docker compose for prod
```yaml
# docker-compose.dev.yaml
services:
	backend:
		image: backend-prod-image
		build:
			dockerfile: Dockerfile.prod
		container_name: backend-prod-container
		ports:
		- "3000:3000"
		environment:
			- NODE_ENV=production
	
	frontend:
		depends_on:
			- backend
		image: frontend-prod-image
		build:
			dockerfile: Dockerfile.prod
		container_name: frontend-prod-container
		ports:
			- "5173:80"
		environment:
			- NODE_ENV=production
```

## Creating a script to run containers
In the root, we create a "bin" folder, in which we create "deploy.sh"

we need to make the file executable, so we run:
```sh
chmod u+x deploy.sh
```

The content of the file:
```sh
#!/bin/bash
if [[ $1 == "prod" || $1 == "dev" ]] && [[ $2 == "down" || $2 == "up" ]]; then
	cd ..
	fileEnv="docker-compose.${1}.yaml"
	downOrUp=$2
	echo "Running docker compose -f docker-compose.yaml -f $fileEnv $downOrUp"
	docker compose -f docker-compose.yaml -f $fileEnv $downOrUp
else
	echo "Usage: ./bin/deploy.sh prod|dev down|up"
fi
```