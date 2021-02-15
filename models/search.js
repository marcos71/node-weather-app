const fs = require('fs');
const { getMapboxLocation } = require('../location/location');
const { getWeather } = require('../weather/weather');

class Search {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.loadHistory();
    }

    get toUpperCase() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map( l => l[0].toUpperCase() + l.substring(1));

            return words.join(' ');
        })
    }

    async searchCity(place = '') {
        try {
            const resp = await getMapboxLocation(place);
            
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lon: place.center[0],
                lat: place.center[1]
            }));
            
        } catch (error) {
            return [];
        }
    }

    async searchWeather(location) {
        try {          
            const resp = await getWeather(location);
                     
            return {
                desc: resp.weather[0].description,
                temp: resp.main.temp,
                max: resp.main.temp_max,
                min: resp.main.temp_min
            };                          
        } catch (error) {
            console.log("ERROR", error);
        }
    }

    addHistory(location) {
        if (this.history.includes(location.toLowerCase())) {
            return;
        }
        this.history = this.history.splice(0,5);
        
        this.history.unshift(location.toLowerCase());

        this.saveHistory();
    }

    saveHistory() {
        const payload = {
            records: this.history
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    loadHistory() {
        if (!fs.existsSync(this.dbPath)) return;

        let db = JSON.parse(fs.readFileSync(this.dbPath, {encoding: 'utf-8'}));
        this.history = db.records;
    }

}

module.exports = { Search }