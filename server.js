const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/simpleUrlShortener', {
    useNewUrlParser: true,
useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

app.post('/shorten', async (req,res) => {
    await ShortUrl.create({original: req.body.original})
    console.log('Short URL Added !');
    
    res.redirect('/')
})

app.listen(process.env.PORT || 5000);