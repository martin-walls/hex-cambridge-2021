const images = require("express").Router();
const request = require("request");

const neode = require("../../neo");

images.get("/", (req,res) => {
  let count = req.query.count;
  let apiKey = process.env.CAT_API_KEY;

  request(`https://api.thecatapi.com/v1/images/search?limit=${count}`, {json: true, headers: {"x-api-key": apiKey}}, (err, r, body) => {
    if (err) {res.send({success: false});}

    // body = [{
    //   "breeds": [],
    //   "categories": [
    //     {
    //       "id": 1,
    //       "name": "hats"
    //     }
    //   ],
    //   "id": "MTY1ODc5MA",
    //   "url": "https://cdn2.thecatapi.com/images/MTY1ODc5MA.png",
    //   "width": 638,
    //   "height": 431
    // }]

    let imgs = []

    for (let i = 0; i < count; i++) {
      imgs.push(body[i].url);

      console.log(body[i]);

      // save image data
      neode.create("Image", {
        url: body[i].url,
        breeds: body[i].breeds ? JSON.stringify(body[i].breeds) : "[]",
        categories: body[i].categories ? JSON.stringify(body[i].categories) : "[]"
      })
    }
    res.send({
      success: true,
      images: imgs
    })
  })
});

module.exports = images;