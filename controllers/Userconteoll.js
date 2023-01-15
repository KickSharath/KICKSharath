const marked = require('marked')
const createDomPurify = require('dompurify')
const bcrypt = require('bcrypt')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const Posts = require('../models/posts');
const Category =  require('../models/category');
const Comment =  require('../models/Usercomment');
const Project =  require('../models/project');
const Logininfo =  require('../models/register');

require('dotenv').config()

module.exports = {

    index : ( async (req, res) => {
        const contcatpostno = await Posts.countDocuments({});
        let postLimit = 5;
        let totalpring = '';
        let abc = await contcatpostno/postLimit;
        if (Number.isInteger(abc)) {
            totalpring = abc;
            //console.log("I am int:"+abc)
        }
        else{
            ac = parseInt(abc)+1
            totalpring = ac;
            //console.log("I am float:"+ac)
        }
        const posts = await Posts.find().sort({
            createdAt: 'desc' }).limit(postLimit)
        const category = await Category.find()
        if(contcatpostno==0){
            const mymessage = 'No Posts';
           return res.render('User/index', { posts: posts, postLimit: totalpring, PostNull: mymessage, category: category, title: 'Home Page'})
        }
        res.render('User/index', { posts: posts, postLimit: totalpring, PostNull: '', category: category, title: 'Home Page'})
    }),

    UserView: ( async (req, res) => {
        const posts = await Posts.findOne({ slug: req.params.slug })
        const countComment = await Comment.countDocuments({PostID: posts._id});
        const comment = await Comment.find({PostID: posts._id}).sort({
            createdAt: 'desc' })
        res.render('User/view', { posts: posts, comment: comment, title: req.params.slug, totalcomment: countComment})
    }),

    about: (async (req, res) => {
        const contcatprojectno = await Project.countDocuments({});
        const project = await Project.find().sort({
            createdAt: 'desc' })
        res.render('User/about', { project: project, contcatprojectno: contcatprojectno, title: 'Project Page'})
    }),

    login: (req, res) => {
            try{
                if(req.session.userid){
                    res.redirect('/admin') 
                    console.log('no logout')
                } else{
                    console.log('logout')
                    res.render('User/login',{title: 'Login Page'}) 
                }
            }
            catch {
                console.log('logout')
                res.render('User/login',{title: 'Login Page'}) 
            }
    },

    loginAut: (async (req, res) => {
        const username = req.body.user;
        const password = req.body.pass;
        console.log(username+"+"+password)
        try{
            Logininfo.findOne({$or: [{username: username}]}).then(user =>{
                if(user){
                    bcrypt.compare(password, user.password, function(err, result){
                        if(err){
                            console.log("err")
                            console.log(err)
                        }
                        if(result){
                            req.session.userid = user._id;
                            req.session.usernamebro = user.username;
                            console.log(req.session.userid+"::"+user._id)
                            //const AutVer = process.env.LogingKey;
                            console.log("done password")
                            req.flash('success-message', 'Successfully Login.');
                            res.redirect('/admin');
                            //res.render('User/login',{title: 'Login Page', AutVer: AutVer})
                        } else {
                            req.flash('error-message', 'Invalid Username or Password');
                            //console.log("worng password")
                            res.render('User/login',{ title: 'Login Page'})
                        }
                    })
                } else {
                   // console.log("usernot Fond")
                   req.flash('error-message', 'Invalid Username or Password');
                    res.render('User/login',{title: 'Login Page'})
                }
            })
        } catch{
            console.log("what login")
            res.render('User/login',{title: 'Login Page'})
        }
    }),

    CommentCreat: (req, res) => {
        var username = req.body.username;
        var comment = req.body.comment;
        var postid = req.body.postid;
       //console.log("UserName: "+username+"Comment: "+comment)
       if(username) {
        const newComment= new Comment({
            UserName: username,
            Comment: comment,
            PostID: postid
        })
        
        newComment.save().then(comment => {
            res.status(200).json(comment);
        })
    }
    },

    catNameView: ( async (req, res) => {
        const contcatpost = await Posts.countDocuments({ CategoryName: req.params.CategoryName });
        let postLimit = 0;
        const posts = await Posts.find({ CategoryName: req.params.CategoryName }).sort({
            createdAt: 'desc' })
        const category = await Category.find()
        if(contcatpost==0){
            const mymessage = 'No Posts There In '+req.params.CategoryName;
            res.render('User/index', { posts: posts, postLimit: postLimit, PostNull: mymessage, category: category, title: 'Home Page'})
        }
        else{
            const mymessage = req.params.CategoryName+"("+contcatpost+")";
        res.render('User/index', { posts: posts, postLimit: postLimit, category: category, PostNull: mymessage, title: 'Home Page'})}
    }),

    getPostslimit: ( async (req, res) => {
        let postLimit = 5;
        const contcatpostno = await Posts.countDocuments({});
        let page = req.params.start;
        let limit = 5;
        let totalpring = '';
        let abc = await contcatpostno/postLimit;
        if (Number.isInteger(abc)) {
            totalpring = abc;
            //console.log("I am int:"+abc)
        }
        else{
            ac = parseInt(abc)+1
            totalpring = ac;
            //console.log("I am float:"+ac)
        }
        const posts = await Posts.find().skip((page-1)*limit).sort({
            createdAt: 'desc' }).limit(limit);
        //console.log(posts+":"+page)
        const category = await Category.find()
        res.render('User/index', { posts: posts, postLimit: totalpring, PostNull: '', category: category, title: 'Home Page'})
    }),
 
}
        