---
title: Configure
---
# Configure

::: warning NOTE
This information is for customers of our [self-hosted](http://fivefilters.org/content-only/#download) version of PDF Newspaper. It comes pre-configured to work out of the box, so if you're not comfortable editing files, don't feel you have to change anything to get up and running.
:::

PDF Newspaper has a number of options which you can change in the configuration file to suit your needs. They are not all documented here yet, but the config.php file contains comments above each option which should give you an idea.

If you'd like to make any configuration changes, we suggest you follow these steps *after* you've made sure FTR is working as expected.

## Create a custom config file

1. Save a copy of config.php as custom_config.php
1. Edit custom_config.php

When custom_config.php is present, it is loaded automatically after config.php. This means the config options in config.php are overridden with the ones in custom_config.php.

## Restrict Access

If you'd like to limit access to your copy of PDF Newspaper, you can set up access keys.

### Require access key

To configure PDF Newspaper to require the user to enter an access key to generate a PDF you will need to make two changes to custom_config.php:

1. Add a key. For example, to use 'ABC333' as our key, we add the following line:
    ``` php
    $options->api_keys[1] = 'ABC333';
    ```
1. Tell PDF Newspaper to require a key:
    ``` php
    $options->key_required = true;
    ```

::: warning NOTE
Each key must have its own unique index number, 1 in the example above. When generating PDFs, we encode the key and refer to it by its index number. This ensures those who access the resulting PDF via the URL generated cannot see the key used to generate it.
:::

## Caching

Caching is enabled by default. For cache files to be written, ensure the `cache` folder and its 2 sub folders are writable. (You might need to change the permissions of these folders to 777 through your FTP client.)

Cached files are automatically cleared: around 10% of the calls to `makepdf.php` will result in a purge of the cache.

::: tip
If you make changes to your configuration after you've generated PDFs, it is a good idea to delete the PDF files in the cache folder to ensure your configuration changes are taken into account the next time you generate a PDF.
:::