const MessageController = require('../controllers/MessageController');
const UserController = require('../controllers/UserController');
const authentication = require('../middleware/authentication');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Server nyala way');
});

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);

router.use(authentication);

router.get('/messages/:id', MessageController.getMessage);

router.post('/messages/:id', MessageController.sendMessage);

router.get('/users', UserController.getUserData);

module.exports = router;
