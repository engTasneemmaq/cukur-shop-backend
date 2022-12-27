"use strict";

module.exports =(action)=>{
    // console.log(capability);
    return(req,res,next)=>{
    try{
        // console.log("jjjjjjjjj", cab);

        if(req.user.actions.includes(action)){
                // console.log("hhhhhh");
            next();
        }
        else{
            res.status(403).send({
                code: 403,
                route: req.path,
                message: "Access Denied method is not allowed",}
            )}
        }
    catch(e){
        next("Invalid Signin")
    }
    }

}