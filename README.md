# media-query-images

Loads images based on media queries for better page performance.

This plugin can be used on images or on divs (in the case of a background image).

Sample Usage
------------

```js

new MediaQueryImages('#myImageSelector', [
    {
        'mediaQuery': '(max-width: 749px)',
        'attrName': 'data-small'
        'retinaAttrName': 'data-small-retina' // optional - will provide a retina version of the image for devices that support it
    },
    {
        'mediaQuery': '(max-width: 1023px)',
        'attrName': 'data-medium'
    },
    {
        'attrName': 'data-large'
    }
], {
    'blankClass': 'hidden' // optional - will apply a class to images that don't have a source for that particular size
});

```

```html

<img src="" data-small="contentimages/home/hero-1-small.jpg" 
    data-small-retina="contentimages/home/hero-1-small-retina.jpg" 
    data-medium="contentimages/home/hero-1-medium.jpg" 
    data-large="contentimages/home/hero-1.jpg" alt="" id="myImageSelector">

```
