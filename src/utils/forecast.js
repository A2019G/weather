const request = require('request')

const forecast = (lat, lon, callback)=>{
    const url = `https://api.darksky.net/forecast/f9fb1e934bd668e5edb17af393342a84/${lat},${lon}?units=si`
    request({url, json: true}, (error, response)=>{
        if(error){
            callback('no connection', undefined)
        } else if(response.body.error){
            callback('wrong cords', undefined)
        } else{
            callback(undefined, ` ${response.body.daily.data[0].summary} The temperature now is ${response.body.currently.temperature} and raining chances are ${response.body.currently.precipProbability} % and the wind speed is ${response.body.currently.windSpeed} meters per second` )

        }
    })
}

module.exports = forecast