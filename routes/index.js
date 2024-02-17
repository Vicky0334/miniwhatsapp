var express = require('express');
var router = express.Router();
const userModel = require('./users')
const messageModel = require('./message')
var users = require('./users')
var passport = require('passport')
var localStrategy = require('passport-local')
passport.use(new localStrategy(users.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register', (req, res, next) => {
  var newUser = {
    //user data here
    username: req.body.username,
    email: req.body.email,
    //user data here
  };
  userModel
    .register(newUser, req.body.password)
    .then((result) => {
      passport.authenticate('local')(req, res, () => {
        //destination after user register
        res.redirect('/home')
      });
    })
    .catch((err) => {
      res.send(err);
    });
});


router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
  }),
  (req, res, next) => { }
);

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect('/login');
}


router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated())
    req.logout((err) => {
      if (err) res.send(err);
      else res.redirect('/');
    });
  else {
    res.redirect('/');
  }
});

router.get('/home', isloggedIn, async (req, res, next) => {
  const loggedInUser = req.user



  res.render('home', {
    loggedInUser
  })
})

router.post('/searchUser', isloggedIn, async (req, res, next) => {
  const data = req.body.data

  const allUsers = await userModel.find({
    username: {
      $regex: data,
      $options: 'i'
    }
  })

 
  res.status(200).json(allUsers)

})




module.exports = router;
