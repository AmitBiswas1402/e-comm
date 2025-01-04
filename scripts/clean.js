const fs = require('fs');
const path = require('path');

const nextDir = path.join(__dirname, '..', '.next');

fs.rm(nextDir, { recursive: true, force: true }, (err) => {
  if (err) {
    console.error(`Error deleting .next directory: ${err.message}`);
  } else {
    console.log('.next directory deleted successfully');
  }
});
