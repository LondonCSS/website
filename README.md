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
- Houdini-powered social images: see [details](#houdini-powered-social-images)
- Dynamic site map
- Headers checked with [Security Headers](https://securityheaders.com/?q=londoncss.dev&followRedirects=on)
- Powered by [Eleventy](https://www.11ty.io/)…
- Hosted on [Netlify](https://www.netlify.com/)

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

### Houdini-powered social images
Each event has an associated Houdini-powered background image sourced from sites like [@una](https://twitter.com/una)'s iconic [extra.css](https://extra-css.netlify.app/) and [@malchata]'s awesome [paintlets](https://paintlets.herokuapp.com/). 

In order to generate social media images 
1. A special version of the `/events` page - `src/events/puppeteer.njk` - loads custom CSS, paintlet modules and fonts
2. Puppeteer snapshots the event nodes 
3. The images are stored in `dist/static/events`

### Under development
- Rollup-based JS pipeline
- Full PWA status