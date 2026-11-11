
import multer, { Multer } from 'multer';
import {tmpdir} from "os"
import { MulterEnums } from '../enums/multer.enums.js';
import { Request } from 'express';
import { BadRequestException, UnsupportedMediaTypeException } from '@nestjs/common';

export const multerOption=({storageKey=MulterEnums.memoryStorage}:{
    storageKey?:MulterEnums
})=>{

     return {
        storage: storageKey==MulterEnums.memoryStorage? multer.memoryStorage() : multer.diskStorage({
        // destination:'./upoluds',
       destination: function (req:Request,file:Express.Multer.File,cb:any){
            cb(null,tmpdir())
        },
         filename:function(req:Request,file:Express.Multer.File,cb:any){
            let fileName=Date.now()+'-'+file.originalname
            cb(null,fileName)
        }

    }),
    fileFilter:(req:Request,file:Express.Multer.File,cb:any)=>{
        if (file.mimetype.match(/^(image\/(jpg|jpeg|png)|application\/pdf)$/)) {
            cb(null,true)
        }else{
            cb(new UnsupportedMediaTypeException(" only jpg or jpeg or png or pdf accepted"),false)
        }
    },
    limits:{
        fileSize:5*1024*1024
    }
    
     }
}