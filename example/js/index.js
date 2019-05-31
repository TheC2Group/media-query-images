var MediaQueryImages = require('../../cjs/media-query-images.js');

new MediaQueryImages('.background-image', [
    {
        'mediaQuery': '(max-width: 799px)',
        'attrName': 'data-small'
    },
    {
        'mediaQuery': '(max-width: 1199px)',
        'attrName': 'data-medium'
    },
    {
        'attrName': 'data-large'
    }
]);

new MediaQueryImages('.inline-image', [
    {
        'mediaQuery': '(max-width: 799px)',
        'attrName': 'data-small'
    },
    {
        'attrName': 'data-large'
    }
]);
