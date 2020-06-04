const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const INSTAGRAM_URL = 'https://www.instagram.com/';

/**
 * Get a user's Istagram photos
 * @param {string} username The instagram username
 * @param {string} password The instagram password
 */
async function getInstagramPhotos(username, password) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.goto(`https://www.instagram.com/${username}/?__a=1`);

  const content = await page.content();
  console.log(content);
  const $ = cheerio.load(content);
  const data = JSON.parse($('pre').text());

  const photos = [];
  data.graphql.user.edge_owner_to_timeline_media.edges.forEach(
    (edge) => {
      if (edge.node) {
        photos.push(edge.node);
      }
    },
  );

  return photos;
}

module.exports = {
  getInstagramPhotos,
};
