// const {exec} = require('child_process')
import {exec} from 'child_process' // can't use above bc changed to type: module in package.json file
let command;

switch(process.platform) {
  case 'darwin':
    command = 'open -a "Google Chrome" https:google.com'
    break;
  case 'win32':
    command = 'start chrome https://google.com';
    break;
  case 'linux':
    command = 'google-chrome https://google.com';
    break;
  default:
    console.log('Unsupported Platform')
}

exec(command, (error, stdout, stderr) => {
  if(error) {
    console.log('error:', error.message)
  }

  if(stderr) {
    console.log('stderr:', stderr);
  }

  if(error || stderr) {
    return;
  }

  console.log(stdout);
});