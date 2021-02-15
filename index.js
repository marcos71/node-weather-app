require('dotenv').config();
const { readInput, inquirerMenu, pause, listPlaces } = require('./helpers/inquirer');
const { Search } = require('./models/search');

const main = async () => {

    const search = new Search();
    
    let opt;

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // pick location
                const location = await readInput('City: ');
                
                // search location
                const places = await search.searchCity(location);
                
                // pick place
                const id = await listPlaces(places);
                const placeSelected = places.find( p => p.id === id);

                if (id === '0') continue;

                search.addHistory(placeSelected.name);

                // search weather
                const weather = await search.searchWeather(placeSelected);

                console.clear();

                console.log('\nCity Information\n'.green);
                console.log('City:', placeSelected.name);
                console.log('Lat:', placeSelected.lat);
                console.log('Long:', placeSelected.lon);
                console.log('Temperature:', weather.temp);
                console.log('Max:', weather.max);
                console.log('Min:', weather.min);
                console.log('Description:', weather.desc);

                break;

            case 2:
                search.toUpperCase.forEach( (location, i) => {
                    let idx = `${i + 1}.`.green;
                    console.log(`${idx} ${location}`);
                });

                break;
        }

        if (opt !== 0) {
            await pause();
        }

    } while (opt !== 0)

};

main();