const { Country, State,City } = require('country-state-city');
const CountryModel = require('../Schema/CountriesSchema'); // Your Mongoose country model
const StateModel = require('../Schema/StateSchema'); // Your Mongoose state modelt
const CityModel = require("../Schema/CitySchema");
module.exports = {
    insertCountry: async () => {
        try {
            // Fetch all countries from the country-state-city-js package
            const allCountries = Country.getAllCountries();
            // Loop through each country and insert it into MongoDB
            await Promise.all(allCountries.map(async (country) => {

                // Check if the country already exists
                const existingCountry = await CountryModel.findOne({ dial_code: country.phonecode });
                // console.log("existingCountry-->",existingCountry);
                // return;
                if (!existingCountry) {
                    // Insert the country if it doesn't exist
                    const newCountry = new CountryModel({
                        name: country.name,
                        code: country.isoCode,
                        dial_code: country.phonecode,
                        currency: country.currency,
                        flag: country.flag,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });

                    await newCountry.save();
                    console.log(`Inserted country: ${country.name}`);
                } else {
                    console.log(`Country already exists: ${country.name}`);
                }
                // Fetch states for this country
                const existingCountrys = await CountryModel.findOne({ dial_code: country.phonecode });

                const allStates = State.getStatesOfCountry(existingCountrys.code);
                // Loop through each state and insert it into MongoDB
                await Promise.all(allStates.map(async (state) => {
                    // Check if the state already exists
                    const existingState = await StateModel.findOne({ code: state.isoCode, country_id: existingCountrys._id });

                    if (!existingState) {
                        // Insert the state if it doesn't exist
                        const newState = new StateModel({
                            name: state.name,
                            code: state.isoCode,
                            country_id: existingCountrys._id,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });

                        const statesInsert = await newState.save();
                        if (statesInsert) {
                            //Cityy Insert
                            const getAllCities =City.getCitiesOfState(existingCountrys.code, statesInsert.code);
                            // Loop through each city in the input
                            await Promise.all(getAllCities.map(async (cityData) => {
                                // Attempt to find an existing city by name and state code
                                let city = await CityModel.findOne({ name: cityData.name, state_id:statesInsert._id,country_id:statesInsert.country_id });

                                if (city) {
                                    // Update the existing city
                                    city.name = cityData.name;
                                    city.state_id =statesInsert._id,
                                    city.country_id=statesInsert.country_id,
                                    city.updatedAt = new Date();
                                    await city.save();
                                    console.log(`Updated city: ${cityData.name}`);
                                } else {
                                    // Create a new city if it doesn't exist
                                    city = new CityModel({
                                        name: cityData.name,
                                        state_id :statesInsert._id,
                                        country_id:statesInsert.country_id,
                                        createdAt: new Date(),
                                        updatedAt: new Date(),
                                    });
                                    await city.save();
                                    console.log(`Created city: ${cityData.name}`);
                                }
                            }));
                        }
                        console.log(`Inserted state: ${state.name} in ${country.name}`);
                    } else {
                        console.log(`State already exists: ${state.name} in ${country.name}`);
                    }
                }));
            }));

            console.log('Countries and states inserted successfully.');

        } catch (error) {
            console.error('Error inserting countries and states:', error);
        }
    }
};
