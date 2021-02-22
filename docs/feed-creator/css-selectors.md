---
title: CSS Selectors
---

## CSS Selectors accepted in Feed Creator

For the most flexibility in selecting the desired items on a page, choose ['Advanced selectors'](/feed-creator/quick-start.html#_3-css-selectors) in the main Feed Creator form.

Feed Creator from version 2.2 uses [Symfony's CSS Selector](https://github.com/symfony/css-selector) to convert CSS selectors into XPath expressions.

Feed Creator supports a variety of CSS selectors (with [some exceptions](https://symfony.com/doc/current/components/css_selector.html#limitations-of-the-cssselector-component)).

::: tip NUMBER OF ELEMENTS SELECTED
CSS selectors can return a number of elements. In Feed Creator, the main item selector should be used to return elements containing the individual items, e.g. `div.news-story` might return three elements which contain other elements (title, url, date) related to news story 1, news story 2, and news story 3.

The item title, item description, item URL, item date, and item image selectors will then be applied within the context of each of the elements returned from the main item selector, not the whole page. Additionaly, these selectors will only return the first matching element, not all of them. Feed Creator then takes the text content of that element or an attribute value.
:::

## Universal selector

**Syntax**: `*`

**Examples**:

* `*` - all elements
* `*[class*="headline"]` - all elements containing "headline" anywhere in the class attribute

[More information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors)

## Type selector

**Syntax**: `elementname`

**Examples**:

* `h1` - all `<h1>` elements
* `div[data-key="headline"]` - all `<div>` elements with a `data-key="headline"` attribute

[More information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors)

## Class selector

**Syntax**: `.classname`

**Examples**:

* `.headline` - all elements with `class="headline"` attribute
* `h1.headline` - all `<h1>` elements with a `class="headline"` attribute
* `h1.headline.main` - all `<h1>` elements with both "headline" and "main" in the class list, e.g. `class="headline text-lg main"`

[More information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors)

## ID selector

**Syntax**: `#idname`

**Examples**:

* `#main` - element with `id="main"` attribute
* `div#main` - `<div>` element with `id="main"` attribute

[More information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors)

## Attribute selector

**Syntax**: `[attr]`, `[attr=value]`, `[attr~=value]`, `[attr|=value]`, `[attr^=value]`, `[attr$=value]`, `[attr*=value]`

**Examples**:

* `a[title]` - all `<a>` elements with a title attribute
* `a[href*="example"]` - `<a>` elements with an href containing "example"

[More examples at CSS-Tricks](https://css-tricks.com/almanac/selectors/a/attribute/) and [more information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)

## Multiple selectors

**Syntax**: `A, B`

**Examples**:

* `div, span` - all `<div>` and `<span>` elements
* `.headline, h2` - all elements with `class="headline"` and all `<h2>` elements

[More information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list)

## Descendant selector

**Syntax**: `A B`

**Examples**:

* `div span` - all `<span>` elements that are inside a `<div>` element
* `div#main .headline` - all elements with `class="headline"` that are inside the `<div>` element with `id="main"`

[More information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator)

## Child selector

**Syntax**: `A > B`

**Examples**:

* `div > span` - all `<span>` elements that are direct children of a `<div>` element
* `div#main > .headline` - all elements with `class="headline"` that are direct children of the `<div>` element with `id="main"`

[More information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator)

## :nth-child selector

**Syntax**: `:nth-child(x)` or `[x]` (NOT CSS)

**Examples**:

* `li:nth-child(2)` - selects the second `<li>` element in a list
* `li[2]` - selects the second `<li>` element in a list*

<span>* Feed Creator borrows the XPath `[x]` equivalent as a shorthand. It's not part of CSS.</span>

[More information at MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child)

## Other selectors

You'll find more information about CSS selectors and other types of selectors on [Mozilla's CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) page.

## Extracting attribute values

::: warning THIS IS NOT CSS
CSS was created for styling elements in browsers. It's useful for selecting elements but there's no way to select attribute values directly (other than specifying that elements should contain a certain attribute value). 
:::

In Feed Creator, we use CSS not for styling, but for extracting text content from HTML elements. Sometimes that text content is inside an attribute value. So in addition to the CSS above, some of the Feed Creator fields (item title, item description, item URL, item date and item image) can also take an attribute name at the very end.

If an attribute name is given, Feed Creator will use the [attribute value](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) as the content. If an attribute name is not given, Feed Creator will use the element's [text content](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) or, in the case of item url, the href attribute, and in the case of item image, the src attribute.

**Syntax**: `@attr`

**Examples**:

* `img @alt` - Extract the text from the alt attribute of the first `<img>` element
* `a @title` - Extract the text from the title attribute of the first `<a>` element
* `time @datetime` - Extract the text (date) from the datetime attribute of the first `<time>` element 

Note: It's only possible to specify a single attribute value. The following is invalid: `img @alt, a @title`.