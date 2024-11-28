import { Photo } from '../models/sequelize/photo';

class PhotoService {

    constructor(sequelize) {
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async createPhoto({name, url, description, user_id}) {
        try {
            const photo = await this.models.Photo.create({
                name, 
                url, 
                description, 
                user_id
            });
            return photo;
        } catch (error) {
            throw new Error('Error creating photo');
        }
    }

    async getPhotos() {
        try {
            const photos = await this.models.Photo.findAll();
            return photos;
        } catch (error) {
            throw new Error('Error fetching photos');
        }
    }

    async getPhotoById (id) {
        try {
            const photo = await this.models.User.findByPk(id);
            return photo;
        } catch (error) {
            throw new Error('Error fetching photo');
        }
    }

    async updatePhoto(id, photoData) {
        try {
            const photo = await this.models.Photo.findByPk(id);
            if (photo) {
                await photo.update(photoData);
                return photo;
            }
            throw new Error('Photo not found');
        } catch (error) {
            throw new Error('Error updating photo');
        }
    }

    async deletePhoto(id) {
        try {
            const photo = await this.models.Photo.findByPk(id);
            if (photo) {
                await photo.destroy();
                return true;
            }
            throw new Error('Photo not found');
        } catch (error) {
            throw new Error('Error deleting photo');
        }
    }
};

export default PhotoService;