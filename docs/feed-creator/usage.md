---
title: Form fields
---

# Form fields

The simplest way to use Feed Creator is to use the form provided. See below for information about the main form fields you can use.

## Web page URL

<p>Feed Creator will fetch this page and look for content using the selectors that follow.</p>
<p>Remember, this should be a regular web page URL, not a feed URL.</p>
<h4>A note on Javascript</h4>
<p>At this time Feed Creator does not process Javascript when loading a page. If the site you're trying to extract content from loads the desired content using Javascript, you will not have much luck extracting it with Feed Creator.</p>
<p>If you're unsure whether the content is accessible without Javascript, the easiest way to check is to load the page after disabling Javascript in your browser.</p>

## Find links with given HTML class or id

<p>Find links inside elements whose id or class attribute matches this value.</p>
<p>If you enter the string 'story' here, the result should be something similar to the following CSS selector:</p>
<p><tt>#story a, a#story, .story a, a.story</tt></p>
<p>If you're familiar with XPath, what you enter here will be used in the following XPath expression as the <em>string</em> value:</p>
<p><tt>//a[@href and ancestor-or-self::*[@id="<em>string</em>" or contains(concat(" ",normalize-space(@class)," "), " <em>string</em> ")]]</tt></p>

<h4>Example</h4>
<p>Given the following HTML, use 'entry' or 'story' to select the desired links.</p>

``` html
<span class="entry">
  <a href="[url 1]" class="story">title 1</a>
</span>
<span class="entry">
  <a href="[url 2]" class="story">title 2</a>
</span>
<span class="entry">
  <a href="[url 3]" class="story">title 3</a>
</span>
```

<p>Feed Creator will select the &lt;a&gt; elements and use the href attributes for item URLs and the text content ("title 1", "title 2", etc.) for item titles.</p>

## Item selector (CSS)

<p>Look inside elements matching this CSS selector.</p>

<h4>Example</h4>
<p>Given the following HTML, use 'div.news .item' to select the desired item elements.</p>

``` html
<div class="news">
  <div class="item">
    <a href="[url 1]" class="story">title 1</a>
  </div>
  <div class="item">
    <a href="[url 2]" class="story">title 2</a>
  </div>
  <div class="item">
    <a href="[url 3]" class="story">title 3</a>
  </div>
</div>
```

<p>Feed Creator will select the &lt;div&gt; elements with class attribute 'item'.</p>
<p>By default, it will look for the first &lt;a&gt; element inside each of these, and will use the href attributes for item URLs and the text content ("title 1", "title 2", etc.) for item titles.</p>

## Item title selector (CSS)

<p>Extract item title from selected element. This is applied within the context of each item selected by the item selector.</p>
<p>If left empty, the text of the first matching &lt;a&gt; element will be used. This selector is useful if the title is in a different element.</p>
<p>If set to 0, titles will not be included in the output.</p>
<p>To use an element's attribute value rather than text content, use @attr, for example: 'img @alt'.</p>
<p>To use the text in the context element itself (element selected by item selector), enter ':scope'.</p>

<h4>Example</h4>
<p>Given the following HTML, and assuming we've set the item selector to 'div.news .item', to select the desired item title elements we'd pass 'h3' as the item title selector.</p>

``` html
<div class="news">
  <div class="item">
    <h3>title 1</h3>
    <a href="[url 1]">Read more...</a>
  </div>
  <div class="item">
    <h3>title 2</h3>
    <a href="[url 2]">Read more...</a>
  </div>
  <div class="item">
    <h3>title 3</h3>
    <a href="[url 3]">Read more...</a>
  </div>
</div>
```

<p>Without specifying 'h3' as the item title selector, Feed Creator would use the link titles ('Read more...'), which is not what we want. But the item URLs will still be correctly extracted from those &lt;a&gt; elements.</p>

## Item description selector (CSS)

<p>Extract item description from selected element. This is applied within the context of each item selected by the item selector.</p>
<p>If left empty, the generated feed will not include item descriptions.</p>
<p>To use an element's attribute value rather than text content, use @attr, for example: 'img @alt'.</p>
<p>To use the text in the context element itself (element selected by item selector), enter ':scope'.</p>

<h4>Example</h4>
<p>Given the following HTML, and assuming we've set the item selector to 'div.news .item', to select the desired item description elements we'd pass 'p' as the item description selector.</p>

``` html
<div class="news">
  <div class="item">
    <a href="[url 1]">Title 1</a>
    <p>description 1</p>
  </div>
  <div class="item">
    <a href="[url 2]">Title 2</a>
    <p>description 1</p>
  </div>
  <div class="item">
    <a href="[url 3]">Title 3</a>
    <p>description 1</p>
  </div>
</div>
```

## Item URL selector (CSS)

<p>Extract item URL from selected element. This is applied within the context of each item selected by the item selector.</p>
<p>If left empty, the URL of the first matching &lt;a&gt; element will be used.</p>
<p>If set to 0, URLs will not be included in the output. If set to 1, all item URLs will point to the input URL.</p>

<h4>Example</h4>
<p>Given the following HTML, and assuming we've set the item selector to 'div.news .item', to select the desired item URL we'd pass 'a[2]' or 'a.story' as the item URL selector.</p>

``` html
<div class="news">
  <div class="item">
    <a href="/news">News:</a>
    <a class="story" href="[url 1]>title 1</a>
  </div>
  <div class="item">
    <a href="/opinion">Opinion:</a>
    <a class="story" href="[url 2]>title 2</a>
  </div>
  <div class="item">
    <a href="/news">News:</a>
    <a class="story" href="[url 3]>title 3</a>
  </div>
</div>
```

## Item date selector (CSS)

<p>Extract item date from selected element. This is applied within the context of each item selected by the item selector.</p>
<p>If left empty, the generated feed will not include item dates.</p>
<p>To use an element's attribute value rather than text content, use @attr, for example: 'time @datetime'.</p>
<p>To use an attribute of the context element itself (element selected by item selector), use ':scope' and @attr, for example ':scope @datetime'.</p>

<h4>Example</h4>
<p>Given the following HTML, and assuming we've set the item selector to 'div.news .item', to select the desired item date elements we'd pass 'time' as the item date selector.</p>

``` html
<div class="news">
  <div class="item">
    <time>28 June 2020</time>
    <a href="[url 1]">title 1</a>
  </div>
  <div class="item">
    <time>10 June 2020</time>
    <a href="[url 2]">title 2</a>
  </div>
  <div class="item">
    <time>25 May 2020</time>
    <a href="[url 3]">title 3</a>
  </div>
</div>
```

<p>With dates, many sites will display relative dates to visitors, for example:</p>

``` html
<div class="item">
  <time datetime="2020-06-26">2 days ago</time>
  <a href="[url 1]">title 1</a>
</div>
```

<p>In such cases, Feed Creator will ignore the date because depending on server time zones, the calculated date could end up changing on subsequent requests.</p>
<p>If an absolute date is available in an attribute value, as in the example above, you can specify it with @attr: 'time @datetime'.</p>

## Item date format

<p>If the date is not recognised correctly (e.g. treated as US format instead of European or vice versa), you can specify the format it appears in here.</p>
<p>This should follow the <a href="https://www.php.net/manual/en/datetime.createfromformat.php#refsect1-datetime.createfromformat-parameters" target="_blank">createFromFormat</a> pattern, e.g. 'j-M-Y'.</p> 
<p>If left empty, the date selected by the item date selector will be processed using PHP's <a href="https://www.php.net/manual/en/function.strtotime.php" target="_blank">strtotime</a> function.</p>

<h4>Example</h4>
<p>The following HTML contains dates which should be processed according to the European date format of day/month/year.</p>

```html
<div class="news">
  <div class="item">
    <time>28/6/2020</time>
    <a href="[url 1]">title 1</a>
  </div>
  <div class="item">
    <time>10/6/2020</time>
    <a href="[url 2]">title 2</a>
  </div>
  <div class="item">
    <time>11/5/2020</time>
    <a href="[url 3]">title 3</a>
  </div>
</div>
```

<p>However, this format is ambiguous because without context, someone from the US would read 2/5/2020 as 5th of February 2020, not 2nd of May 2020.</p>
<p>Feed Creator uses PHP, which uses the US interpretation when the slash separator is used, and European interpretation when a hyphen is used. So '2/5/2020' will be interpreted as 5th February 2020, but '2-5-2020' will be 2nd May 2020.</p>
<p>To handle the example above, we pass the following format: 'j/n/Y'</p>

## Remove HTML elements (CSS)

<p>Remove elements matching CSS selector. This will be processed before we start looking for items.</p>
<p>This can be used as an alternative way to narrow the selection of elements. Instead of increasing the specificity of the selector, remove the elements that should not be included.</p>
<p>It is also useful when the text content being processed contains text nodes from multiple elements, some of which should not be extracted.</p>

<h4>Example</h4>
<p>Given the following HTML, and assuming we're using 'p.summary' as the description selector, we can remove the time elements with 'p.summary time'.</p>

```html
<div class="news">
  <div class="item">
    <a href="[url 1]" class="story">title 1</a>
    <p class="summary">
      <time>1 hour ago</time> description 1
    </p>
  </div>
  <div class="item">
    <a href="[url 2]" class="story">title 2</a>
    <p class="summary">
      <time>6 hours ago</time> description 2
    </p>
  </div>
  <div class="item">
    <a href="[url 3]" class="story">title 3</a>
    <p class="summary">
      <time>2 days ago</time> description 3
    </p>
  </div>
</div>
```

## Keep filters

<p>Submit text or URL segments that should appear in each item. Removes items that <em>do not</em> match these.</p>
<p>For example, if every item needs to have either /news/ or /opinion/ in its URL, or 'corona' or 'covid' in its text, these filters can help.</p>

## Remove filters

<p>Submit text or URL segments that should not appear in the items. Feed Creator will removes items that match these.</p>
<p>For example, if you want to keep all items except those with URLs that contain /opinion/ or /blog/, these filters can help.</p>
<p>Similarly, you can remove items which contains the given text. For example, if you want to keep all items except those that contain the text 'corona' or 'covid', these filters can help.</p>

## User-Agent HTTP header

<p>How should Feed Creator present itself when fetching the content. If a site only produces content for certain browsers, you can use this field to identify as that browser.</p>
<p>This is sent in the HTTP request in a 'User-Agent' header.</p>
<p><a href="https://developers.whatismybrowser.com/useragents/explore/" target="_blank">Explore User Agent strings</a> used by different browsers and software applications.</p>

## Referer HTTP header

<p>The Referer header is used to tell the requested page the URL of the previous page you were on.</p>
<p>It's not common today for sites to give you a different response based on this header, so in most cases you should not have to edit this. But if you know a site does base its response on this value, you can set it here.</p>
<p>Set to 0 to disable sending the HTTP header. Set to 1 to use the source page page URL entered at the beginning as the Referer. Or specify a custom Referer header, e.g. 'https://www.google.com'.</p>

## Cookie HTTP header

<p>This should be used if the site needs you to be logged in to view content, or to bypass GDPR and cookie walls. In most cases cookies are used to identify you, but won't affect the content the site serves. But in situations where they are needed to load the desired content, use them here.</p>
<p>If you want to examine the cookies your browser sends when you visit a certain page, you can open <a href="https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector" target="_blank">Firefox's Storage Inspector</a> after loading the page. Under Cookies you will see a list of cookies sent. </p>
<p>Cookies should be entered in the following format: <tt>name=value</tt> for one cookie and <tt>name=value; name2=value2; name3=value3</tt> for multiple cookies.</p>

## Feed title

<p>The feed title to use in the generated feed. If omitted, whatever's in the &lt;title&gt; element of the web page will be used.</p>
<p>Note: this should be the actual title, not a selector.</p>

## Premium access key

<p>If you have an premium access key, enter it here to remove certain restrictions.</p>
<p>The key itself will not appear in the final feed URL. It will be replaced by a key index and a hash based on the input URL.</p>

