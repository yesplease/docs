---
title: Hosting
---

# Hosting

Full-Text RSS should works on most PHP hosting environments, but to get the most out of it, and to get the same results as our hosted service, we recommend you set up your server according to the instructions here.

Our [Installation](/full-text-rss/installing.html) page explains how to upload Full-Text RSS to servers which offer FTP access.

## Hosted plans

We offer [hosted plans for developers](https://market.mashape.com/fivefilters/full-text-rss) as well as [hosted plans for news enthusiasts](http://fivefilters.org/content-only/#section-pricing). These are the best options if you don't want to manage your own hosting account.

## Self hosting

::: tip QUICK START
If you're a customer, try our Easy Install steps when you login via the [member page](https://member.fivefilters.org/). The steps and script there will set up the server **and** install Full-Text RSS for you on your VPS server. It's the quickest way to get started.
:::

While Full-Text RSS can be used with most hosting accounts, we recommend running it on a VPS with our server initialisation script which will install all the necessary components.

We have a script to set your system up with all the necessary components. The steps will install (via Puppet) Apache, PHP and the extensions required to run Full-Text RSS and the rest of our PHP software.

::: warning NOTE
We recommend using your newly set up VPS server only for Full-Text RSS. But remember, with a VPS, system security and updates will be your responsibility.
:::

### [Hetzner Cloud (VPS)](https://hetzner.cloud/?ref=wU7uWRgHj6rP)

1. Create an account with [Hetzner Cloud](https://hetzner.cloud/?ref=wU7uWRgHj6rP) (free €20 credit with link)
1. Login
1. Add a server
1. Select Ubuntu 18.04 server image
1. Select the plan with 2GB memory
1. Click 'Create'
1. SSH into your newly created server using login details sent to your email
1. From the command line, enter the following commands, one line at a time: 
    ```
    apt-get update
    apt-get -y install puppet
    wget https://bitbucket.org/fivefilters/hosting/raw/master/ubuntu-18.04.pp
    puppet apply ubuntu-18.04.pp
    ```
1. That last command may take some time as various components are installed. You should see output which looks something like this: [puppet output](https://bitbucket.org/fivefilters/hosting/src/master/puppet-output.txt)
1. Apache should be up and running now. Test by visiting 
`http://[ip-sent-to-you-by-hetzner]`
1. Full-Text RSS can now be uploaded to `/var/www/html/` using SFTP (same login details)


### [DigitalOcean (VPS)](https://www.digitalocean.com/?refcode=53aa778d0c4a)

1. Create an account with [DigitalOcean](https://www.digitalocean.com/?refcode=53aa778d0c4a)
1. Login and enter billing info (you should get $10 credit using our link above)
1. Create a droplet
1. Enter something in the hostname field (e.g. full-text-rss)
1. Select the plan with 1GB or 2GB memory
1. Select Ubuntu 18.04 x64 server image
1. Click 'Create'
1. SSH into your newly created server using login details sent to your email
1. From the command line, enter the following commands, one line at a time: 
    ```
    apt-get update
    apt-get -y install puppet
    wget https://bitbucket.org/fivefilters/hosting/raw/master/ubuntu-18.04.pp
    puppet apply ubuntu-18.04.pp
    ```
1. That last command may take some time as various components are installed. You should see output which looks something like this: [puppet output](https://bitbucket.org/fivefilters/hosting/src/master/puppet-output.txt)
1. Apache should be up and running now. Test by visiting `http://[ip-sent-to-you-by-digital-ocean]`
1. Full-Text RSS can now be uploaded to `/var/www/html/` using SFTP (same login details)
1. You can link this IP to a domain via the DigitalOcean admin panel - we won't discuss how to do that here.

### [Linode (VPS)](http://www.linode.com/?r=f97d3f09cdc72c58fb35d3382796a7d57e8e8664)

1. Create an account with [Linode](http://www.linode.com/?r=f97d3f09cdc72c58fb35d3382796a7d57e8e8664)
1. Login and add a 2GB Linode
1. From the dashboard of your new Linode, click 'Deploy a Linux Distribution'
1. In the distribution dropdown, select Ubuntu 18.04
1. For disk size, leave default or change to 10000 MB
1. Swap disk: leave default (256)
1. Enter a root password
1. Click 'Deploy'
1. Once done, click 'Boot' to start the server
1. When it's running, click on the 'Remote Access' tab. Here you'll see the IP address of your server
1. SSH into your account using your own client, or click the 'Launch Lish Ajax Console' which will let you connect in your browser
1. Log in using 'root' and the password you set earlier
1. From the command line, enter the following commands, one line at a time: 
    ```
    apt-get update
    apt-get -y install puppet
    wget https://bitbucket.org/fivefilters/hosting/raw/master/ubuntu-18.04.pp
    puppet apply ubuntu-18.04.pp
    ```
1. That last command may take some time as various components are installed. You should see output which looks something like this: [puppet output](https://bitbucket.org/fivefilters/hosting/src/master/puppet-output.txt)
1. Apache should be up and running now. Test by visiting `http://[your-linode-ip]`
1. Full-Text RSS can now be uploaded to `/var/www/html/` using SFTP (same login details)
