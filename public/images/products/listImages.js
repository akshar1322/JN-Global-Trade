const fs = require('fs');
const path = require('path');

const directoryPath = './public/images/products'; // change this to your image folder

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }

  const imageFiles = files.filter(file =>
    imageExtensions.includes(path.extname(file).toLowerCase())
  );

  imageFiles.forEach(file => console.log(file));
});
