const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dh51g3bku",
    api_key: '428761122543635',
    api_secret: 'opSoj6yaUAUNcAEIzvj80HBs-ac',
    secure : true,
})

module.exports = cloudinary;