#!/usr/bin/env node
import open, { apps } from 'open'; //allows us to use even across Operating Systems
import dotenv from 'dotenv';
// import Database from 'better-sqlite3';
import fs from 'fs'
import {
  addFavorite,
  replaceFavorite,
  getFavorite,
  getFavorites,
  deleteFavorite
} from './lib/sdk.js';



dotenv.config();

const args = process.argv.slice(2);
const command = args[0];
const favorite = args[1];
const url = args[2];

// 



// checking the browser
function checkBrowser() {
  const browser = process.env?.BROWSER?.toLocaleLowerCase();
  let appName = browser;

  switch(browser) {
    case 'chrome':
      appName = apps.chrome;
      break;
    case 'firefox':
      appName = apps.firefox;
      break;
    case 'edge':
      appName = apps.edge;
      break;
  }

  return appName;
}

function displayMenu() {
  console.log('ls                     : List all favorites.');
  console.log('open <favorite>        : Open a saved favorite.');
  console.log('add <favorite> <url>   : add a new favorite for some URL');
  console.log('rm <favorite>          : remove a saved favorite.');
}

function openFavorite(favorite){

  const row = db.prepare('SELECT * FROM favorites WHERE name = ?')
  .get(favorite);

  if(!row) {
    console.log("Favorite not found!");
    process.exit(1);
  }

  const url = row.url

  console.log('opening ', url);
  const appName = checkBrowser()

  if(appName){
    open(url, { app: {name: appName} })
    console.log(appName)
  } else {
    open(url);
  }

}

function add(favorite, url) {
  db.prepare('INSERT INTO favorites (name, url) VALUES (?, ?)').run (
    favorite,
    url
  );
  console.log('adding', favorite, url);

}

function rm(favorite) {
  // db.prepare('DELETE FROM favorites WHERE name = ?').run(favorite);
  console.log('removing', favorite)
}

const ls = async () => {
  // const favorites = db.prepare('SELECT * FROM favorites').all();
  const favorites = await getFavorites();
  console.log('All Favorites: ');
  favorites.forEach((favorite) => {
    console.log(`${favorite.name}: ${favorite.url}`)
  })
}

// if(!fs.existsSync(dbPath)){
//   init();
// }else {
//   db = new Database(dbPath)
// }

const argCount = args.length;

/*
if(argCount === 0 || !['ls', 'open', 'rm', 'add'].includes(command)){
  displayMenu();
  process.exit(1);
}

switch(command) {
  case 'ls':
    ls();
    break;
  case 'open':
    if(!favorite){
      displayMenu();
      process.exit(1);
      break;
    }
    openFavorite(favorite);
    break;
  case 'add':
    if(!favorite || !url){
      displayMenu();
      process.exit(1);
      break;
    }
    add(favorite, url);
    break;
  case 'rm':
    if(!favorite){
      displayMenu();
      process.exit(1);
      break;
    }
    remove(favorite);
    break
}

*/

const commands = {
  ls: {f: ls, argCount: 1},
  open: {f: openFavorite, argCount: 2},
  rm: { f: rm, argCount: 2},
  add: { f: add, argCount: 3}
};

if (
  argCount === 0 ||
  !commands[command] ||
  argCount < commands[command].argCount
) {
  displayMenu();
  process.exit(1);
}

await commands[command].f(favorite, url);


/*

let db;
// const dbPath = 'favorites.db'

// function init() {
//   console.log('initializing database...');
//   db = new Database(dbPath);

//   const createTable = `
//     CREATE TABLE IF NOT EXISTS favorites (
//       id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       url TEXT NOT NULL
//     )
//   `;

//   db.exec(createTable);

//   const data =[
//     {name: 'goog', url: 'https://google.com'},
//     {name: 'social', url: 'https://instagram.com'},
//     {name: 'news', url: 'https://yahoo.com'}
//   ];

//   const insertData = db.prepare(
//     'INSERT INTO favorites(name, url) VALUES (?, ?)')

//     data.forEach((favorite) => {
//       insertData.run(favorite.name, favorite.url);
//     });
  
// }

function displayMenu() {
  console.log('open <favorite>        : Open a saved favorite.');
  console.log('add <favorite> <url>   : add a new favorite for some URL');
  console.log('rm <favorite>          : remove a saved favorite.');
}

// function openFavorite(favorite) {
//   let url;
//   if(favorite === 'goog') {
//     url = 'https://google.com';
//   }
//   else if(favorite === 'social') {
//     url = 'https://instagram.com';
//   }
//   else if(favorite === 'code') {
//     url = 'https://leetcode.com';
//   }
//   else {
//     console.log('shortcut', shortcut, ' Does not exit')
//   }
//   let command;



  // using open()
  // switch(process.platform) {
  //   case 'darwin':
  //     command = `open -a "Google Chrome" ${url}`
  //     break;
  //   case 'win32':
  //     command = `start chrome ${url}`;
  //     break;
  //   case 'linux':
  //     command = `google-chrome ${url}`;
  //     break;
  //   default:
  //     console.log('Unsupported Platform')
  //     break;
  // }


  console.log('opening ', url);
  const appName = checkBrowser()

  if(appName){
    open(url, { app: {name: appName} })
    console.log(appName)
  } else {
    open(url);
  }
  //bc we are using open don't need the exec either
  // exec(command, (error, stdout, stderr) => {
  //   if(error) {
  //     console.log('error:', error.message)
  //   }

  //   if(stderr) {
  //     console.log('stderr:', stderr);
  //   }

  //   if(error || stderr) {
  //     return;
  //   }

  //   console.log(stdout);
  // });
}

if(!command || command === 'help'){
  displayMenu()

} else {
  switch(command) {
    case 'ls':
      ls();
      break;
    case 'open':
      if(!favorite){
        displayMenu();
        break;
      }
      openFavorite(favorite);
      break;
    case 'add':
      if(!favorite || !url){
        displayMenu();
        break;
      }
      add(favorite, url);
      break;
    case 'rm':
      if(!favorite){
        displayMenu();
        break;
      }
      remove(favorite);
      break
  }
}


*/