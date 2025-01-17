import multer from "multer";
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const deleteFile = (filePath) => {
    if (filePath != undefined) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
};


export const upload = multer({
    storage,
})

export { deleteFile }