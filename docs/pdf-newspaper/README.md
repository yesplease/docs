---
title: PDF Newspaper Intro
---

<style>
    table img { border: 1px solid #222 }
</style>

# Introduction

[PDF Newspaper](http://pdf.fivefilters.org) lets you create printable versions of web articles and news feeds. PDF Newspaper can produce a 2-column A4/Letter PDF, a single-column A5 PDF, or an editable HTML version linked to a print stylesheet.

| A4       | A5       |
| -------- | -------- |
| ![](/images/pdf-newspaper/sample_a4.png) | ![](/images/pdf-newspaper/sample_a5.png) |

## Developers

PDF Newspaper is a free software PHP application for making simple, newspaper-style PDFs from web articles, feeds, and even OPML files. Designed to be run as a web service, but one which you control.

## Simple Print (beta)

[Simple Print](http://pdf.fivefilters.org/simple-print/) builds on PDF Newspaper to make printing web articles even simpler and more convenient. It uses our [Full-Text RSS](/full-text-rss/) to extract the article's content and PDF Newspaper to produce a clean HTML copy. It then relies on Headless Chromium to generate the PDF.

To avoid situations where an article will use an extra printed page for a small overrun, Simple Print produces 3 PDFs behind the scenes with varying font sizes and keeps the copy with the fewest pages and largest font size.
