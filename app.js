const express = require("express");
const app = express() 
const request = require('request');


app.get('/', (req, res) => {
  if(!req.query.url) {
  	res.json({ msg: "Asan url mo bobo ka!" });
  } else {
  	const getVideoID = (url, cb) => {
  	    request({ url: url, followRedirect: false }, (err, res, body) => {
  	       let url = res.headers.location;
               let data = url.split("/")
               data.shift()
               data.shift()
               data.shift()
               data.shift()
               data.shift()
               let id = data[0].substring(0, 19);
               cb(id)
           });
        }
      getVideoID(req.query.url, (id) => {
          let url = `https://www.tikwm.com/video/media/hdplay/${id}.mp4`;
          res.json({ link: url });
      })
   }
})

app.listen(3000,() => console.log("Listening..."))
