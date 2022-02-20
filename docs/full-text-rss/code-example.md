---
title: Code Example
---

# Code Example

If you're developing an application which requires content extraction, you can use Full-Text RSS as a web service. See below for a simple example in PHP.

Replace URL in `$ftr` with the URL to your instance of Full-Text RSS. Replace `$article` with the URL to the article you'd like Full-Text RSS to process.

## PHP

``` php
<?php
$ftr = 'http://example.org/full-text-rss/';
$article = 'http://www.bbc.co.uk/news/world-europe-21936308';

$request = $ftr.'makefulltextfeed.php?format=json&url='.urlencode($article);

// Send HTTP request and get response
$result = @file_get_contents($request);

if (!$result) die('Failed to fetch content');

$json = @json_decode($result);

if (!$json) die('Failed to parse JSON');

// What do we have?
// var_dump($json);
// Items?
// var_dump($json->rss->channel->item);

// Note: this works when you're processing an article.
// If the input URL is a feed, ->item will be an array.
$title = $json->rss->channel->item->title;

echo $title;
```

## Other languages?

Full-Text RSS is available on [RapidAPI](https://rapidapi.com/fivefilters/api/full-text-rss) which can generate code to get you started in a variety of languages.

If you're comfortable sending HTTP requests and reading JSON responses in your favourite language, it should be fairly easy to adapt the example above.
