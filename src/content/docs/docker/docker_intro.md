---
title: Introduction do Docker
sidebar:
    order: 2
---


Images you find on dockerhub and images you write yourself are the same.

Once you run a container, if it stops, it is "saved" and you can start it again, until you remove it.

`docker ps` => show running containers
`docker ps -a` => show all containers
`docker stats` => show infos on containers

# Virtual machines

In the past: 1 hardware server = 1 OS
Issue: limited, costly

Hypervisor: similar to an OS, but aimed at helping you divide your server into several smaller OS
VMWARE is a hypervisor ESXI
We take a portion of our hardware server and create a "sytem (ubuntu, windows...)"
![[virtual_machine.png |200]]
# Docker 
## Why is it so fast ?
You only need ==one kernel== (for example if they're all Linux). You wouldn't be able to run windows  + linux on the same server.



With docker we install 1 OS on the whole server.
We install the docker engine and we can then use any OS

Containers have their own OS, CPS, Memory and Network
They are isolated from eachothers
![[docker.png | 200]]

