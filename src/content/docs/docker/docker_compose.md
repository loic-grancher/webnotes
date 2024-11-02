---
title: Docker compose
sidebar:
    order: 5
---
## Setting up Docker Compose

We create a directory and move to it
`mkdir coffeetime`
`cd coffeetime`

Create a file
`nano docker-compose.yaml`
It's good to ==use the name "docker-compose" ==because docker will look for that name by default.

## Docker compose file
```yaml
## docker-compose.yaml
version: "3"
services:
	website:
		image: nginx
		ports: 
			- "8081:80"
		restart: always

```

Exit

In the same folder as the compose file (else you'd need to use -f):
`sudo docker-compose up -d`

**Network**: Docker Compose automatically creates a "default bridge" network an runs our container within it. "Creating network 'coffeetime_default' with the default driver"



### Checking the container is running
`sudo docker ps` : for all containers
`sudo docker-compose ps`: for containers created with docker compose

### Stopping container
`sudo docker-compose down` : stop and deletes container
`sudo docker-compose stop` : stop the container

## Creating several containers at once

```yaml
## docker-compose.yaml
version: "3"
services:
	website:
		image: nginx
		ports: 
			- "8081:80"
		restart: always
	website2:
		image: nginx
		ports: 
			- "8082:80"
		restart: always

```

## Adding a network

- Open your docker compose file
- Define a network (same level as services)
- ipam= ip address management
```yaml
## docker-compose.yaml
version: "3"
services:
	website:
		image: nginx
		ports: 
			- "8081:80"
		restart: always
		networks:
			coffee:
				ipv4_address: 192.168.92.21
networks:
	coffee:
	ipam:
		driver: default
		config:
			- subnet: "192.168.92.0/24"
```

## Deploying Wordpress in Docker
A coerk-compose file is useful, because WP has :
- a frontend webapp
- a database (mysql)
We will deploy these 2 in separate containers.

Environment: specific parameters within this container.


```yaml
services:
	wordpress:
	    image: wordpress
	    ports:
	      -"8089:80"
	    environment:
			WORDPRESS_DB_HOST: mysql
			WORDPRESS_DB_USER: root
			WORDPRESS_DB_PASSWORD: "coffee"
			WORDPRESS_DB_NAME: wordpress
	mysql:
		image: "mysql"
		environment:
			MYSQL_DATABASE: wordpress
			MYSQL_ROOT_PASSWORD: "coffee"
```

- Now we indicate what container depends on which. It will start first mysql, then wp.
- ==volumes==: it allows to map a docker directory to one on our system, so the data is kept. Here we create a mysql folder in our computer, and link it to the var/lib/mysql file on the container
- When I run "docker-compose down", the content of mysql folder will still be intact, so if I restart the service the data will be there.
- Create a network and put our containers within it

```yaml
services:
	wordpress:
	    image: wordpress
	    ports:
		    -"8089:80"
	    depends_on:
			- mysql
	    environment:
			WORDPRESS_DB_HOST: mysql
			WORDPRESS_DB_USER: root
			WORDPRESS_DB_PASSWORD: "coffee"
			WORDPRESS_DB_NAME: wordpress
		networks:
			ohyeah:
				ipv4_address: "10.56.1.21"
	mysql:
		image: "mysql"
		environment:
			MYSQL_DATABASE: wordpress
			MYSQL_ROOT_PASSWORD: "coffee"
		volumes:
			- ./mysql:/var/lib/mysql
		networks:
			ohyeah:
				ipv4_address: "10.56.1.20"
networks:
	ohyeah:
		ipam:
			driver:default
			config:
				- subnet: "10.56.1.0/24"
	
```

## Ressource for easy docker compose files
https://github.com/docker/awesome-compose


