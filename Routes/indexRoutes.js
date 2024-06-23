const express = require('express');
const router = express.Router();
const controller = require('../Controller/indexController');


router.post('/signup', controller.signup);
router.get('/login', (req, res) => res.render('login.ejs'));
router.post('/login', controller.login);
router.get('/index', (req, res) => res.render('index.ejs'));
router.get('/POTM', (req, res) => res.render('potm.ejs'));
router.get('/MyAccount', (req, res) => res.render('MyAccount.ejs'));
router.get('/', (req, res) => res.render('index.ejs'));
// router.get('/BookNow', (req, res) => res.render('BookNow.ejs'));
router.get('/Browse', controller.browseEvents);

router.get('/Store', controller.getProfile);
router.post('/addpicture', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const imgFile = req.files.img;
    const validExtensions = ['.png', '.jpeg', '.jpg'];
    const fileExtension = path.extname(imgFile.name).toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).send('Invalid file type.');
    }

    const fileName = req.body.un + fileExtension;
    const uploadPath = path.join(__dirname, '../public/materials/', fileName);

    imgFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        const emp = new Employees({
            UserName: req.body.un,
            Password: req.body.pw,
            Image: fileName,
            Type: req.body.type
        });

        emp.save()
            .then(() => {
                res.redirect('/master');
            })
            .catch(err => {
                console.log(err);
                res.status(500).send('Error saving employee data.');
            });
    });
});

router.post('/getpicture', (req, res) => {
    var query = { UserName: req.body.un, Password: req.body.pw };
    Employees.findOne(query)
        .then(result => {
            if (!result) {
                return res.status(404).send('User not found.');
            }
            req.session.user = result;
            res.redirect('/master');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error retrieving user data.');
        });
});

router.get('/BookNow/:id', controller.getEventData);
module.exports = router;
