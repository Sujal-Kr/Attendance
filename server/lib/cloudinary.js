import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuid } from 'uuid'

const uploadToCloud = async (files) => {
    try {
        const promises = files?.map(file => {

            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(file.path, { resource_type: "auto", public_id: uuid() }, (err, result) => {
                    if (err) {
                        console.error("Error uploading file:", file.path, err.message);
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        });
        const results = await Promise.all(promises);
        const formattedResult = results.map(result => ({
            public_id: result.public_id,
            url: result.secure_url
        }));
        return formattedResult
    } catch (err) {
        throw new Error("Failed to upload to cloud" + err.message);
    }

};


const deleteFromCloud = async (files) => {
    try {
        const promises = files.map(async (file) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(file.public_id, {}, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                })
            })
        })
        const result = await Promise.all(promises)
        return result
    } catch (err) {
        throw new Error("Failed to delete from cloud" + err.message);
    }
}

export { uploadToCloud, deleteFromCloud }