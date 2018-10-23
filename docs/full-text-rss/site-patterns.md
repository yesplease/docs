---
title: Site Patterns
---
# Site Patterns

::: warning NOTE
This information is for customers of our [self-hosted](http://fivefilters.org/content-only/#download) version of Full-Text RSS. Developers using our hosted service can contact us to improve extraction for particular sites.
:::

Site patterns allow you to specify what should be extracted from specific sites.

Site patterns can be used if our automatic content extraction fails to pick out the correct content block for a particular site, or if additional fine tuning is required (e.g. to strip undesirable elements within the content block, to include images which are not being included, to follow a single-page link on multi-page articles.).

## GitHub repository

The site patterns used by Full-Text RSS are all [available on GitHub](https://github.com/fivefilters/ftr-site-config) released to the public domain. 

## Make your own (point-and-click)

We have an [experimental tool](http://siteconfig.fivefilters.org/) to help you create a simple one through a point-and-click interface.

## How it Works

After we fetch the contents of a page, we use the hostname (e.g. mysite.example.org) and check to see if a config file exists for that hostname. If there is a matching file (e.g. `mysite.example.org.txt` or `.example.org.txt`) in one of the config folders, we will fetch the rules it contains. If no such file is found, we attempt to detect the appropriate content block and title automatically. 

When there is a matching site config, we first try to use the patterns within to extract the content. If these patterns fail to match, we will, by default, revert to auto-detection — this gives us another chance to get at the content (useful when site redesigns invalidate our stored patterns).

A simple example of what might be found in the site config file for processing Wikipedia entries:

```
body: //div[@id = 'content']
strip_id_or_class: editsection
strip_id_or_class: toc
prune: no
```

## Fingerprints: Matching Without Hostnames

Some sites and blogging platforms (e.g. WordPress.com, Blogger.com) allow users to map their own domains to their sites. So, for example, a Wordpress user might choose to use example.org. Using fingerprints we can associate a site config file with a site based on clues in the site's HTML source, rather than its hostname.

This works by associating a fragment of HTML as a site's identifier (or fingerprint). Going back to our Posterous example, we can use `<meta name="generator" content="WordPress"` as an identifier string for WordPress and map it to the .wordpress.com.txt site config file. These can be added in custom_config.php (to see how these should look, open config.php and look for `$options->fingerprints`).

## Location of site config files

In the `site_config` folder you will find two subfolders: `standard` and `custom`. FTR comes with a number of existing site patterns in the 'standard' folder. It's possible to change these, but we suggest users place their own site patterns in the custom folder to prevent future updates overwriting their site patterns.

## Global rules

Global site config files accept everything regular site config file does, but are applied to all sites, whether or not a specific site config matches. There is a `global.txt` config file in the `site_config/standard/` folder. To add your own rules, create a `global.txt` file inside `site_config/custom/` and add your rules to that.

## Site config merging

Full-Text RSS looks for site config files in the following order:

1. URL hostname match or wildcard match in the site_config/custom/
1. URL hostname match or wildcard match in the site_config/standard/
1. fingerprint match (HTML fragment mapping to hostname) in site_config/custom/
1. fingerprint match (HTML fragment mapping to hostname) in site_config/standard/
1. global rules in site_config/custom/global.txt
1. global rules in site_config/standard/global.txt

Any matching files are merged, with rules from files higher up in the list taking priority. If, however, one of these files contains `autodetect_on_failure: no` then the files beneath it will not be merged.

## XPath

To select elements for extraction or removal, we use XPath. If you're not familiar with the syntax, there's a nice tutorial here: [XPath 1.0 tutorial](http://zvon.org/comp/r/tut-XPath_1.html#Pages~List_of_XPaths).

## Pattern Format

The pattern format was borrowed from early versions of Instapaper. You'll find plenty of examples by opening the text files inside the `site_config/standard` folder or by browsing our GitHub repository.

We currently recognise the following directives:

### title: [XPath]

The page title. XPaths evaluating to strings are also accepted. Multiple statements accepted. Will evaluate in order until a result is found. If not specified or no match found, it will be auto-detected. The title is placed in the `<title>` element, inside the feed's item element.

::: tip
If the input URL points to a feed, the item's title in the feed will not be changed - we assume item titles in feeds are not truncated. Since Full-Text RSS 3.1 you can use the extracted title. To do so you should pass `&use_extracted_title` in the querystring. To enable/disable this for for all feeds, see the config file - specifically `$options->favour_feed_titles`
:::

**Example**
```
title: //h1[@id='title']
```

### body: [XPath]

The body of the article. Multiple statements accepted. Will evaluate in order until a result is found. If not specified or no match found, it will be auto-detected. The body is placed in the `<description>` element, inside the feed's item element.

**Example**
```
body: //div[@id='body']
# also possible to specify multiple 
# elements to be concatenated:
body: //div[@class='summary'] | //div[@id='body']
```

### date: [XPath]

The publication date. XPaths evaluating to strings are also accepted. Multiple statements accepted. Will evaluate in order until a result is found. The date is placed in the `<pubDate>` element, inside the feed's item element.

**Example**
```
date: //span[@class='date']
```

### author: [XPath]

The author(s) of the piece. XPaths evaluating to strings are also accepted. Multiple statements accepted. Will evaluate in order until a result is found. Each author is placed in a `<dc:author>` element, inside the feed's item element.

**Example**

```
author: //span[@class='author']
```

### strip: [XPath]

Strip any matching elements and their children. Multiple statements accepted.

**Example**
```
strip: //div[@class='hidden']
strip: //div[@id='content']//p[@class='promo']
```

### strip_id_or_class: [string]

Strip any element whose @id or @class contains this substring. Multiple statements accepted.

**Example**

```
strip_id_or_class: hidden
strip_id_or_class: navigation
```

### strip_image_src: [string]

Strip any `<img>` element where @src attribute contains this substring. Multiple statements accepted.

**Example**

```
strip_image_src: /advert/
strip_image_src: /tracker/
```

### tidy: [yes|no]

Preprocess with Tidy. Tidy usually helps clean up the HTML for processing. It can, however, sometimes make matters worse. If it does, try setting this to no. (This setting may affect the final DOM tree produced, and with it affect your xpath expressions – so if your xpath is failing to match the desired elements, try setting this to 'no' to see if helps.)

::: warning NOTE
If not explicitly set, when we use a HTML5 parser (HTML5-PHP or Gumbo), we do not run tidy on the content first, but we will run it if using libxml to parse.
:::

**Example**

```
tidy: no
```

### prune: [yes|no] (default: yes)

Strip elements within body that do not resemble content elements. Sometimes this leads to elements which you'd like to keep from being stripped. If that happens, set this to no.

**Example**

```
prune: no
```

### autodetect_on_failure: [yes|no] (default: yes)

If set to no, we will not attempt to auto-detect the title or content block if the given title/body expressions fail to match.

**Example**
```
autodetect_on_failure: no
```

### single_page_link: [XPath]

Identifies a link element or URL pointing to the page holding the entire article. This is useful for sites which split their articles across multiple pages. Links to such pages tend to display the first page with links to the other pages at the bottom. Often there is also a link to a page which displays the entire article on one page (e.g. 'print view' or 'single page'). This should be an XPath expression identifying the link to that page. If present and we find a match, we will retrieve that page and the site config options will be applied to the new page.

**Examples**
```
single_page_link: //span[@class='singlePage']/a
single_page_link: //a[contains(@href, '/print/')]
```

### single_page_link_in_feed: [XPath]

Same as above, but applied to item description HTML taken from feed. Please be aware that the same article URL may appear in a variety of feeds which do not always contain the same item description. If both single_page_link and single_page_link_in_feed appear in the site config, single_page_link_in_feed will be ignored.

**Example**
```
single_page_link_in_feed: //a
```

### next_page_link: [XPath]

Identifies a link element or URL pointing to the next page of a multi-page article. This is useful for sites which split their articles across multiple pages but do not offer a single page view (if a single page view is provided, please use single_page_link instead - it'll be much faster). If present and we find a match, we will retrieve that page and the site config options will be applied to the new page. If the next_page_link matches a link on this new page, the process will continue. Finally the content will be joined together. (Introduced in version 3.0.)

**Examples**
```
next_page_link: //a[@id='next-page']
next_page_link: //a[contains(text(), 'Next page')]
```

### replace_string([string to find]): [replacement string]

Simple find and replace to be performed on HTML before processing.

**Example**
```
replace_string(<p />): <br /><br />
# alternatively you can write the above as: 
find_string: <p /> 
replace_string: <br /><br />
```

### http_header([header name]): [header value]

Send additional HTTP headers for requests to this site.

**Examples**
```
# Appear to be an iPad
http_header(User-agent): Mozilla/5.0 (iPad; CPU OS 12_0_1 like Mac OS X)

# Skip GDPR tracking wall
http_header(Cookie): euConsent=true
```

<!--
### parser: [string]

By default we rely on PHP’s fast libxml parser. For sites where this proves problematic, you can now specify html5lib – a PHP implementation of a HTML parser based on the HTML5 spec. (Introduced in version 3.0.)

Note: html5lib is a slower parser and still quite buggy.

**Example**
```
parser: html5lib
```
-->

### test_url: [string]

A URL to use to test the pattern. In future, we’ll have a tool which will use this to automatically test if the patterns in the file are still valid. Must be URL of an article from this site, not the site's front page. One or more.

**Example**
```
test_url: http://www.example.org/2018/10/what-a-day/
```

### Comments

Lines beginning with `#` are ignored.

**Example**
```
# this is an advert
strip: //img[@class='ad']
```