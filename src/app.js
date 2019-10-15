// path is nodejs core module to handle path related manipulation
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname, '../public'))

// express library expose only express method
const app = express()

// define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

// registriing partials // partials inside this dir can be used in any temp by syntax {{>header}}
hbs.registerPartials(partialPath)

// setup handlebars engine and view path
// to use hbs // for hbs views directory is needed in folder
app.set('view engine', 'hbs')
// setting view to render from different path then default view path
app.set('views', viewPath)

// setup static dir serving ..  our server will serve public directory
app.use(express.static(publicDirPath))

// using render we render views of handlebars
// given object val is accessible to index views
app.get('', (req, res) => {
    res.render('index', { title: 'Weather', name: 'mrinal' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', name: 'mrinal' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', name: 'mrinal', helptext: 'this is helptext' })
})

// weather json route
app.get('/weather', (req, res) => {
    // checking if url has querystring..
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    console.log(req.query.address)
    // by  = {} after destructring means we are assingning default value to it.
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        //console.log(resp);
        if (error) {
            return res.send({ error }) // by this it will send error property with value came in error
        }

        forecast(latitude, longitude, (error, forcastData) => {

            if (error) {
                return res.send({ error }) // by this it will send error property with value came in error
            }

            res.send({
                forcast: forcastData.summary, location: forcastData.precipProbability, address: req.query.address
            })

        })


    })



})

app.get('/products', (req, res) => {

    // checking if url has querystring..
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


// 404 setup
app.get('/help/*', (req, res) => {
    res.render('404', { title: '404', errorMsg: 'Help article not found', name: 'mrinal' })
})
app.get('*', (req, res) => {
    res.render('404', { title: '404', errorMsg: 'Page not found', name: 'mrinal' })
})


// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'mrinal',
//             age: 29
//         },
//         {
//             name: 'dinesh',
//             age: 29
//         }
//     ]
//     ) // this string will be passed to caller when /help route open
// })


// app.get('/about', (req, res) => {
//     res.send('<h1>This is our about page</h1>') // this string will be passed to caller when /about route open
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         foecast: '50 degree',
//         location: 'delhi'
//     }) // this string will be passed to caller when /weather route open
// })


//start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

