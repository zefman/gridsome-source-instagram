const axios = require('axios');
const cheerio = require('cheerio');

const INSTAGRAM_URL = 'https://www.instagram.com/';

/**
 * Get a users profile data as JSON from the HTML of their instagram page.
 * This works by looking for a script tag that contains a '_sharedData' property.
 * This could be pretty flaky and might break in the future ⚠️
 * @param {string} html The Instagram profile page html
 */
function parseInstragramProfileHtml(html) {
  const $ = cheerio.load(html);
  const jsonData = $('html > body > script')
    .get(0)
    .children[0].data.replace(/window\._sharedData\s?=\s?{/, '{')
    .replace(/;$/g, '');
  return JSON.parse(jsonData).entry_data.ProfilePage[0];
}

/**
 * Get an instagram profile in JSON form by scraping a user's
 * public profile
 * @param {string} username The instagram username
 */
async function getInstagramProfile(username) {
  const profileHtml = await axios
    .get(`${INSTAGRAM_URL}${username}`)
    .then(({ data }) => data);

  return parseInstragramProfileHtml(profileHtml);
}

/**
 * Given an instagram profile return the user's photos
 * @param {Object} instragamProfile
 */
function parseInstagramPhotos(instragamProfile) {
  const photos = instragamProfile.graphql.user.edge_owner_to_timeline_media.edges
    .filter(edge => edge.node)
    .map(edge => edge.node);
  return photos;
}

/**
 * Get a user's Istagram photos
 * @param {string} username The instagram username
 */
async function getInstagramPhotos(username) {
  const profile = await getInstagramProfile(username);
  return parseInstagramPhotos(profile);
}

module.exports = {
  getInstagramPhotos,
};
