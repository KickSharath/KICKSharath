const mongoose = require('mongoose')
const slugify = require('slugify')
const marked = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    CategoryName: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    mainimg: {
        type: String,
        default: 'default.jpg'
    },
    sanitizedHtml: {
        type: String,
        required: true
    }

})

postsSchema.pre('validate', function(next){
    if (this.title) {
        this.slug = slugify(this.title, { lower: true,
        string: true })
    }
    if (this.description) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.description))
    }

    next()
})

module.exports = mongoose.model('Posts', postsSchema)