const slugify = require('slugify')
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const Posts = require('../models/posts');
const Category =  require('../models/category');
const Comment =  require('../models/Usercomment');
const Project =  require('../models/project');
const Logininfo =  require('../models/register');
const uniqid = require('uniqid');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')
const mime = require('mime-types')
const session = require('express-session')

const contp = Posts.countDocuments({});
const contc = Category.countDocuments({});
const contpro = Project.countDocuments({})

module.exports = {

    index : (async (req, res) => {
        const userid = req.session.userid;
        const usernamebro = req.session.usernamebro;
        res.render('Admin/index', { title: 'Admin Page - '+usernamebro, usernamebro: usernamebro, contpro: await contpro, CountP: await contp, CountC: await contc})
    }),

    createposts: (async (req, res) => {
        const userid = req.session.userid;
        const usernamebro = req.session.usernamebro;
        const category = await Category.find()
        res.render('Admin/createposts', { title: 'New Posts - '+usernamebro, usernamebro: usernamebro, category: category})
    }),
    
    allposts: ( async (req, res) => {
        const userid = req.session.userid;
        const usernamebro = req.session.usernamebro;
            const posts = await Posts.find().sort({
                createdAt: 'desc' })
            res.render('Admin/allposts', { posts: posts , usernamebro: usernamebro, title: 'All Posts Page - '+usernamebro})
        }),

    home: (req, res) => {
        res.render('User/index', { title: 'Home Page'})
    },

    registerPost:( async (req, res, next) => {
        const userid = req.session.userid;
        const usernamebro = req.session.usernamebro;
        let mainimgname = uniqid('MAIN' , '1-');
        let filename = '';
        try{
            let file = req.files.mainimg;
            const pathogIMageg = path.join(__dirname, file.name)
            filename = mainimgname+file.name;
            const minmeofimage = mime.contentType(file.name)
            let UploadDir = './public/PostImages/'
                file.mv(UploadDir+filename, (err) => {
                    if(err)
                        throw err;
                }) 
            console.log(minmeofimage+" : Upload image : "+filename)
        }
        catch (e){
            console.log(e)
             filename = "default.jpg";
             console.log("default image :  "+filename)
        }
            const newPost = new Posts ({
                title : req.body.title,
                description : req.body.description,
                CategoryName : req.body.catto,
                mainimg  : filename
            })
            try {
                article = await newPost.save()
                req.flash('success-message', 'Post created successfully.');
                res.redirect('/admin/allposts');
             }
             catch (e){ 
                 console.log(e)
                 req.flash('error-message', 'Post Failed to created successfully.');
                 res.redirect('/admin/allposts');
             }
            console.log(newPost.title+'+'+newPost.description)
            next()
            }),

    delete: (async (req, res) => {
            let UploadDir = './public/PostImages/'
            const posts = await Posts.findOne({  _id: req.params.id })
            const filename = posts.mainimg;
            console.log('Deleted-'+filename)
            if(filename!="default.jpg"){
                fs.unlink(UploadDir+filename, (err) => {
                    if(err)
                    console.log('Deleted-'+filename)
                })
            } else {
                console.log("no image is deleted-"+filename)
            }
            try {
                req.flash('success-message', 'Post Delete successfully.');
                await Posts.findByIdAndDelete(req.params.id)
                res.redirect('/admin/allposts');
             }
             catch (e){ 
                 console.log(e)
                 req.flash('error-message', 'Post Failed to Delete successfully.'); 
                 res.redirect('/admin/allposts');
             }
        }),

    deleteMult:  (async (req, res) => {
        const MultDel = { _id: req.body.checkman }
        // for((key,value) in MultDel){
        //     const posts = await Posts.find({  _id: req.body.checkman })
        //     const filename = posts.mainimg;
        //     console.log('Deleted-'+filename)
        //   }
        
        
        const filename = MultDel.mainimg
        try {
            req.flash('success-message', 'Selected Posts Delete successfully.');
            await Posts.deleteMany(MultDel)
            res.redirect('/admin/allposts');
         }
         catch (e){ 
             console.log(e)
             req.flash('error-message', 'Selected Posts Failed to Delete successfully.'); 
             res.redirect('/admin/allposts');
         }
    }),

    editPost: (async (req, res) => {
        const userid = req.session.userid;
        const usernamebro = req.session.usernamebro;
        const posts = await Posts.findById(req.params.id)
        const category = await Category.find()
        res.render('Admin/editPost', { usernamebro: usernamebro, posts: posts, title: 'Edit Post - '+usernamebro, category: category})
    }),

    editPostSubmit:  (async (req, res, next) => {
        try{
        let file = req.files.mainimg;
        if(file != null){
            let UploadDir = './public/PostImages/'
            const filenamedel = req.body.myimg ;
            //console.log('Deleted-'+filenamedel)
            fs.unlink(UploadDir+filenamedel, (err) => {
                if(err)
                    throw err;
            })
            let filename = '';
            let mainimgname = uniqid('MAIN' , '1-');
            filename = mainimgname+file.name;
            file.mv(UploadDir+filename, (err) => {
                if(err)
                    throw err;
                })
            var mainimg  = filename 
        }
        }
        catch{
            //console.log("it me dumass upload")
            var mainimg  = req.body.myimg  
        }
       var postsid = req.params.id
       var titlee = req.body.title
       var descriptione = req.body.description
       var CategoryNameee = req.body.catto     
        try { 
            slug = slugify(titlee, { lower: true, string: true })
            sanitizedHtml = dompurify.sanitize(marked(descriptione))
            req.flash('success-message', 'Posts Edited successfully.');
            await Posts.findByIdAndUpdate({_id: postsid},{title: titlee,mainimg: mainimg, description: descriptione, sanitizedHtml: sanitizedHtml, slug: slug, CategoryName: CategoryNameee, createdAt: Date.now()})
            res.redirect('/admin/allposts');
            console.log("Updated Posts ID"+req.params.id)
        }
        catch (e){ 
            console.log(e)
            req.flash('error-message', 'Posts Failed to Edited successfully.'); 
            res.redirect('/admin/allposts');
            console.log("Failed Updated  Posts ID"+req.params.id)
        }
        next()
    }),

    categoryView: ( async (req, res) => {
        const userid = req.session.userid;
        const usernamebro = req.session.usernamebro;
        const category = await Category.find()
        //.sort({createdAt: 'desc' })
            res.render('Admin/category',{usernamebro: usernamebro, title: 'Category Page - '+usernamebro, category: category} )
    }),

    createcategory: (req, res) => {
        var categoryname = req.body.namec;

        if(categoryname) {
            const newCategory = new Category({
                CategoryName: categoryname
            })
            
            newCategory.save().then(category => {
                res.status(200).json(category);
            })
        }
    },

    catDelete: (async (req, res) => {
        try {
            req.flash('success-message', 'Category Delete successfully.');
            await Category.findByIdAndDelete(req.params.id)
            res.redirect('/admin/category');  
         }
         catch (e){ 
             console.log(e)
             req.flash('error-message', 'Category Failed to Delete successfully.'); 
             res.redirect('/admin/category');  
         }
    }),

    project: (async (req, res) => {
        const userid = req.session.userid;
        const usernamebro = req.session.usernamebro;
        const project = await Project.find().sort({
            createdAt: 'desc' })
        res.render('Admin/project',{ usernamebro: usernamebro, title: 'Project page - '+usernamebro, project: project});
    }),

    projectsubmit: (async (req, res) => {
        let mainimgname = uniqid('Project' , '1-');
        let filename = '';
        try{
            let file = req.files.projectimg;
            filename = mainimgname+file.name;
            let UploadDir = './public/ProjectImages/'
                file.mv(UploadDir+filename, (err) => {
                    if(err)
                        throw err;
                }) 
            console.log("Upload image :  "+filename)
        }
        catch (e){
            filename = "default.jpg";
            console.log("default image :  "+filename)
        }
        const newProject = new Project ({
            title : req.body.title,
            des : req.body.des,
            link : req.body.link,
            projectimg  : filename
        })
        try {
            article = await newProject.save()
            req.flash('success-message', 'Project uploaded successfully.');
            res.redirect('/admin/project'); 
         }
         catch (e){ 
             console.log(e)
             req.flash('error-message', 'Project Failed to uploaded successfully.');
             res.redirect('/admin/project'); 
         }
        console.log(newProject.title)
    }),
    
    deleteproject: (async (req,res) =>{
        try{
            let a = req.params.id
            
        let UploadDir = './public/ProjectImages/'
            const posts = await Project.findOne({  _id: a })
            const filename = posts.projectimg;
            console.log('Deleted-'+filename)
            if(filename!="default.jpg"){
                fs.unlink(UploadDir+filename, (err) => {
                    if(err)
                    console.log('Deleted-'+filename)
                })
            } else {
                console.log("no image is deleted-"+filename)
            }
            try {
                console.log("delete projecct")
                req.flash('success-message', 'Project Delete successfully.');
                await Project.findByIdAndDelete(req.params.id)
                res.redirect('/admin/project'); 
             }
             catch (e){ 
                 console.log(e)
                 req.flash('error-message', 'Project Failed to Delete successfully.'); 
                 res.redirect('/admin/project'); 
             }
            }
            catch{
                res.redirect('/admin/project'); 
                console.log("failed to delete projecct")
            }
    }),

    register: (async (req,res) =>{
        const userid = req.session.userid;
        const usernamebro = req.session.usernamebro;
        const Usergame = await Logininfo.find()
        res.render('Admin/register',{title: 'ADD user page - '+usernamebro,Usergame:Usergame,usernamebro:usernamebro})
    }),

    addregister: (async (req,res) =>{
        try{
            const hashpassword = await bcrypt.hash(req.body.pass, 10)
            const newLogininfo = new Logininfo ({
                username : req.body.user,
                password : hashpassword,
            })
            req.flash('success-message', 'User created successfully.');
            article = await newLogininfo.save()
            res.redirect('/admin/register'); 
            console.log(req.body.user+"::"+hashpassword)
            
        } catch {
            req.flash('error-message', 'User Failed to created successfully.');
            res.redirect('/admin/register'); 
        }
    }),
    DeleteUser: (async (req,res) =>{
            let a = req.params.id
            try {
                console.log("delete User")
                req.flash('success-message', 'User Delete successfully.');
                await Logininfo.findByIdAndDelete(req.params.id)
                res.redirect('/admin/register'); 
             }
             catch (e){ 
                 console.log(e)
                 req.flash('error-message', 'User Failed to Delete successfully.'); 
                 res.redirect('/admin/register'); 
             }
    }),
    logout: (async (req,res) =>{
        try{
            const donah = req.session.destroy();
            if(donah){
                res.redirect('/');
                console.log("logout bro")
            } else {
                res.redirect('/admin');
                console.log("what bro")
            }
        }
        catch{
            res.redirect('/admin');
            console.log("falied to logout bro")
        }
    }),

}