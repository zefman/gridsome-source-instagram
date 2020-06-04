const axios = require('axios');
const cheerio = require('cheerio');

const INSTAGRAM_URL = 'https://www.instagram.com/';

/**
 * Get a user's Istagram photos
 * @param {string} username The instagram username
 */
async function getInstagramPhotos(username) {
  const photos = await axios
    .get(`https://www.instagram.com/${username}/?__a=1`)
    .then(response => {
      const photos = []
      response.data.graphql.user.edge_owner_to_timeline_media.edges.forEach(
        edge => {
          if (edge.node) {
            photos.push(edge.node)
          }
        }
      );
      return photos;
    });

  return photos;
}
module.exports = {
  getInstagramPhotos,
};
