import multer from 'multer';

const uploader = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Por favor suba una imagen válida'));
    }

    cb(undefined, true);
  },
});

export default uploader;
