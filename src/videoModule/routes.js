import {Router} from 'express';
import * as VideoController from './controller';
import multer from 'multer';

// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         console.log(file)
//         cb(null, './uploads/')
//     },
//     filename : function(req,file,cb){
//         cb(null, new Date().toISOString() + file.originalname)
//     }
// })

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
    }
});

const upload = multer({storage : storage, limits : {
    fieldSize : 1024 * 1024 * 100
}})

const routes = new Router();

routes.post('/uploadVideo',upload.single('file'), VideoController.uploadVideo)

export default routes;