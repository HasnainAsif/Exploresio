require('./auth')

module.exports = {
    adminAuth : function(req,res,next){
        if(req.user == "5eb25655a9ddf81e70a427ec")
            return next();
        else{
            res.json({msg : "You cannot perform this operation.PLZ Contact with Main Admin"})
            console.log(req.user)
        }
    }
}