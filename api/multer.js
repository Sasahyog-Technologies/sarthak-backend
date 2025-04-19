const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinary');
const fs = require('fs');


const router = express.Router();
const upload = multer({dest: 'uploads/'});

router.post('upload-pdf', upload.single('pdf'),async (req,res) => {
    try{
        const filePath = req.file.path;

        const result = await cloudinary.uploader.upload(filePath,{
            resource_type : 'raw',
            folder : 'pdfs'
        })

        fs.unlinkSync(filePath);

        res.status(200).json({url: result.secure_url});
    } catch(error){
        console.log('Upload error', error);
        res.status(500).json({error : 'Failed to upload pdf'});
    }
})

module.exports = router;