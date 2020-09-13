# London CSS Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/b1505b63-38f8-45cf-8a9d-78be01b48a1a/deploy-status)](https://app.netlify.com/sites/londoncss/deploys)

The source for the online home of the new London CSS!

## Installation

```sh
git clone git@github.com:LondonCSS/website.git
cd website
yarn
yarn start
```

## Features
- Sass pipeline: see [details](#sass-pipeline)
- Headers checked with [Security Headers](https://securityheaders.com/?q=londoncss.dev&followRedirects=on)
- Powered by [Eleventy](https://www.11ty.io/)…
- Hosted on [Netlify](https://www.netlify.com/)

### Under development
- Rollup-based JS pipeline
- Service Workers by [Workbox](https://developers.google.com/web/tools/workbox/)

### Sass pipeline

- Source Sass files are under `src/scss`
- Compilation is via templates at `src/assets/css`
    
    Using templates means that Eleventy's own watchers trigger compilation and ensure that changes to Sass files are kept in sync with Browsersync's refresh schedule.
- CSS is transpiled to the same path under `dist` as the templates exist under  `src`:
    ```
    // input
    src/assets/css/{filename}.11ty.js

    // output
    dist/assets/css/{filename}.css
    ```