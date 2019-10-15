const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/75448adc6ec9184fcf618d82b4453ca5/' + lat + ',' + long

    request({ uri: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to weather service.', undefined)
        }
        else if (response.body.error) {
            callback('unable to find location..', undefined)
        }
        else {
            callback(undefined, {
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary
            })
        }

    })

}

module.exports = forecast