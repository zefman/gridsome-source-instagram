const { getInstagramPhotos } = require('./src/instagram');

// eslint-disable-next-line func-names
module.exports = function (api, options) {
  if (!options.username) {
    throw new Error('Missing Instagram username');
  }

  if (!options.password) {
    throw new Error('Missing Instagram password');
  }

  api.loadSource(async ({ addCollection }) => {
    const contentType = addCollection({
      typeName: options.typeName,
    });

    try {
      const photos = await getInstagramPhotos(options.username, options.password);
      photos.forEach((photo) => {
        contentType.addNode(photo);
      });
    } catch (error) {
      console.error('Error getting instagram photos');
      console.error(error);
    }
  });
};

module.exports.defaultOptions = () => ({
  typeName: 'InstagramPhoto',
});
