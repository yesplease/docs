---
title: Feed Creator Intro
---

## What is Feed Creator?

Feed Creator is a web application for creating and filtering RSS feeds. RSS feeds are used to get notified of updates to your favourite sites and publications. You subscribe to the feeds that interest you in a feed reader application and get alerted when new content appears without having to remember to visit the sites yourself. 

Many sites already offer RSS feeds for their content, but many don't. And with the rise in online advertising, many sites prefer that you visit them again and again to get updates, so they often choose not to publish feeds. Feed Creator can produce feeds for sites that don't offer their own, so you can get notified of updates without having to visit the site. It can also be used to filter existing feeds to remove items that do not interest you.

## Why would I use it?

Here are a few cases where you might want to use Feed Creator:

* A webpage has no feed of its own, or maybe not for the items that interest you.

  For example: Search results on a website or a category on a news site

* There is a feed, but you want to filter it based on a keyword.
    
  For example: Filter a frequently updated news feed to limit it to only items that include a keyword that you're interested in.
  
## How does it work?

Our service sits in between your feed reader (e.g. [NewsBlur](https://newsblur.com/), [Fraidycat](https://fraidyc.at), Feedly, IFTTT) and the target website.

If a website already offers a feed for the information you’re interested in, this is how your feed reader gets updates after you subscribe to the feed:

![](/images/feed-creator/fc-sequence-without.png)

With Feed Creator, when a feed reader requests the feed, here’s what happens behind the scenes:

![](/images/feed-creator/fc-sequence-with.png)

But as far as the feed reader is concerned, it's just another feed that's being requested.