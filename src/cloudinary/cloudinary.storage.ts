import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const CloudinaryStorageConfig = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'uploads', // Папка для збереження файлів у Cloudinary
    format: file.mimetype.split('/')[1], // Витягуємо формат файлу (наприклад, 'jpg', 'png')
    public_id: file.originalname.split('.')[0], // Використовуємо ім'я файлу без розширення
    resource_type: 'image', // Тип ресурсу
  }),
});
