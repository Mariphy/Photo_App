import express from 'express';
import PhotoService from '../services/photoService';
import sequelize from '../config/sequelize';

const photoService = new PhotoService(sequelize);
const photoRouter = express.Router();

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

export default photoRouter;