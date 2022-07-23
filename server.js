const express = require("express");
const axios = require('axios');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const { response } = require("express");



const server = express();




server.set('view engine', 'ejs');

server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static("public"));


//options for the data Axios

let cardName = "";

let options = {
    method: 'GET',
    url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/info',
    headers: {
      'X-RapidAPI-Key': '0faaee9b5cmshf8f2e13fa195384p175474jsnfd2c5d53273b',
      'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
    }
  };






server.get("/", (req,res) => {
    res.render("home");
})

server.get("/request-all" , (req,res)=> {
    axios.request(options).then(function (response) {
        res.send(response.data);
    }).catch(function (error) {
        console.error(error);
        res.redirect("/404");
    });


})

server.get("/singlecard", (req,res)=> {
    res.render("singlecard");
})


server.get("/by-class", (req,res) => {
    res.render("by-class");
})

server.get("/by-rarity", (req,res) => {
    res.render("by-rarity");
})


server.get("/cardsets", (req,res) => {
    res.render("cardsets");
})


server.get("/404", (req,res) => {
    res.render("404");
})


server.get("/about", (req,res) => {
    res.render("about");
})


server.get("/card" , (req,res) => {
    axios.request(options).then(function (response) {
        // res.send(response.data);
        console.log("Getting the response!");
        console.log("-------------------");
        console.log(response.data);
        res.render("card" , { cards : response.data})


    }).catch(function (error) {
        console.error(error);
        res.render("404");
    });

    // res.render("cards", { card : response.data})

 })


 server.get("/cardbacks", (req,res) => {
    options.url = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks';
    res.redirect("/card");
 })




//POST


server.post("/singlecard", (req,res) => {
    cardName = req.body.card;

    

    options.url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${cardName}`;

    // console.log(cardName);


    res.redirect("/card");
})


server.post("/by-class" , (req,res) => {

    // console.log(req.body.classText);

    const className = req.body.classText;

    options.url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${className}`;

    res.redirect("/card");
})


server.post("/by-rarity", (req,res) => {
    // console.log(req.body.rarityText);

    const rarity = req.body.rarityText;

    options.url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/qualities/${rarity}`

    res.redirect("/card");
})


server.post("/cardsets", (req,res) =>{

    const cardset = req.body.cardset;

    console.log(`the id is ${cardset}`);

    options.url = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/${cardset}`;

    res.redirect("/card");


})




const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`SERVER STARTED ON ${PORT}`));