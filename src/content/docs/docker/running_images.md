---
title: Running Docker images 
sidebar:
    order: 3
---
## Finding a specific image and running it
- Going to dockerhub
- Find your image
- Copy url 
- check tags (frenchpress: corresponds to different versions of ubuntu)
`docker pull thenetworkchuck/nccoffee:frenchpress 


## Managing ports 
We run and specify a port (host:container): 
`docker run -d -t -p 80:80 --name nccoffee thenetworkchuck/nccoffee:frenchpress`
The website is then accessible from the IP of the VM

## Examples
### Installing CENTOS
`docker pull centos` => go to docker images and pull the image for centOS

`docker run -d -t --name centosContainer centos`

`docker ps` => show running containers

`docker exec -it centosContainer bash`

`exit`

### Installing Alpine
`docker pull alpine` => go to docker images and pull the image for alpine

`docker run -d -t --name alpineContainer alpine`

`docker ps` => show running containers

`docker exec -it alpineContainer bash`

`exit`



