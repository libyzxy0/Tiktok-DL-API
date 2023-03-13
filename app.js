//Note : this type of url 'https://vt.tiktok.com/ZS8P3wFXX' only works, we fix it soon!

const express = require("express");
const app = express() 
const request = require('request');


app.get('/', (req, res) => {
  const url = req.query.url;
  if(!url) {
  	res.json({ msg: "please enter a valid url!" });
  } else {
  	const getVideoID = (link, cb) => {
  	    request({ url: link, followRedirect: false }, (err, res, body) => {
  	       let url = res.headers.location;
               let data = url.split("/")
               data.shift()
               data.shift()
               data.shift()
               data.shift()
               data.shift()
               cb(data[0].substring(0, 19))
           });
        }
        if (!url.startsWith('https://vt.tiktok.com/')) {
        	res.json({ msg: "please enter a valid url!" });
        } else {
        	getVideoID(url, (id) => {
               let link = `https://www.tikwm.com/video/media/hdplay/${id}.mp4`;
               res.json({ link: url });
            })
        }
   }
})

app.listen(3000, () => console.log("Listening..."))
