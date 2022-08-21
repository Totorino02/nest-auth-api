import * as multer from "multer";
import * as path from "path";
import { uuid } from "uuidv4";

export class FileSaver{
    
    constructor(){}

    // help us for image storage
    public static imageStorage(){
        return multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, path.join(process.cwd(), "files", `images`));
            },
            filename: (req, file, cb)=>{
                cb(null, Date.now()+"."+uuid()+path.extname(file.originalname));
            }
        })
    }

    // help us for document storage
    public static documentStorage(){
        return multer.diskStorage({
            destination: (req, file, cb)=>{
                cb(null, path.join(process.cwd(), "files", `docs`));
            },
            filename: (req, file, cb)=>{
                cb(null, Date.now()+"."+uuid()+path.extname(file.originalname));
            }
        });
    }
}