const express = require('express');
const PhotoService = require('../services/photoService')
const photoRouter = express.Router();
const sequelize = require('../config/index');
const Photo = require('../models/sequelize/index');

const photoService = new PhotoService(sequelize);

photoRouter.get('/', async (req, res) => {
    try {
        const photos = await photoService.getPhotos();
        res.status(200).send(photos);
      } catch(error) {
        res.status(500);
        console.log(error);
      }
});    

photoRouter.get('/:id', async (req, res) => {
  try {
    const photo = await photoService.getPhotoById(req.params.id);
    res.status(200).send(photo);
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});  

photoRouter.put('/:id', async (req, res) => {
  try {
    const photo = await photoService.updatePhoto(req.params.id, req.body);
    res.status(200).send(photo);
  } catch(error) {
    res.status(500);
    console.log(error);
  }
});  

photoRouter.post('/', async (req, res) => {
    try {
        const photo = await photoService.createPhoto(req.body);
        res.status(201).send(photo);
    } catch(error) {
        throw new Error('Error creating photo');
    }
});

photoRouter.delete('/:id', async (req, res) => {
  try {
    const photo = await photoService.deletePhoto(req.params.id);
    res.status(200).send('Photo deleted');
  } catch(error) {
    res.status(500);
  }
});  

module.exports = photoRouter;