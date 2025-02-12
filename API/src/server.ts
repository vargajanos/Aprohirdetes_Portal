import "dotenv/config";
const express = require( "express");
import { AppDataSource } from "./config/data-source";
import './config/autoDeleteExpired';
import router from "./roots";
import { authMiddleware } from "./middlewares/AuthMidleware";
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));  // Statikus fájlok szolgáltatása az 'uploads' mappából

AppDataSource.initialize()
.then(()=>{

    app.use(express.json());
    app.use("/api", router)

// MULTER CONFIG
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Kép vagy fájl mentése a "uploads" mappába
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const originalname = file.originalname.replace(' ', '_');
        const name = originalname.substring(0, originalname.lastIndexOf('.'));
        const ext = originalname.substring(originalname.lastIndexOf('.'));
        cb(null, name + '-' + timestamp + ext);  // Egyedi fájlnév generálása
    }
});

// Multer upload konfiguráció
const upload = multer({ storage: storage });

app.post('/upload', authMiddleware, (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            console.error('File upload error:', err);
            return sendResults(res, '', { message: 'Hiba történt a feltöltéskor!', error: err.message });
        }

        if (!req.file) {
            console.error('File upload failed: req.file is undefined', {
                body: req.body,
                headers: req.headers
            });
            return sendResults(res, '', { message: 'Hiba történt a feltöltéskor! Fájl nem érkezett.' });
        }

        sendResults(res, '', { message: 'Sikeres képfeltöltés!', file: req.file });
    });
});




// Fájl törlése
app.delete('/delete/:filename', authMiddleware, (req, res) => {
    const filename = req.params.filename;  // Fájl neve az URL paraméterekből
    const filePath = path.join(path.resolve(__dirname, '..'), 'uploads', filename);  // A fájl teljes elérési útja

    if (!fs.existsSync(filePath)) {
        return sendResults(res, '', { message: 'A fájl nem található' });
    }

    fs.unlink(filePath, (err) => {  // Fájl törlése
        if (err) {
            console.log(err);
            return sendResults(res, '', { message: 'Hiba történt a fájltörléskor' });
        }
        return sendResults(res, '', { message: 'Fájl sikeresen törölve' });
    });
});



function sendResults(res, err, results){
    if (err){
        res.status(500).send(err);
        return
    }
    res.status(200).send(results);
}

    app.listen(process.env.PORT, ()=>{
        console.log(`Server: http://localhost:${process.env.PORT}`);
    });
})
.catch(
    (err)=>{
        console.log(`Hiba történt az adatbázis kapcsolat felépítésekor! (${err})`);
    }
);

