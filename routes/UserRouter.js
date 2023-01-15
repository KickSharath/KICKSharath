const express = require('express')
const router = express.Router()
const Userconteoll = require('../controllers/Userconteoll')
const session = require('express-session')

router.all('/*', (req, res, next) => {
    req.app.set('layout', './layouts/userview')

    next()
})

router.route('/')
    .get(Userconteoll.index)

router.route('/login')
    .get(Userconteoll.login)
    .post(Userconteoll.loginAut)

router.route('/view/:slug')
    .get(Userconteoll.UserView)

router.route('/about')
    .get(Userconteoll.about)

router.route('/FindCategory/:CategoryName')
    .get(Userconteoll.catNameView)

router.route('/CommentCre')
    .post(Userconteoll.CommentCreat)

router.route('/get-Posts/:start')
    .get(Userconteoll.getPostslimit)
    

module.exports = router;