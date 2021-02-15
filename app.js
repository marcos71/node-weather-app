require('dotenv').config();
const { getLocationLatLon } = require('./location/location');
const { getWeather } = require('./weather/weather');

const argv = require('yargs').options({
    location: {
        alias: 'l',
        demand: true
    }
}).argv;

/*
getLocationLatLon(argv.location)
    .then(res => {
        getWeather(res)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
*/


const getInfo = async (location) => {

    try {
        const locationInfo = await getLocationLatLon(location);
        const weatherInfo = await getWeather(locationInfo);
        return `The weather in ${locationInfo.name} is ${weatherInfo.main.temp} celcius`;
    } catch (e) {
        return `Could not retrieve the weather from ${location}`;
    }

}

getInfo(argv.location)
    .then(console.log)
    .catch(console.log);

