---
title: Configure
---
# Configure

::: warning NOTE
This information is for customers of our [self-hosted](http://fivefilters.org/content-only/#download) version of Full-Text RSS. It comes pre-configured to work out of the box, so if you're not comfortable editing files, don't feel you have to change anything to get up and running.
:::

Full-Text RSS (FTR) has a number of options which you can change in the configuration file to suit your needs. They are not all documented here yet, but the config.php file contains comments above each option which should give you an idea. View the default [config.php](https://gist.github.com/fivefilters/5582920) for version 3.9.1 to get an idea of what you can change.

If you'd like to make any configuration changes, we suggest you follow these steps after you've made sure FTR is working as expected.

## Create a custom config file

1. Save a copy of config.php as custom_config.php
1. Edit custom_config.php

When custom_config.php is present, it is loaded automatically after config.php. This means the config options in config.php are overridden with the ones in custom_config.php.

## Restrict Access

If you'd like to limit access to your copy of Full-Text RSS, there are a number of ways to achieve this.

### Require access key

Access keys let you group users - those with a key and those without. They can also act as passwords, preventing access to the service unless the user can provide a valid key. To configure FTR to require the user to enter an access key to generate a full-text feed you will need to make two changes to custom_config.php:

1. Add a key. For example, to use 'ABC333' as our key, we add the following line:
    ``` php
    $options->api_keys[1] = 'ABC333';
    ```
1. Tell FTR to require a key:
    ``` php
    $options->key_required = true;
    ```

::: warning NOTE
Each key must have its own unique index number, 1 in the example above. When generating feeds, we encode the key and refer to it by its index number. This ensures those who see the resulting feed cannot see the key used to generate it.
:::

### URL whitelisting

In addition to requiring an access key (or as an alternative to it), it's possible to tell FTR to only process URLs which match those in your whitelist. By default the whitelist is empty, meaning FTR will process any URL you give it. As soon as you add entries to the whitelist, FTR will only process URLs which contain one of the strings in your whitelist.

For example, you can tell FTR to only process URLs containing from example.org/feed and example.com/feed:

``` php
$options->allowed_urls[] = 'example.org/feed';
$options->allowed_urls[] = 'example.com/feed';
```

::: warning NOTE
Currently FTR will accept URLs which contains either of these strings in any part of the URL. This means if a user knows one of your whitelisted strings, they can circumvent this restriction by passing one of these strings in the querystring, for example: `http://should-be-blocked.org/?example.org/feed`. We'll have a better solution for this soon.
:::

### URL blacklisting

Similar to URL whitelisting, it's also possible to tell FTR to ignore URLs if they contain strings in your URL blacklist. This feature cannot be used in conjunction with URL whitelisting (if your whitelist is not empty, your blacklist will be ignored).

For example, to ignore/block URLs from example.org and example.com, you can add the following two lines:

``` php
$options->blocked_urls[] = 'example.org';
$options->blocked_urls[] = 'example.com';
```

## Caching

If you'd like to enable caching, we recommend you do it after you've configured everything else. Otherwise your changes to the configuration file may not immediately produce the result you want because of a previously cached copy.

1. Ensure the cache folder and its 2 sub folders are writable. (You might need to change the permissions of these folders to 777 through your FTP client.)
1. In custom_config.php, make sure you set caching to true: 
    ```
    $options->caching = true;
    ```

::: tip
If you do make changes to your configuration after you've enabled caching - you can test your changes without waiting for the cached copies to expire by temporarily disabling caching (`$options->caching = false;`)
:::

## Site Patterns

Site patterns allow you to control content extraction on a site-by-site basis. For more information, continue to the [Site Patterns](/full-text-rss/site-patterns.html) page.