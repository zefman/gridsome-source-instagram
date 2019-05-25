# @zefman/gridsome-source-instagram

> Instagram source for Gridsome 📸 🏙 🎇 📸

Currently only supports grabbing the latest photos from a user's public instagram profile.

Inspired by [Gatsby source instagram](https://github.com/oorestisime/gatsby-source-instagram)

## Install
- `npm install @zefman/gridsome-source-instagram`
- `yarn add @zefman/gridsome-source-instagram`

## Usage

Add the plugin in `gridsome.config.js`

```js
export default {
  plugins: [
    {
      use: '@zefman/gridsome-source-instagram',
      options: {
        username: 'zefman' // Instagram username
        typeName: 'InstagramPhoto' // The GraphQL type you want the photos to be added under. Defaults to InstagramPhoto
      }
    }
  ]
}
```

Example query to get photos and their caption:

```graphql
query {
  allInstagramPhoto {
    edges {
      node {
        display_url
        edge_media_to_caption {
          edges {
            node {
              text
            }
          }
        }
      }
    }
  }
}
```