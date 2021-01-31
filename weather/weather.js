const axios = require('axios').default;

const getWeather = async (city) => {

    const instance = axios.create({
        baseURL: `http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=0d7d7ae1b447072c88f184383418953f&units=metric`,
    });

    const resp = await instance.get();

    return resp.data.main.temp;

}

module.exports = { getWeather }