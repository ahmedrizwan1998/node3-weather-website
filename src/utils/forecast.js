const fetch = require('node-fetch')

const foreCast = async (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=691bd73bd07af245c10c74b4ac769c0a&units=kelvin'
    

    const response = await fetch(url)

    const body = await response.json()

    if (body.message) {   
        callback('Unable to connect', undefined)
    } else {
            callback(undefined, 'FORECAST: It is currently ' + body.main.temp + ' And ' + body.clouds.all + ' % chances of raining ')
    }
}

module.exports = foreCast