const express = require('express')
const router = express.Router()
const Adminconteoll = require('../controllers/Adminconteoll')
const session = require('express-session')

const rediracthome = (req, res, next) => {
    try{
        //const userid = '';
        if(req.session.userid){
            console.log("yes::")
            next()
        } else{
            console.log("no")
            res.redirect('/login')  
        }
    }
    catch {
        console.log("not at all")
        res.redirect('/login')  
    }
}

router.all('/*', rediracthome,  (req, res, next) => {
    req.app.set('layout', './layouts/adminview')

    next()
})

router.route('/')
    .get(Adminconteoll.index)

router.route('/allposts')
    .get(Adminconteoll.allposts)

router.route('/createposts')
    .get(Adminconteoll.createposts)
    .post(Adminconteoll.registerPost)

router.route('/category')
    .get(Adminconteoll.categoryView)
    .post(Adminconteoll.createcategory)
    
router.route('/Catdelete/:id')
    .get(Adminconteoll.catDelete)

router.route('/home')
    .get(Adminconteoll.home)
    
router.route('/edit/:id')
    .get(Adminconteoll.editPost)
    .put(Adminconteoll.editPostSubmit)

router.route('/delete/:id')
    .get(Adminconteoll.delete)
    .post(Adminconteoll.deleteMult)

router.route('/project')
    .get(Adminconteoll.project)
    .post(Adminconteoll.projectsubmit)

router.route('/deleteproject/:id')
    .get(Adminconteoll.deleteproject)

router.route('/register')
    .get(Adminconteoll.register)
    .post(Adminconteoll.addregister)

router.route('/DeleteUser/:id')
    .get(Adminconteoll.DeleteUser)

router.route('/logout')
    .get(Adminconteoll.logout)

module.exports = router;