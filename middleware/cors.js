module.exports.cors_authentication= ((req,res,next)=>{ 
    // adding header to the response, this will not send the response it will only adjust so that where ever i do send a response it has these header
    // so with response header i add a new header and then the first header i need to set as "Acccess-control-Allow-origin" and this header also need a
    // value and the value can be start to give access to any origin. If you set to '*', meaning all client has access or you can restrict it e.g 
    // But sice we are working with Restful API and we want to give access to every client because API'S are 
    // meant to consume client/server reuests and responses
       console.log("Entry Point");
       res.header("Access-Control-Allow-Origin", "*");   
       // This header will define that which kind of headers we want to accept, so which headers may be sent along with the request. You can either set to
       // '*' to allow anything or you can also set to as origin,accept etc so that all these headers can be appended to incoming request:
       res.header("Access-Control-Allow-Headers", 
       "Origin, X-Requested-With, Content-Type, Accept, Cache-Control"); 
       //we will also check , if the incoming request method (method is a property which gives us access to Http methods used on the request), browser always
       // first send an options request when you send post or get request etc where the browser sees either you can/can't make this request or if he is allowed to
       // send this request
       // options is just to find out which options we have available
       if ( 'OPTIONS' === req.method)
       {
           //In this header , i(server) tell the browser what he may send or which methods are allow or all those methods you want to support with your API
           res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
       }
         next(); // calling it so that other routes/route takes place
    })