import {Router} from 'express';
import * as VideoController from './controller';
import multer from 'multer';
import multers3 from 'multer-s3';
import path from 'path';
import aws from 'aws-sdk';


const s3 = new aws.S3({
    accessKeyId : 'AKIAUYHRDWZMNFR5DP7K',
    secretAccessKey : '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',
    Bucket : 'snapvideoscollection'


})

const videoFileUpload = multer({
    storage : multers3({
        s3 : s3,
        bucket : 'snapvideoscollection',
        acl : 'public-read',
        key : function(req, file, cb){
            cb(null, Date.now().toString())
        }
    }),
    limits:{
        fileSize : 1024 * 1024 * 40
    },
    fileFilter : function(req,file,cb){
        checkFileType(file, cb);
    }

})

function checkFileType(file, cb){
    const fileTypes = /mp4|jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    if(extname){
        return cb(null, true)
    }
    else{
        cb('Error : video only')
    }

}




const routes = new Router();

routes.post('/uploadVideo',videoFileUpload.single('file'), VideoController.uploadVideo)
routes.post('/getAllVideo', VideoController.getUserAllVideo)
routes.post('/getVideos', VideoController.getAllVideos)

export default routes;