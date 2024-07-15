---
title: Portainer.io
sidebar:
    order: 6
---

Portainer itself is a docker container. You can deploy it anywhere.

2 elements:
- portainer server
- portainer agent

If you have only 1 host: you only need portainer server. It will automatically manage your environment.
If you have a remote host: you install portainer agent on the remote host

## Install process

### Preparation
- Update packages `sudo apt update`
- Install docker `sudo apt install docker.io -y`
 
### Install docker portainer

#### Create a volume
We create a volume that will contain our portainer info and keep it consistent

```shell
docker volume create portainer_data
```
#### Portainer command


```sh
sudo docker run -d -p 9443:9443 -p 8000:8000 --name portainer --restart always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

#### Access the webGUI

Go to  https://<yourDockerIP/>:9443
==Warning: httpS==
Accept the security message

Find your Ip with `ip address show`

Create a user (admin) with a password (adminadminadmin) and ok.

## Navigating Portainer

"Get Started" => you access your current docker env
Select an environment (ex local machine)

Functionality:
- Start / stop / delete containers
- Access a shell for each one (you might need to adjust the shell depending on the linux distro)

### Creating a container
"add container"
- Give a name
- get an image from dockerhub
- setup ports
- activate tty for interactive purpose

### Creating an environment (for remote access)
- In the Environment tab
- Add environment
- Start Wizard
- Choose agent: if from outside your firewall, use edge agent
- Give it a name and leave the portainer server by default
- Create
- Docker standalone
- Copy code and paste it in remote env (connect to your remote server in terminal via ssh, and paste code with sudo)
- This command should have added a new environment with a "heartbeat status"
- I can enter this env and manage it

### Possible issues
- You can create networks
- Stacks (docker compose), but you can't manage it if created from outside of portainer
- Paste my docker compose file into the web editor and deploy
