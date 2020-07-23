exports.notFound = (req,res,next)=>{
    var error = new Error("Not found")
    error.status = 404;
    next(error);
}

exports.Internal = (error,req,res,next)=>{
    error.status = (error.status || 500 );
    res
    .status(error.status)
    .json({
        code:"USR_02",
        message:error.message ,
        field: "example",
        status: error.status
      })
}