const fetch = require('node-fetch')

const geoCode = async (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWhtZWRsYWtoYW5pIiwiYSI6ImNrdTRtMG40NjF3b28zMXBndmc2dG52czQifQ.qtmVr_G5NVzR53QemCePlg&limit=1'
    
    const response = await fetch(url)
    const body = await response.json()
    if (body.message) {
        callback('Unable to connect', undefined)
    } else {
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
    // fetch(url).then((response) => {
    //     response.json().then((body) => {
    //         if (body.message) {
    //             callback('Unable to connect', undefined)
    //         } else {
    //             callback(undefined, {
    //                 latitude: body.features[0].center[1],
    //                 longitude: body.features[0].center[0],
    //                 location: body.features[0].place_name
    //             })
    //         }
    //     })
    // })

    
}

module.exports = geoCode