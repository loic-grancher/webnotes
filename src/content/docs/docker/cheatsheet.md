---
title: Cheatsheet
sidebar:
    order: 1
---
## Installation 
```sh
sudo apt install docker.io docker-compose -y
```

## Pulling an image from Dockerhub
```sh
docker pull imageName 
```
## Starting a container
-d : detached mode, so your terminal stays free once it starts
-t : allow pseudo terminal for the container
-rm : remove when stopped

```sh
docker run -d -t --name containerName imageName
```
## Managing ports 
Runing while specifying a port (host:container): 
```sh
docker run -d -t -p 80:80 --name nccoffee thenetworkchuck/nccoffee:frenchpress
```


## Opening a container in bash
```sh
docker exec -it containerName bash
```

To exit the container
```sh
exit
```


## See your containers

### Show running containers
```sh
docker ps
```

### Show all containers
```sh
docker ps -a
```

### Show infos on containers
```sh
docker stats
```

## Networks
### List our current networks
```sh
sudo docker network ls
```
### See details of a network
```sh
sudo docker inspect <networkName>
```
### Create a network
```sh
sudo docker network create -d networkType --subnet 192.168.0.28/24 --gateway 192.168.0.254 -o parent=enp0s3 networkName
```

### Adding a container on the network
```sh
sudo docker run -itd --rm --network networkName --ip 192.168.0.30 --name containerName
```
