const express=require("express")
const bodyparser=require("body-parser")
// const request=require("request")
//const https=require("https")
const client = require("@mailchimp/mailchimp_marketing");
const app =express()


app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("puplic"))
app.use(express.static('build'));

app.get("/",function (req, res){

res.sendFile(__dirname+"/signup.html");


})
app.get('*', function (req, res) {
  res.sendFile('signup.html');
});

app.post("/",function(req,res){
const first=req.body.first
const last=req.body.last
const email=req.body.email




client.setConfig({
    apiKey: "fd1e92c1661168a31ba3317f0da837b2-us1",
    server: "us1",
  });

  const run = async () => {
    const response = await client.lists.batchListMembers("c506b53dd4",           {
      members: [{
        email_address :email,
        status : "subscribed",
        merge_fields: {
               FNAME: first,
               LNAME: last
             }
      }],
    });

    if(response.error_count===0){

res.sendFile(__dirname+"/success.html")

}else{


  res.sendFile(__dirname+"/failure.html")

}
    console.log(response);

  };
  run();
})

app.post("/failure",function(req,res){

  res.redirect("/")
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

// Api key
// fd1e92c1661168a31ba3317f0da837b2-us1


// list id
// c506b53dd4

// {
//   "name": "node-js-getting-started",
//   "version": "0.3.0",
//   "description": "A sample Node.js app using Express 4",
//   "engines": {
//     "node": "14.x"
//   },
//   "main": "index.js",
//   "scripts": {
//     "start": "node index.js",
//     "test": "node test.js"
//   },
//   "dependencies": {
//     "ejs": "^3.1.5",
//     "express": "^4.15.2"
//   },
//   "devDependencies": {
//     "got": "^11.3.0",
//     "tape": "^4.7.0"
//   },
//   "repository": {
//     "type": "git",
//     "url": "https://github.com/heroku/node-js-getting-started"
//   },
//   "keywords": [
//     "node",
//     "heroku",
//     "express"
//   ],
//   "license": "MIT"
// }



// -d '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"visibility":"pub","double_optin":false,"marketing_permissions":false}'
