import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: "dn8vxrh13",
    api_key: "424163414922576",
    api_secret: "A5rebG-eocNGAXf_Dx-VNwbqjRo"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'PackYourBags',
        allowedFormats: ['jpeg', 'jpg', 'png']
    }
});

export { cloudinary, storage };
