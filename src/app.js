const path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const foreCast = require('./utils/forecast.js')

const app = express()

//define paths for express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')      //if views named folder not created eg: templates
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hbs engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath) //if view folder not created set express to views
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicPathDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ahmed Lakhani'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'ABOUT ME',
        name: 'Ahmed Lakhani'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'HELP',
        message: 'How may I help you',
        name: 'Ahmed Lakhani'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        foreCast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'raining',
    //     location: 'Pakistan',
    //     address: req.query.address
    // })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'ERROR 404',
        name: 'Ahmed Lakhani',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, ()=> {
    console.log('listening at port 3000')
})