const request = require('request')

const geoCode = (address, callback) =>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW5hcjIwMThnIiwiYSI6ImNqdTJyMzVocjBlMXc0M25ydDU4bXlxaDEifQ._Ex-iPqvSRs43yutOyNAxA&limit=1`
    request({url, json: true}, (error, response)=>{
        if(error){
            callback('unable to connect to the location services', undefined)
        } else if (response.body.features.length === 0){
            callback('unable to fing location, try another search', undefined)
        }else{
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode