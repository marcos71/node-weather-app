const axios = require('axios').default;

const getWeather = async (city) => {

    const instance = axios.create({
        baseURL: `http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`,
    });

    const resp = await instance.get();

    return resp.data;

}

module.exports = { getWeather }