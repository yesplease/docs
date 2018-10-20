---
title: Usage and Request Parameters
---

# Usage and Request Parameters

The simplest way to use Full-Text RSS is to use the form provided.

In the URL field, enter the URL of a partial feed or web page and click ‘Create Feed’. The resulting page should show you a newly generated feed with the full content. To use this feed in your application, copy the URL in the address bar. You can now use this new URL in place of the original partial feed URL.

If you're a developer and need to integrate Full-Text RSS in your application, we have a simple [code example](/full-text-rss/code-example.html) to give you an idea of how it can be used.

## Form Options

In addition to the URL, you can also specify a number of other options in the form:

**Max Items**

Set the maximum number of feed items we should process. The smaller the number, the faster the new feed is produced.

If your URL refers to a standard web page, this will have no effect: you will only get 1 item.

**Link Handling**

By default, links within the content are preserved. Change this field if you'd like links removed, or included as footnotes.

**Extraction Failure Handling**

If the extraction pattern above fails to match, FTR can remove the item from the feed or keep it in.

Keeping the item will keep the title, URL and original description (if any) found in the feed. In addition, FTR inserts a message before the original description notifying you that extraction failed.

**Include Excerpt**

Check the box and we'll include a brief plain text excerpt from the extracted content in the output.

**JSON Output**

We'll output JSON if selected

**Debug**

Check the box to see what's happening behind the scenes.

## Query String Parameters

Using the form is the simplest way to create a Full-Text RSS URL, but you can also construct one yourself. The form fields above are turned into query string parameters when you submit the form. Let's look at those parameters here, and a few more that are not presented on the form.

These parameters are to be appended on to the base URL. The base URL is where you installed Full-Text RSS, e.g. `http://example.org/full-text-rss/makefulltextfeed.php`.

These parameters can be combined in the URL.

::: tip NOTE ON ENCODING
If you're constructing URLs without using the form, make sure you URL encode the parameter values (anything after the '=' and before the '&'). In PHP the function to use is `urlencode()`. If you're doing it by hand, you can paste the parameter values into [an web-based encoder](http://meyerweb.com/eric/tools/dencoder/) and click 'Encode' to get the encoded the value.
:::

<style>
/* JSON Prettify CSS from http://chris.photobooks.com/json/default.htm */
.jsonOutput.PRETTY {
    font-family: Consolas, "Courier New", monospace;
    background-color: #333;
    color: #fff;
    padding: 10px; 
    border-radius: 4px;
}
.ERR             { color: #FF0000; font-weight: bold; }
.FUNC            { color: #FF0000; font-weight: bold; }
.IDK             { color: #FF0000; font-weight: bold; }
.KEY             { color: #FFFFFF; font-weight: bold; }
.BOOL            { color: #00FFFF; }
.NUMBER          { color: #7FFF00; }
.DATE            { color: #6495ED; }
.REGEXP          { color: #DEB887; }
.STRING          { color: #D8FFB0; }
.UNDEF           { color: #91AA9D; font-style: italic; }
.NULL            { color: #91AA9D; font-style: italic; }
.EMPTY           { color: #91AA9D; font-style: italic; }
.HTML span.ARRAY { color: #91AA9D; font-style: italic; }
.HTML span.OBJ   { color: #91AA9D; font-style: italic; }
table.OBJ        { background-color: #22353C; }
table.ARRAY      { background-color: #252C47; }
</style>

<p>This page describes the two endpoints offered by Full-Text RSS: <a href="#article-extraction">Article Extraction</a> and <a href="#feed-conversion">Feed Conversion</a>. If you've restricted access to Full-Text RSS, the final section on <a href="#api-keys">API keys</a> will tell you how to pass your key along in the request.</p>

<hr />
<h3 id="article-extraction">1. Article Extraction</h3>
<p>To extract article content from a web page and get a simple JSON response, use the following endpoint:</p>
<ul>
    <li style="font-family: monospace;"><script type="text/javascript">document.write(baseUrl);</script>/extract.php?url=<strong>[url]</strong></li>
</ul>

## Request Parameters

<p>When making HTTP requests, you can pass the following parameters to <tt>extract.php</tt> in a GET or POST request.</p>
<p>Note: for many of these parameters, the configuration file will ultimately determine if and how they can be used.</p>
<table width="100%" border="0" class="parameters table table-bordered">
    <thead>
    <tr style="background-color: #ddd">
        <th width="13%">Parameter</th>
        <th width="19%">Value</th>
        <th width="68%">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>url</td>
        <td>string (URL)</td>
        <td>This is the only required parameter. It should be the URL to a standard HTML page. You can omit the 'http://' prefix if you like.</td>
    </tr>
    <tr>
        <td>inputhtml</td>
        <td>string (HTML)</td>
        <td>If you already have the HTML, you can pass it here. We will not make any HTTP requests for the content if this parameter is used. Note: The input HTML should be UTF-8 encoded. And you will still need to give us the URL associated with the content (the URL may determine how the content is extracted, if we have extraction rules associated with it).</td>
    </tr>
    <tr>
        <td>content</td>
        <td><tt>0</tt>, <tt>html5</tt> (default), <tt>text</tt></td>
        <td>If set to 0, the extracted content will not be included in the output. If set to text, we'll convert the extracted HTML to plain text. By default text output is wrapped at 70 characters. You can use text0 to disable wrapping. Or set wrapping to a value between 20 and 1000 characters, e.g. text80 will wrap at 80 characters.</td>
    </tr>
    <tr>
        <td>links</td>
        <td><tt>preserve</tt> (default), <tt>footnotes</tt>, <tt>remove</tt></td>
        <td>Links can either be preserved, made into footnotes, or removed. None of these options affect the link text, only the hyperlink itself.</td>
    </tr>
    <tr>
        <td>images</td>
        <td><tt>1</tt> (default), <tt>0</tt></td>
        <td>If set to 0, images and associated elements (img, figure, figcaption) will be removed from the output.</td>
    </tr>
    <tr>
        <td>xss</td>
        <td><tt>0</tt>, <tt>1</tt> (default)</td>
        <td><p>Use this to enable/disable XSS filtering. It is enabled by default, but if your application/framework/CMS already filters HTML for XSS vulnerabilities, you can disable XSS filtering here.</p>
<p>If enabled, we'll pass retrieved HTML content through htmLawed (safe flag on and style attributes denied). Note: when enabled this will remove certain elements you may want to preserve, such as iframes.</p></td>
    </tr>
    <tr>
        <td>lang</td>
        <td><tt>0</tt>, <tt>1</tt> (default), <tt>2</tt>, <tt>3</tt></td>
        <td><p>Language detection. If you'd like Full-Text RSS to find the language of the articles it processes, you can use one of the following values:</p>
        <dl>
            <dt>0</dt><dd>Ignore language</dd>
            <dt>1</dt><dd>Use article metadata (e.g. HTML lang attribute) (Default value)</dd>
            <dt>2</dt><dd>As above, but guess the language if it's not specified.</dd>
            <dt>3</dt><dd>Always guess the language, whether it's specified or not.</dd>
        </dl>
        </td>
    </tr>
    <tr>
        <td>debug</td>
        <td>[no value], <tt>rawhtml</tt>, <tt>parsedhtml</tt></td>
        <td><p>If this parameter is present, Full-Text RSS will output the steps it is taking behind the scenes to help you debug problems.</p>
        <p>If the parameter value is <tt>rawhtml</tt>, Full-Text RSS will output the HTTP response (headers and body) of the first response after redirects.</p> 
        <p>If the parameter value is <tt>parsedhtml</tt>, Full-Text RSS will output the reconstructed HTML (after its own parsing). This version is what the extraction rules are applied to, and it may differ from the original (<tt>rawhtml</tt>) output. If your extraction rules are not picking out any elements, this will likely help identify the problem.</p>
        <p>Note: Full-Text RSS will stop execution after HTML output if one of the last two parameter values are passed. Otherwise it will continue showing debug output until the end.</p></td>
    </tr>
    <tr>
        <td>parser</td>
        <td><tt>html5php</tt>, <tt>libxml</tt></td>
        <td>The default parser is libxml as it's the fastest. HTML5-PHP is an HTML5 parser implemented in PHP. It's slower than libxml, but can often produce better results. You can request HTML5-PHP be used as the parser in a site-specific config file (to ensure it gets used for all URLs for that site), or explicitly via this request parameter. Note: if the Gumbo PHP extension is available, that will be used regardless of this parameter or site config file directives.</td>
    </tr>
    <tr>
        <td>siteconfig</td>
        <td>string</td>
        <td>Site-specific extraction rules are usually stored in text files in the site_config folder. You can also submit <a href="http://help.fivefilters.org/customer/portal/articles/223153-site-patterns">extraction rules</a> directly in your request using this parameter.</td>
    </tr>
    <tr>
        <td>proxy</td>
        <td><tt>0</tt>, <tt>1</tt>, string (proxy name)</td>
        <td>This parameter has no effect if proxy servers have not been entered in the config file. If they have been entered and enabled, you can pass the following values: 0 to disable proxy use (uses direct connection). 1 for default proxy behaviour (whatever is set in the config), or a string to identify a specific proxy server (has to match the name given to the proxy in the config file).</td>
    </tr>
    </tbody>
</table>


## Response (example)

<p>Simple JSON output containing extracted article title, content, and more. It was produced from the following input URL: http://www.truthdig.com/report/print/make_america_ungovernable_20170205</p>
<!-- Generated by http://chris.photobooks.com/json/default.htm -->

<output style="display: block;" for="jsonInput jsonStrict jsonEval json2HTML json2JSON jsonTrunc jsonDate jsonData jsonSpace" class="jsonOutput PRETTY"><span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"title": <span class="STRING">"Make America Ungovernable"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"excerpt": <span class="STRING">"By Chris Hedges Mr. Fish / Truthdig Donald Trump’s regime is rapidl…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"date": <span class="STRING">"2017-02-05T23:34:57+00:00"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"author": <span class="NULL">null</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"language": <span class="STRING">"en"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"url": <span class="STRING">"http://www.truthdig.com/report/item/make_america_ungovernable_20170…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"effective_url": <span class="STRING">"http://www.truthdig.com/report/print/make_america_ungovernable_2017…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"domain": <span class="STRING">"truthdig.com"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"word_count": <span class="NUMBER">2284</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"og_url": <span class="STRING">"http://www.truthdig.com/report/print/make_america_ungovernable_2017…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"og_title": <span class="STRING">"Make America Ungovernable: Chris Hedges"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"og_description": <span class="STRING">"The window to overthrow the Trump regime is rapidly closing. We mus…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"og_image": <span class="NULL">null</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"og_type": <span class="STRING">"article"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"twitter_card": <span class="NULL">null</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"twitter_site": <span class="STRING">"@truthdig"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"twitter_creator": <span class="STRING">"@truthdig"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"twitter_image": <span class="NULL">null</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"twitter_title": <span class="STRING">"Make America Ungovernable | Truthdig: Drilling Beneath the Headline…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"twitter_description": <span class="STRING">"The window to overthrow the Trump regime is rapidly closing. We mus…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"content": <span class="STRING">"&lt;h4 class="date"&gt;Posted on Feb 5&lt;/h4&gt;…"</span></span><br>}</span></output>

<p>Note: For brevity the output above is truncated.</p>

<hr />

## <a name="feed-conversion" />2. Feed Conversion

<p>To transform a partial feed to a full-text feed, pass the URL (<a href="http://meyerweb.com/eric/tools/dencoder/">encoded</a>) in the querystring to the following URL:</p>
<ul>
    <li style="font-family: monospace;"><script type="text/javascript">document.write(baseUrl);</script>/makefulltextfeed.php?url=<strong>[url]</strong></li>
</ul>

<p>All the parameters in the form at the top of this page can be passed in this way. Examine the URL in the address bar after you click 'Create Feed' to see the values.</p>

### Request Parameters

<p>When making HTTP requests, you can pass the following parameters to <tt>makefulltextfeed.php</tt> in a GET request. Most of these parameters have default values suitable for news enthusiasts who simply want to subscribe to a full-text feed in their news reading application. If that's what you're doing, you can safely ignore the details here. For developers, or others who need more control over the output produced by Full-Text RSS, this section should give you an idea of what you can do.</p>
<p>We do not provide form fields for all of these parameters, but you can modify the URL in your browser after clicking 'Create Feed' to use them.</p>
<p>Note: for many of these parameters, the configuration file will ultimately determine if and how they can be used.</p>
<table width="100%" border="0" class="parameters table table-bordered">
    <thead>
    <tr style="background-color: #ddd">
        <th width="13%">Parameter</th>
        <th width="19%">Value</th>
        <th width="68%">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>url</td>
        <td>string (URL)</td>
        <td>This is the only required parameter. It should be the URL to a partial feed or a standard HTML page. You can omit the 'http://' prefix if you like.</td>
    </tr>
    <tr>
        <td>format</td>
        <td><tt>rss</tt> (default), <tt>json</tt></td>
        <td>The default Full-Text RSS output is RSS. The only other valid output format is JSON. To get JSON output, pass format=json in the querystring. Exclude it from the URL (or set it to ‘rss’) if you’d like RSS.</td>
    </tr>	
    <tr>
        <td>summary</td>
        <td><tt>0</tt> (default), <tt>1</tt></td>
        <td>If set to 1, an excerpt will be included for each item in the output.</td>
    </tr>
    <tr>
        <td>content</td>
        <td><tt>0</tt>, <tt>1</tt> (default), <tt>html5</tt></td>
        <td>If set to 0, the extracted content will not be included in the output. If set to html5, we'll output HTML5.</td>
    </tr>
    <tr>
        <td>links</td>
        <td><tt>preserve</tt> (default), <tt>footnotes</tt>, <tt>remove</tt></td>
        <td>Links can either be preserved, made into footnotes, or removed. None of these options affect the link text, only the hyperlink itself.</td>
    </tr>
    <tr>
        <td>images</td>
        <td><tt>1</tt> (default), <tt>0</tt></td>
        <td>If set to 0, images and associated elements (img, figure, figcaption) will be removed from the output.</td>
    </tr>
    <tr>
        <td>exc</td>
        <td><tt>0</tt> (default), <tt>1</tt></td>
        <td>If Full-Text RSS fails to extract the article body, the generated feed item will include a message saying extraction failed followed by the original item description (if present in the original feed). You ask Full-Text RSS to remove such items from the generated feed completely by passing 1 in this parameter.</td>
    </tr>
    <tr>
        <td>accept</td>
        <td><tt>auto</tt> (default), <tt>feed</tt>, <tt>html</tt></td>
        <td><p>Tell Full-Text RSS what it should expect when fetching the input URL. By default Full-Text RSS tries to guess whether the response is a feed or regular HTML page. It's a good idea to be explicit by passing the appropriate type in this parameter. This is useful if, for example, a feed stops working and begins to return HTML or redirecs to a HTML page as a result of site changes. In such a scenario, if you've been explicit about the URL being a feed, Full-Text RSS will not parse HTML returned in response. If you pass accept=html (previously html=1), Full-Text RSS will not attempt to parse the response as a feed. This increases performance slightly and should be used if you know that the URL is not a feed.</p>
        <p>Note: If excluded, or set to <tt>auto</tt>, Full-Text RSS first tries to parse the server's response as a feed, and only if it fails to parse as a feed will it revert to HTML parsing. In the default parse-as-feed-first mode, Full-Text RSS will identify itself as PHP first and only if a valid feed is returned will it identify itself as a browser in subsequent requests to fetch the feed items. In parse-as-html mode, Full-Text RSS will identify itself as a browser from the very first request.</p></td>
    </tr>
    <tr>
        <td>xss</td>
        <td><tt>0</tt> (default), <tt>1</tt></td>
        <td><p>Use this to enable XSS filtering. We have not enabled this by default because we assume the majority of our users do not display the HTML retrieved by Full-Text RSS in a web page without further processing. If you subscribe to our generated feeds in your news reader application, it should, if it's good software, already filter the resulting HTML for XSS attacks, making it redundant for Full-Text RSS do the same. Similarly with frameworks/CMSs which display feed content - the content should be treated like any other user-submitted content.</p>
        <p>If you are writing an application yourself which is processing feeds generated by Full-Text RSS, you can either filter the HTML yourself to remove potential XSS attacks or enable this option. This might be useful if you are processing our generated feeds with JavaScript on the client side - although there's client side xss filtering available too.</p>
        <p>If enabled, we'll pass retrieved HTML content through htmLawed (safe flag on and style attributes denied). Note: if enabled this will also remove certain elements you may want to preserve, such as iframes.</p></td>
    </tr>
    <tr>
        <td>callback</td>
        <td>string</td>
        <td>This is for JSONP use. If you're requesting JSON output, you can also specify a callback function (Javascript client-side function) to receive the Full-Text RSS JSON output.</td>
    </tr>
    <tr>
        <td>lang</td>
        <td><tt>0</tt>, <tt>1</tt> (default), <tt>2</tt>, <tt>3</tt></td>
        <td><p>Language detection. If you'd like Full-Text RSS to find the language of the articles it processes, you can use one of the following values:</p>
        <dl>
            <dt>0</dt><dd>Ignore language</dd>
            <dt>1</dt><dd>Use article metadata (e.g. HTML lang attribute) or feed metadata. (Default value)</dd>
            <dt>2</dt><dd>As above, but guess the language if it's not specified.</dd>
            <dt>3</dt><dd>Always guess the language, whether it's specified or not.</dd>
        </dl>
        <p>If language detection is enabled and a match is found, the language code will be returned in the &lt;dc:language&gt; element inside the &lt;item&gt; element.</p>
        </td>
    </tr>
    <tr>
        <td>debug</td>
        <td>[no value], <tt>rawhtml</tt>, <tt>parsedhtml</tt></td>
        <td><p>If this parameter is present, Full-Text RSS will output the steps it is taking behind the scenes to help you debug problems.</p>
        <p>If the parameter value is <tt>rawhtml</tt>, Full-Text RSS will output the HTTP response (headers and body) of the first response after redirects.</p> 
        <p>If the parameter value is <tt>parsedhtml</tt>, Full-Text RSS will output the reconstructed HTML (after its own parsing). This version is what the extraction rules are applied to, and it may differ from the original (<tt>rawhtml</tt>) output. If your extraction rules are not picking out any elements, this will likely help identify the problem.</p>
        <p>Note: Full-Text RSS will stop execution after HTML output if one of the last two parameter values are passed. Otherwise it will continue showing debug output until the end.</p></td>
    </tr>
    <tr>
        <td>parser</td>
        <td><tt>html5php</tt>, <tt>libxml</tt></td>
        <td>The default parser is libxml as it's the fastest. HTML5-PHP is an HTML5 parser implemented in PHP. It's slower than libxml, but can often produce better results. You can request HTML5-PHP be used as the parser in a site-specific config file (to ensure it gets used for all URLs for that site), or explicitly via this request parameter. Note: if the Gumbo PHP extension is available, that will be used regardless of this parameter or site config file directives.</td>
    </tr>
    <tr>
        <td>siteconfig</td>
        <td>string</td>
        <td>Site-specific extraction rules are usually stored in text files in the site_config folder. You can also submit <a href="http://help.fivefilters.org/customer/portal/articles/223153-site-patterns">extraction rules</a> directly in your request using this parameter.</td>
    </tr>
    <tr>
        <td>proxy</td>
        <td><tt>0</tt>, <tt>1</tt>, string (proxy name)</td>
        <td>This parameter has no effect if proxy servers have not been entered in the config file. If they have been entered and enabled, you can pass the following values: 0 to disable proxy use (uses direct connection). 1 for default proxy behaviour (whatever is set in the config), or a string to identify a specific proxy server (has to match the name given to the proxy in the config file).</td>
    </tr>
    </tbody>
</table>

<p><strong>Feed-only parameters</strong> &mdash; These parameters only apply to web feeds. They have no effect when the input URL points to a web page.</p>

<table width="100%" border="0" class="parameters table table-bordered">
    <thead>
    <tr style="background-color: #ddd">
        <th width="13%">Parameter</th>
        <th width="19%">Value</th>
        <th width="68%">Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>use_extracted_title</td>
        <td><tt>0</tt> (default), <tt>1</tt></td>
        <td>By default, if the input URL points to a feed, item titles in the generated feed will not be changed - we assume item titles in feeds are not truncated. If you'd like them to be replaced with titles Full-Text RSS extracts, use this parameter in the request. To enable/disable this for for all feeds, see the config file - specifically <tt>$options->favour_feed_titles</tt></td>
    </tr>
    <tr>
        <td>use_effective_url</td>
        <td><tt>0</tt> (default), <tt>1</tt></td>
        <td>When we extract content for feed items, we often end up at a different URL than the one in the original feed. This is often a result of URL shorteners or tracking services being used by the feed publisher. We include the final (effective) URL we reached to get the content inside the dc:identifier field. If you enable this, we'll also use this URL in place of the original item URL in the new feed we produce. To enable/disable this for for all feeds, see the config file - specifically <tt>$options->favour_effective_url</tt></td>
    </tr>
    <tr>
        <td>max</td>
        <td>number</td>
        <td>The maximum number of feed items to process. (The default and upper limit will be found in the configuration file.)</td>
    </tr>
    </tbody>
</table>

### Response (example)

<p>JSON output produced for the BBC feed http://feeds.bbci.co.uk/news/rss.xml. You can also request regular RSS.</p>
<!-- Generated by http://chris.photobooks.com/json/default.htm -->
<output style="display: block;" for="jsonInput jsonStrict jsonEval json2HTML json2JSON jsonTrunc jsonDate jsonData jsonSpace" class="jsonOutput PRETTY"><span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;<span>"rss": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"@attributes": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"version": <span class="STRING">"2.0"</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"channel": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"title": <span class="STRING">"BBC News - Home"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"link": <span class="STRING">"http://www.bbc.co.uk/news/#sa-ns_mchannel=rss&amp;amp;ns_source=PublicR…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"description": <span class="STRING">"The latest stories from the Home section of the BBC News web site."</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"ttl": <span class="NUMBER">15</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"image": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"title": <span class="STRING">"BBC News - Home"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"link": <span class="STRING">"http://www.bbc.co.uk/news/#sa-ns_mchannel=rss&amp;amp;ns_source=PublicR…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"url": <span class="STRING">"http://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif"</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"item": <span class="ARRAY">[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"title": <span class="STRING">"Russia's Putin visits annexed Crimea"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"link": <span class="STRING">"http://www.bbc.co.uk/news/world-europe-27344029#sa-ns_mchannel=rss&amp;…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"guid": <span class="STRING">"http://www.bbc.co.uk/news/world-europe-27344029#sa-ns_mchannel=rss&amp;…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"description": <span class="STRING">"President Putin: \"[Crimeans have] proved their loyalty to a histor…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"content_encoded": <span class="STRING">"&lt;!-- Adding hypertab --&gt;&amp;#13;\n&amp;#13;\n&amp;#13;\n&lt;!-- end of hypertab -…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"pubDate": <span class="STRING">"Fri, 09 May 2014 15:02:04 +0000"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_language": <span class="STRING">"en-gb"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_format": <span class="STRING">"text/html"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_identifier": <span class="STRING">"http://www.bbc.co.uk/news/world-europe-27344029"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"media_thumbnail": <span class="ARRAY">[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"@attributes": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"url": <span class="STRING">"http://news.bbcimg.co.uk/media/images/74751000/jpg/_74751301_ycst2i…"</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"@attributes": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"url": <span class="STRING">"http://news.bbcimg.co.uk/media/images/74751000/jpg/_74751302_ycst2i…"</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"title": <span class="STRING">"Harris 'assaulted daughter's friend'"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"link": <span class="STRING">"http://www.bbc.co.uk/news/uk-27340134#sa-ns_mchannel=rss&amp;ns_source=…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"guid": <span class="STRING">"http://www.bbc.co.uk/news/uk-27340134#sa-ns_mchannel=rss&amp;amp;ns_sou…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"description": <span class="STRING">"Rolf Harris arrives at court flanked by his wife and daughter Rolf …"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"content_encoded": <span class="STRING">"&lt;!--  Embedding the video player --&gt;&amp;#13;\n&lt;!--  This is the embedd…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"pubDate": <span class="STRING">"Fri, 09 May 2014 15:21:52 +0000"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_language": <span class="STRING">"en-gb"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_format": <span class="STRING">"text/html"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_identifier": <span class="STRING">"http://www.bbc.co.uk/news/uk-27340134"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"media_thumbnail": <span class="ARRAY">[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"@attributes": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"url": <span class="STRING">"http://news.bbcimg.co.uk/media/images/74740000/jpg/_74740642_hi0221…"</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"@attributes": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"url": <span class="STRING">"http://news.bbcimg.co.uk/media/images/74740000/jpg/_74740643_hi0221…"</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"title": <span class="STRING">"Nigeria 'ignored' school warning"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"link": <span class="STRING">"http://www.bbc.co.uk/news/world-africa-27344863#sa-ns_mchannel=rss&amp;…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"guid": <span class="STRING">"http://www.bbc.co.uk/news/world-africa-27344863#sa-ns_mchannel=rss&amp;…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"description": <span class="STRING">"Nigeria's military had advance warning of the attack on a school at…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"content_encoded": <span class="STRING">"&lt;div class=\"caption full-width\"&gt;&amp;#13;\n  &lt;img src=\"http://news.b…"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"pubDate": <span class="STRING">"Fri, 09 May 2014 15:48:34 +0000"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_language": <span class="STRING">"en-gb"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_format": <span class="STRING">"text/html"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"dc_identifier": <span class="STRING">"http://www.bbc.co.uk/news/world-africa-27344863"</span></span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"media_thumbnail": <span class="ARRAY">[<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"@attributes": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"url": <span class="STRING">"http://news.bbcimg.co.uk/media/images/74749000/jpg/_74749855_747495…"</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"@attributes": <span class="OBJ">{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>"url": <span class="STRING">"http://news.bbcimg.co.uk/media/images/74749000/jpg/_74749856_747495…"</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</span></span><br>&nbsp;&nbsp;&nbsp;&nbsp;}</span></span><br>}</span></output>	
<p>Note: For brevity the output above is truncated.</p>

<hr />

## <a name="api-keys"/> API Keys

<p>To restrict access to your copy of Full-Text RSS, you can specify API keys in the config file.</p>
<p>Note: Full-text feeds produced by Full-Text RSS are intended to be publically accessible to work with feed readers. As such, the API key should not appear in the final URL for feeds.</p>

<table width="100%" border="0" class="parameters table table-bordered">
    <thead>
    <tr style="background-color: #ddd">
        <th width="13%">Parameter</th>
        <th width="19%">Value</th>
        <th width="68%">Description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
        <td>key</td>
        <td>string or number</td>
        <td><p>This parameter has two functions.</p><p>If you're calling Full-Text RSS programattically, it's better to use this parameter to provide the API key index number together with the hash parameter (see below) so that the actual API key does not get sent in the HTTP request.</p><p>If you pass the actual API key in this parameter, the hash parameter is not required. If you pass the actual API key, Full-Text RSS will find the index number and generate the hash value automatically and redirect to a new URL to hide the API key. If you'd like to link to a generated feed publically while protecting your API key, make sure you copy and paste the URL that results after the redirect.</p><p>If you've configured Full-Text RSS to require a key, an invalid key will result in an error message.</p></td>
        </tr>
        <tr>
        <td>hash</td>
        <td>string</td>
        <td>A SHA-1 hash value of the API key (actual key, not index number) and the URL supplied in the <tt>url</tt> parameter, concatenated. This parameter must be passed along with the API key's index number using the <tt>key</tt> parameter (see above). In PHP, for example: <tt>$hash = sha1($api_key.$url);</tt></td>
        </tr>
        <tr>
        <td>key_redirect</td>
        <td>0 or 1 (default)</td>
        <td><p>When supplying the API key with the <tt>key</tt> parameter, Full-Text RSS will generate a new URL and issue a HTTP redirect to the new URL to hide the API key (see description above). If you'd like to avoid an HTTP redirect, you can pass 0 in this parameter. We do not recommend you subscribe to feeds generated in this way.</p></td>
        </tr>
    </tbody>
</table>