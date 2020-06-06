---
title: Feed Creator Intro
---

## What is Feed Creator?

Feed Creator is a web application for creating and filtering RSS feeds. RSS feeds are used to get notified of updates to your favourite sites and publications. Subscribe to sites that interest you and get alerted when new content appears without having to remember to visit the sites yourself to check for updates. Many sites offer RSS feeds for their content, but many don't. Feed Creator creator can be used to produce a feed for a site that doesn't offer a feed of its own. It can also be used to filter existing feeds to remove items that do not interest you.

## What is used for?

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

## Get started: Create a feed from a web page

To use the feed creator you should have:

1. The URL of the source page which contains the items you're interested in.
2. Some knowledge of HTML (and CSS for advanced selection).

::: warning BEFORE WE GO ON
We'd like to stress that if there's already a feed associated with the webpage, you should use it instead of relying on this tool. Feed Creator extracts links from the webpage by looking at its HTML. If a website gets redesigned, HTML changes could break our generated feeds.
:::

### Extracting links: Three different ways

If you supply **only** the page URL to Feed Creator, it will return the first set of links it encounters in the HTML. This could include things like navigation elements, which usually appear at the top of the page. That's probably not what you want. Below we're going to look at three different ways to extract the items you're interested in.

### 1. URL segments as selectors

The simplest way to narrow results to the set of links you are interested in is to see if you can find a URL segment that's exclusive to that set of links.

#### Example

Let's say you're on a site and all the links you're interested in contain 'articles/' in the URL. (If you hover your cursor over a few of the links you should see the URL in the status bar of your browser.) So maybe you have 'articles/20130902.htm’, 'articles/20130604.htm’, etc. Here's what you do:

1. Visit the [Feed Creator](https://createfeed.fivefilters.org/) site
2. In the page URL field enter the web page's URL.
3. Enable keep filters.
4. In the 'Keep item if item URL contains any of these segments' field, enter 'articles/' (or whatever the URL segment is)
5. Click 'Preview' and wait for results.
6. If the results look okay, you can subscribe to the generated feed using the button provided.

::: warning NOTE
It's important to note that what we’re trying to do is to identify patterns within the page that will not only return items that are currently on the page, but also pick up future entries. That's why we don't want to select links using identifiers that only apply to existing links (e.g. '20130902.htm' or '20130604.htm').
:::

### 2. Class or id attribute values as selectors

Sometimes you'll need more than a URL segment to select the links you want. If you know some HTML you can check the source of the page and see if there are class or id attributes associated with the links, their parent elements, or ascendants. If you find some, you can use those values to restrict your search to those elements.

::: tip 
The easiest way to find class and id attributes to use as selectors is to use [Firefox's page inspector](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector). Right click a link or some other element on the page and select 'Inspect Element' to reveal the inspector.
:::

#### Example

[John Pilger's website](http://johnpilger.com) already offers an RSS feed for his articles, so this is one of those cases where you shouldn't really be using this tool. But I'll use it as an example.

If you visit the [articles page](http://johnpilger.com/articles) and click 'Expand all articles', you’ll see his latest articles at the top. If you examine the HTML, you’ll find the entries are marked up as follows:

``` html
<span class="entry">
  <a href="[article url]" class="entry-link">[article title]</a>
  <span class="entry-date" title="1 day ago">[article date]</span>
  <a href="#" rel="nofollow" class="show-intro" id="showintro-1">Show intro...</a>
  <span class="intro" id="article-intro-1">[article description]</span>
</span>
<span class="entry">
  <a href="[article url]" class="entry-link">[article title]</a>
  <span class="entry-date" title="3 days ago">[article date]</span>
  <a href="#" rel="nofollow" class="show-intro" id="showintro-2">Show intro...</a>
  <span class="intro" id="article-intro-2">[article description]</span>
</span>
<span class="entry">
  <a href="[article url]" class="entry-link">[article title]</a>
  <span class="entry-date" title="1 week ago">[article date]</span>
  <a href="#" rel="nofollow" class="show-intro" id="showintro-3">Show intro...</a>
  <span class="intro" id="article-intro-3">[article description]</span>
</span>
```

Each article entry is contained in a `<span>` element with the class attribute value "entry". This element holds two link (`<a>`) elements. The actual article title and URL appear in the `<a>` element with class "entry-link".

So let's try creating a feed from this information:

1. Visit the [Feed Creator](https://createfeed.fivefilters.org/) site
2. In the page URL field enter: `http://johnpilger.com/articles`
3. Make sure 'Simple selectors' is chosen
4. In the 'Look for links inside HTML elements with this id or class attribute value' field enter: `entry-link`
5. Click 'Preview’ and wait for results.

Here's a [direct link to results.](https://createfeed.fivefilters.org/index.php?url=johnpilger.com%2Farticles&in_id_or_class=entry-link)

### 3. CSS selectors

To use CSS selectors you have to select the advanced mode on the form. Selecting this option will reveal new fields which we'll look at in more detail here.

![](/images/feed-creator/fc-advanced-selectors.png)

Let's look at our sample HTML again:

``` html{1,3,5}
<span class="entry">
  <a href="[article url]" class="entry-link">[article title]</a>
  <span class="entry-date" title="1 day ago">[article date]</span>
  <a href="#" rel="nofollow" class="show-intro" id="showintro-1">Show intro...</a>
  <span class="intro" id="article-intro-1">[article description]</span>
</span>
<span class="entry">
  <a href="[article url]" class="entry-link">[article title]</a>
  <span class="entry-date" title="3 days ago">[article date]</span>
  <a href="#" rel="nofollow" class="show-intro" id="showintro-2">Show intro...</a>
  <span class="intro" id="article-intro-2">[article description]</span>
</span>
<span class="entry">
  <a href="[article url]" class="entry-link">[article title]</a>
  <span class="entry-date" title="1 week ago">[article date]</span>
  <a href="#" rel="nofollow" class="show-intro" id="showintro-3">Show intro...</a>
  <span class="intro" id="article-intro-3">[article description]</span>
</span>
```

* Item selector - if you've got a number of items on a page that you're trying to capture, this should be CSS to select all item elements. Based on our HTML snippet above, we'd enter `span.entry` here.
* Item title - Feed Creator will use the first `<a>` element found inside the element selected by the item selector and use its link text as the title. To use a different element for the title, specify a selector for that element. This gets applied in the context of the item element. To omit item titles from your feed, enter `0` here.
* Item URL - As above, the first `<a>` element will be used by default and its `href` attribute value will be the item URL. To use a different `a` element for the URL, specify a selector for that. To omit item URLs, enter `0`. To use the source URL (what you've entered as the page URL) for all items, enter `1`.
* Item description - If the item element selected by the item selector contains a summary or description text, you can target that here. Based on our HTML snippet above, we'd enter `.intro` here.
* Item date - if there's a date too, target that here. Based on our HTML snippet above, we'd enter: `.entry-date`.

#### Example

First, let’s see how the previous example looks using a CSS selector:

* Page URL: `http://johnpilger.com/articles`
* Item selector (CSS): `.entry`

That's all we need to enter for a [basic feed](https://createfeed.fivefilters.org/index.php?url=johnpilger.com%2Farticles&item=.entry). Feed Creator will select the item blocks and then use the first `a` element for the article URL and article title. But what if we want to include the date and description? We can use the other item fields to select those:

* Item description (CSS): `.intro`
* Item date (CSS): `.entry-date`

Now we'll get the additional elements in the feed. Here’s a [direct link](http://createfeed.fivefilters.org/index.php?url=http%3A%2F%2Fjohnpilger.com%2Farticles&item=.entry&item_desc=.intro&item_date=.entry-date) with results.

*Work in progress*

We'll have more documentation here soon. For the time being, please see [this blog post](https://blog.fivefilters.org/2013/10/19/feed-creator-our-new-tool-to-monitor-web-pages.html) for more information.
