const { getInstagramPhotos } = require('./src/instagram');

module.exports = function (api, options) {

  if (!options.username) {
    throw new Error('Missing Instagram username');
  }
  api.loadSource(async ({ addCollection }) => {
    const contentType = addCollection({
      typeName: options.typeName
    });

    try {
      const photos = await getInstagramPhotos(options.username);
      photos.forEach(photo => {
        contentType.addNode(photo);
      });
    } catch (error) {
      console.error('Error getting instagram photos');
      console.error(error);
    }
  });
};

module.exports.defaultOptions = () => ({
  typeName: 'InstagramPhoto'
});
