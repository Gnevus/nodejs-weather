/*
Приложение которое показывает погоду по городу ульяновску
@airoo
*/

const express = require('express')
const rp = require('request-promise')
const exphbs = require('express-handlebars')

const app = express()
var path = require("path");
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/city', (req, res) => {
    rp({
        uri: 'http://apidev.accuweather.com/currentconditions/v1/296217',
        qs: {
            language: 'ru',
            apiKey: 'hoArfRosT1215'
                // Используйте ваш ключ для accuweather API
        },
        json: true
    })
    .then((data) => {
        //console.log(data[0]['Temperature']['Metric']['Value'])
        res.render('index', {
          data: data,
          WeatherText: data[0]['WeatherText'],
          temperature: data[0]['Temperature']['Metric']['Value']
        })
    })
    .catch((err) => {
        console.log(err)
        res.render('error')
    })
})

app.listen(3000)
