---
title: Hosting
---

# Hosting

Full-Text RSS should works on most PHP hosting environments, but to get the most out of it, and to get the same results as our hosted service, we recommend you set up your server according to the instructions here.

Our [Installation](/full-text-rss/installation.html) page explains how to upload Full-Text RSS to servers which offer FTP access.

## Hosted plans

We offer [free and premium hosted plans](http://fivefilters.org/content-only/#section-pricing) for news enthusiasts. As well as [hosted plans for developers](https://market.mashape.com/fivefilters/full-text-rss). These are the best options if you don't want to manage your own hosting account.

## Self hosting

While Full-Text RSS can be used with most hosting accounts. We recommend running on a VPS with our server initialisation script which will install all the necessary components.

If you're a customer, try our Easy Install steps when you login via the [member page](https://member.fivefilters.org/). The script there will set up the server and install Full-Text RSS for you.

### [Hetzner Cloud (VPS)](https://www.hetzner.com/cloud)

We have a script to set your system up with all the necessary components to get up and running. If you'd like a quick way to get started, follow the steps below. Please only run these on a newly created instance running Ubuntu 18.04. The steps will attempt to install (via Puppet) Apache, PHP and the extensions required to run Full-Text RSS and the rest of our PHP software:

1. Create an account with Hetzner Cloud
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


::: tip
Note: While you should now have a working server capable of running our software, with a VPS you are expected to maintain the system. So security, updates, and anything else that needs to be done will be your responsibility. We recommend using your newly set up VPS server only for Full-Text RSS.
:::

