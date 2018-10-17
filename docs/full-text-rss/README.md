
# Introduction

This help article assumes that you are familiar with web feeds. If you're not, please first read the Wikipedia entry here: http://en.wikipedia.org/wiki/Web_feed

It's also important to point out that parts of this article are aimed at programmers and web developers. Full-Text RSS can be used with zero configuration and no programming knowledge, so please don't fret if you don't understand everything here. If you have any questions, email us at help@fivefilters.org.

Now, before we get into the nitty-gritty, let's first distinguish between full-text feeds in general and the Full-Text RSS (FTR) software you're going to read about in this guide.

## What is a full-text feed?

A full-text feed is a standard web feed: essentially a list of the most recent articles published on a website. A feed can be as simple as a list of article links leading people to the full article, or it can contain the full article within the feed itself (letting people read the content without visiting the original site). When people refer to a full-text feed, they mean a feed which contains within it the full contents of the articles listed. A feed which does not include the full content is often called a partial feed, a truncated feed,  or an abbreviated feed.

## What is Full-Text RSS (the software)?

Full-Text RSS (we may refer to it as FTR from now on) is a free and open source tool which can extract article content from web pages and convert partial feeds into full-text feeds.

At its heart, FTR is a content extraction tool. It uses web feeds as input and output because they are the most common feed format standards used on the web. So applications which already support feeds can make use of FTR without change.

Developers can take advantage of FTR's content extraction by requesting JSON output or by using existing RSS libraries for their favourite programming language.

## Why is it useful?

In the simplest and most popular case, FTR is used to improve the use of news reading applications (e.g. Google Reader, Tiny Tiny RSS, RSS Owl). One common complaint among users of such applications is that many of the feeds they subscribe to contain only partial content – requiring them to read the full content outside of their news reading application (and thus defeating one of the major reasons for using the application in the first place).

If you use a news reader, you can use FTR to convert these partial feeds into full-text feeds. FTR will generate a new URL which you can use with your news reader (replacing the original feed URL with the newly generated one).

## How does it work?

Typically, you subscribe to a number of web feeds you have an interest in, using a news reading application (feed reader). Your feed reader then periodically checks those feeds for new items and pulls them in for you. Some of those feeds will contain the full contents of each article, allowing you to read the entire entry in your news reader. Some other feeds will contain partial content, with the expectation that you will visit the original site to read the full entry. Here's a sequence diagram showing showing what your feed reader will typically do when you subscribe to feeds from two web sites, Website 1 and Website 2:

![sequence without Full-Text RSS](full-text-rss/feed-reader.png)

Sequence diagram showing feed fetching without Full-Text RSS

FTR is designed to act as a proxy for partial feeds. So rather than subscribing to the feed from Website 1 directly in your feed reader, you will first pass it to FTR and use the new feed URL it generates to subscribe to the feed. What happens when you subscribe to a feed in this way is shown in the sequence diagram below:

![sequence without Full-Text RSS](full-text-rss/full-text-rss-sequence.png)

Sequence diagram showing feed fetching with Full-Text RSS

FTR is designed to work with any web page carrying an article. It can accept as input a single web page (identified by its URL) or a list of web pages (identified by a feed URL). It then retrieves each page and uses a set of rules to identify the title and content block that's most likely to hold only the article's content (usually paragraphs of text). These blocks are then extracted and returned in the RSS feed format.
