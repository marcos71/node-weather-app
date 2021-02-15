const axios = require('axios').default;

const getLocationLatLon = async (location) => {

    const encodedUrl = encodeURI(location);

    const instance = axios.create({
        baseURL: `http://api.weatherstack.com/current?access_key=35111b5e1e44665a274c59a5d6d66dea&query=${encodedUrl}`,
    });

    const resp = await instance.get();

    if (resp.data.error) {
        throw new Error(`Error geting ${location} location`, resp.data.error.info);
    }

    const respLocation = resp.data.location;
    const cityLocation = {
        name: respLocation.name,
        lat: respLocation.lat,
        lon: respLocation.lon
    };

    return cityLocation;

}

const getMapboxLocation = async (location) => {
    const encodedUrl = encodeURI(location);

    const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedUrl}.json`,
        params: {
            'access_token': process.env.MAPBOX_KEY,
            'limit':5
        }
    });
    return await instance.get();
}

module.exports = { getLocationLatLon, getMapboxLocation }