const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
var cors = require('cors')
const { uuid } = require('uuidv4');

//Settings
app.set('port', process.env.PORT || 3001);

//Static files
app.use(express.static(path.join(__dirname, 'public/')));

//Middlewares
app.use(cors());
app.use(express.urlencoded({extended: false}));

const storage = multer.diskStorage({
  destination: path.join(__dirname, '/public/uploads/img'),
  filename: (req, file, callback) => {
    callback(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
  }
})

app.use(multer({
  storage: storage,
  fileFilter: (req, file , callback) => {
    const filetypes = /jpeg|png|jpg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname= filetypes.test(path.extname(file.originalname));
    if(mimetype && extname){
        return callback(null, true);
    }
    callback("Error")
  },
  limits: { 
    fileSize: 1000000
  }
}).single('img_url'));

//Routes
app.use(require('./routes/books'))

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
