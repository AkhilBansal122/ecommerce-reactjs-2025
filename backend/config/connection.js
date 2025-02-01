const mongoose = require('mongoose');
const config = require("../config/config");
const { insertUsers } = require('../seeder/UserSeeder');
const { insertRoles, updateRoles } = require('../seeder/RoleSchema');
const { insertPermissions, updatePermissions } = require('../seeder/PermissionSchema');
const {insertEmailTemplate} = require("../seeder/EmailTemplateSchema");
const { insertCountry } = require('../seeder/CountriesSeeder');

const port = process.env.PORT || config.server.PORT;
const host = process.env.HOST || config.server.host;
const dbUrl = process.env.DBURL || config.database.url;

module.exports = {
    connection: async () => {
        try {
            // Connect to MongoDB
            await mongoose.connect(dbUrl);

            // Ensure the connection is successful
            if (mongoose.connection.readyState === 1) {
                console.log("Connected to MongoDB successfully");

                // Ensure roles, permissions, and users are inserted only if not already present

                // Check if permissions exist
                const existingPermissions = await mongoose.model('Permission').find();
                const countries = await mongoose.model('Countries').find();
                if(countries.length == 0){
                    const response = await insertCountry(); // Insert country if none exist

                }
                if (existingPermissions.length === 0) {
                    const response = await insertPermissions(); // Insert permissions if none exist

                    // Check if roles exist
                    if (response == true) {
                     
                        await  insertEmailTemplate();
                     
                      const existingRoles = await mongoose.model('Role').find();
                        if (existingRoles.length === 0) {
                            const roleResponse = await insertRoles(); // Insert roles if none exist
                            if (roleResponse == true) {
                                // Check if users exist
                                const existingUsers = await mongoose.model('User').find();
                                if (existingUsers.length === 0) {
                                    await insertUsers(); // Insert users if none exist
                                    console.log('Users inserted');
                                } else {
                                    console.log('Users already exist');
                                }
                            }
                            console.log('Roles inserted');
                        } else {
                            console.log('Roles already exist');
                        }
                    } else {
                        console.log('Permissions already exist');
                    }
                }
               /* else {
                    updatePermissions();
                    const existingRoles = await mongoose.model('Role').find();
                    if (existingRoles.length > 0) {
                        updateRoles();
                    }
                }
                */
            } else {
                console.log("Failed to connect to MongoDB");
            }
        } catch (err) {
            console.error('Error while connecting to MongoDB:', err);
        }
    }
};

// Start the connection
module.exports.connection();
