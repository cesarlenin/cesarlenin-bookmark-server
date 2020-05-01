const express = require('express');
const { v4 : uuid} = require('uuid');
const logger = require('./logger');
const { bookmarks }= require('./store');
const { PORT} = require('./config');

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('/')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser,(req, res) => {

    console.log(req.body);

    const {
      title,
      url,
      description,
      rating,
    } = req.body;

    if (!title) {
      logger.error('title is required');
      return res.status(400);
    }
    if (!url) {
      logger.error('url is required');
      return res.status(400);
    }
    if (!description) {
      logger.error('description is required');
      return res.status(400);
    }
    if (!rating || !Number.isInteger(Number(rating))) {
      logger.error('rating needs to be a number');
      return res.status(400);
    } 

    const id = uuid();
    const newBookmarks = {
      title,
      url,
      description,
      rating,
      id,
    };

    bookmarks.push(newBookmarks);
    res
      .status(201)
      .location(`http://localhost:${PORT}/bookmarks/:${newBookmarks.id}`)
      .json(newBookmarks);
  });

// bookmarksRouter
//   .route('/:id')
//   .get((req, res) => {/* code not shown */})
//   .delete((req, res) => {/* code not shown */});
  
module.exports = bookmarksRouter;