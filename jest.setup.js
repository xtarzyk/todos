import $ from 'jquery';
import { TextEncoder, TextDecoder } from 'util'

global.$ = global.jQuery = $;
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
});

const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
<body>
</body>
</head>
</html>`)