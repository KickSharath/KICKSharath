require('dotenv').config()
module.exports = {
    //mongoDbURL : 'mongodb://localhost/kicksharath',
    
    mongoDbURL : process.env.DB_Link,
    PORT : process.env.PORT || 8080,
    gobleVariable: (req, res, next) => {
        res.locals.success_message = req.flash('success-message')
        res.locals.error_message = req.flash('error-message')
        next();
    }
};
