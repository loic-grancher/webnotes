---
title: Docker networking
sidebar:
    order: 4
---

## What is Docker Networking
Docker networking allow us to create subnetworks in our server to allow some containers to communicate within a sub-network, between different sub-networks, to let them access the internet or not.

7 different types of networks:

When checking our IP, we are shown the following info: (we use `ip address show`)
- loopback IP
- main interface (enp0s3) connected to our home network (inet)
- ![[ip_address_info.png ]]

## Settings
Check that your WIFI or ethernet card has the same MAC address as your VM.
Accessible dans windows, connexion réseau.
Authorise promiscuity.


## 1. The default bridge
### Setting up
In my VM setting : NAT to bridge adapter (réseau par pont)
I am then connected from my VM directly to my home network
![[bridge_network_schema.png | 500]]
Once docker is installed, we get a new docker0 ip address

### Docker0
Docker0 is our new virtual bridge interface. 

`sudo docker network ls` => list our current networks

DRIVER = network type 
Our virtual bridge  has a "bridge" driver

`sudo docker run -itd --rm --name thor busybox`
By default, the containers we create run in the bridge network.

Docker created one virtual ethernet interface for each running container
We can use `bridge link` to check which ones are connected to docker0


`sudo docker inspect bridge`
The bridge also gives each container its own IP address in the docker0 network.
Like other networks, it has DHCP, DNS... 
Containers can talk to each other since they're on the same network. Docker0 acts like a switch.


### Testing the docker0 network
You can for example connect to the shell of one container:
`sudo docker exec -it busyboxContainer sh`
And ping another running container (you can check their IP with `sudo docker inspect bridge`):
`ping 127.0.0.3`

You can also ping the internet:
`ping networkchuck.com`

We can check the getway using `ip route` that it uses to access the internet.

This is allowed by **NAT Masquerade**

### Issue: accessing a running service from outside our VM

This does not work by default, you need to expose port 80 for example.

For that we redeploy our container by specifying the port:
`sudo docker run -itd --rm -p 80:80 --name thor busybox`

==Default bridge is NOT recommended though

## 2. The User-defined Bridge
A network runs in a container
It it preferred for isolation purposes.. I can't ping a container from another if it's not on the same network.

Here "asgard" is our user-defined network and 172... is the default one.
Creating a network:
`sudo docker network create myNetwork`

We can check that a new bridge is running
`ip address show` or (better) `sudo docker network ls`=> **br-** ez234ff234

### Launching a container on a speific network
`sudo docker run -itd --rm --network myNetwork -- name busyBox3 busybox`

With `sudo docker inspect myNetwork` I can tell which containers are running on this newly created network

On a same network (when user created) you can ping other containers by name.
In the previous example (picture), you can `ping odin` from loki:
`sudo docker exec -it loki sh` => `ping odin`

## 3. Host network

Start a host network:
`sudo docker run -itd --rm --network host --name stormbreaker nginx`

"stormbreaker" is moved next to the host
It doesn't have its own network, it shares the host's ports, so no need to expose any of them.
![[host-network.png | 500]]

Problem: provides no isolation

## 4. macVLAN
### macVLAN bridge mode
#### Definition
It's like connecting our containers directly to our network switch. The containers will have their own IP and MAC address.


#### Creating the network
`sudo docker network create -d macvlan --subnet 192.168.0.28/24 --gateway 192.168.0.254 -o parent=enp0s3 newasgard`

We can then run our docker container on that network (us an IP that is not used but that's in the right range):

#### Adding a container on the network
`sudo docker run -itd --rm --network newasgard --ip 192.168.0.30`

#### Issues
We can't ping from the inside of our container. 
==Problem: each container has their own mac address, and your network might not be able to have several on only one switch port.

This is called "promiscuous mode", when several container are on the same switch port.

To activate it:
`sudo ip link set enp0s3 promisc on`
You can/might have to activate it on virtualbox.
Then reboot and redo the process.

If I were to deploy a web server on that container (like an nginx server), I don't need to expose any port.

You don't get DHCP (Ip address attributed to the process).  Docker will try to create an IP for you but it might create issues.

### macVLAN 802.1q mode
#### Definition
macVLAN has 2 modes: 
- bridge mode
- 802.1q mode: you can connect your containers to your network directly, but also specify a sub-interface (eth0.20, eth0.30). 
#### Creating the network
`sudo docker network create -d macvlan --subnet 192.168.0.28/24 --gateway 192.168.0.254 -o parent=enp0s3.20 newasgard`

Docker will create the enp0s3.20 sub-interface

## 5.IPvlan 
## IPvlan L2
#### Definition
2 modes: l2 and l3. Default is l2
![[IPVlan_L2.png | 500]]
This will give the same mac address to the containers than the mac of the host. 
Basically, orders comming from the containers will have the same "ID" as those coming from the computer.

However, the containers will still have the same IP on our network. 

#### Creating the network
`sudo docker network create -d ipvlan --subnet 192.168.0.28/24 --gateway 192.168.0.254 -o parent=enp0s3 newasgard`

#### Adding a container on the network
We add our container:
`sudo docker run -itd --rm --network newasgard --ip 192.168.0.30 --name thor busybox`

### IPvlan L3
#### Definition

All about L3.

We connect our containers to our host as if our host was a router.
First i create networks that are not yet linked to my host, they are not reachable.
![[ipvlan_L3_step1.png | 300]]

They will then connect to my host only on l3 layers. 

You get more control and more isolation that way as you can control who can reach these networks.

I then tell my home network, "if you want to talk to this container, talk to my ubuntu server IP"

#### Creating the network
You need access to your local router:
We don't specify the gateway here. 

`sudo docker network create -d ipvlan --subnet 192.168.0.0/24 -o parent=enp0s3 -o ipvlan_mode=l3 --subnet 192.168.1.0/24 newasgard`

#### Adding a container on the network

`sudo docker run -itd --rm --network newasgard --ip 192.168.0.24 --name thor busybox`
`sudo docker run -itd --rm --network newasgard --ip 192.168.0.25 --name mjolnir busybox`

`sudo docker run -itd --rm --network newasgard --ip 192.168.1.24 --name odin busybox`
`sudo docker run -itd --rm --network newasgard --ip 192.168.1.25 --name loki busybox`

![[ipvlan_L3_step2.png |500]]

Our containers cannot reach internet because nothing can be sent back.
They can ping other containers that are not necessarily on the same network though, since they have the same parent interface.

You then need to create static routes in your router.

## 6.Overlay network
If you have several hosts running containers across several machines, using Kubernetes or Docker Swarm.

## 7.No network

It will create a container without an IP or anything.

