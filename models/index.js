const router = require('express').Router();
const thoughtSchema = require('./Thoughts');
const userSchema = require('./Users');

module.exports ={ thoughtSchema, userSchema};