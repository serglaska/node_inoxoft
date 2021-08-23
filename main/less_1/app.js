console.log('Hello Node');
const fs = require('fs');
const path = require('path');
const util = require('util');
/////////////////////////////////////////////////////////////////////

const writeFileFS = util.promisify(fs.writeFile);
const renameFSPromise = util.promisify(fs.rename);
const pathBoysFolder = path.join(__dirname, 'boys');
const pathGirlsFolder = path.join(__dirname, 'girls');

const moveGirlsAndBoys = (pathDirectory) => {
  fs.readdir(pathDirectory, (err, files) => {
    if (err) return console.log(err);

    files.forEach((file, index) => {
      const currentFilePath = path.join(pathDirectory, file);
      fs.readFile(currentFilePath, (err, data) => {
        if (err) return console.log(err);

        const separateArr = data.toString().split('\n');
        const pathCurrentBoy = path.join(__dirname, 'boys', file);
        const pathCurrentGirl = path.join(__dirname, 'girls', file);
        const folderPathBoys = path.join(__dirname, 'boys', files[index]);
        const folderPathGirls = path.join(__dirname, 'girls', files[index]);
        if (separateArr.includes('gender: female;')) {
          writeFileFS(pathCurrentGirl, data.toString()).catch(reason => {
            console.log(reason);
          });
          renameFSPromise(folderPathBoys, folderPathGirls).catch(reason => {
            console.log(reason);
          });
        }
        if (separateArr.includes('gender: male;')) {
          writeFileFS(pathCurrentBoy, data.toString()).catch(reason => {
            console.log(reason);
          });
          renameFSPromise(folderPathGirls, folderPathBoys).catch(reason => {
            console.log(reason);
          });
        }
      });
    })
  })
};

moveGirlsAndBoys(pathBoysFolder);
moveGirlsAndBoys(pathGirlsFolder);
