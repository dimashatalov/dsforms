const path = require('path');

module.exports = {
 mode : "development",
 entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'ds-forms.js',
    library: 'DS_Forms',
    libraryTarget:'umd'
  },
};
