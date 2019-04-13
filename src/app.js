const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geocode.js')
const port = process.env.PORT || 3000
const forecast = require('./utils/forecast.js')
console.log(path.join(__dirname, '../public/index.html'))

// define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPaths = path.join(__dirname, '../templates/partials/')


// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

// setup static directory to serve
app.use(express.static(publicDirectory))



app.get('', (req, res)=>{ //app.get = get url and....    '' means root domain, req = request, res = response to user
res.render('index', {
    title : 'Weather',
    name : 'Anar'
}) // send html format back to user
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title : 'About Us',
        bodytext : 'Created By Big Poppa'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title : 'Help Section',
        bodytext : 'Created By Big Poppa Pump'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address Must Be Provided'
        })
    }
        geoCode(req.query.address, (error, {lat, lon, location} = {})=>{
            if(error){
                return res.send({error})
            }
            forecast(lat, lon, (error, forecastData)=>{
                if(error){
                    return console.log({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
      
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You Must Provide A Search Term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Page Not Found Muhahah'
    })
})

app.listen(port, ()=>{//startup the server on port 3000 
    console.log('server is up on port ' + port)
})    