---
title: Installing and Updating
---

# Installing and Updating

We recommend following the steps on our [Hosting page](/full-text-rss/hosting.html) to create the optimal hosting environment for Full-Text RSS.

## Installing w/ (S)FTP

1. Extract the files in this ZIP archive to a folder on your computer
1. Using an FTP client, e.g. FileZilla, upload the files up to your server
1. Access index.php through your browser. E.g. http://example.org/full-text-rss/index.php
1. If you haven't done so already, click on the link to run the compatibility test to see if your server meets the requirements
1. Enter a URL in the form field to test the code
1. If you get an RSS feed with full-text content, all is working well.

## Configuring (Optional)

1. Save a copy of `config.php` as `custom_config.php` and edit `custom_config.php`
1. If you decide to enable caching, make sure the `cache` folder and its 2 sub folders are writable.
(You might need to change the permissions of these folders to 777 through your FTP client.)
1. If you want to use the admin area to edit/update your site config files, make sure the
`site_config` folder and its 2 sub folders are writable. (You might need to change the permissions
of these folders to 777 through your FTP client.)

## Testing (Optional, PHP 7 only)

You can test Full-Text RSS by trying to enter URLs into the form and checking the result.
But if you want to run our test suite, you should follow these steps on a new instance of 
Full-Text RSS, before making any changes to the configuration file. You will also need SSH access
to your server so you can execute commands from a terminal.

1. Download Codeception.phar from https://codeception.com/codecept.phar
and place it inside the root folder of Full-Text RSS (same directory as this README.txt)
    ```
    wget https://codeception.com/codecept.phar
    ```

1. Edit `codeception.yml` and change the URL if you've installed Full-Text RSS in a different 
location to the one shown.

3. Execute:
    ``` 
    php codecept.phar run --steps
    ```

## Updating

Each new version of Full-Text RSS comes with an `UPDATING.txt` file with step-by-step instructions. Please refer to that.

Generally, updating involves replacing everything with the new version with the following exceptions:

* If you configured the last version, copy `custom_config.php` from your old version to the new installation.
* If you added custom site config files (in `site_config/custom/`), copy those over to the new installation.
