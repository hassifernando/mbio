// in this file you can append custom step methods to 'I' object

var fs = require('fs');
module.exports = function () {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    createFile(path, content) {
      fs.writeFile(path, content, function (err) {
        if (err) throw err;
        console.log(`File is created successfully and content is saved into the ${path}.`);
      });
    }

  });
}
