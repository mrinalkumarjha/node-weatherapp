const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXJpbmFsa3VtYXJqaGEiLCJhIjoiY2swbnE1ank1MDJsZjNub3liZjg2ZnN2ciJ9._QYqkMENtZv8D1LDTEmP4Q'


    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services..', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to find geo code', undefined)
        }
        else {
            const lat = response.body.features[0].center[1]
            const lng = response.body.features[0].center[0]
            callback(undefined, {
                latitude: lat,
                longitude: lng,
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode