"use strict()";

var Redmine = require("axios-redmine");

///////////////////////////////////////////////////////////////
var hostname = "http://127.0.0.1/redmine";
var config = {
    apiKey: "dc15fe3c8c18d8a8599276d846482ee8ce841263",
    format: "json",
};

var redmine = new Redmine(hostname, config);

// var user = {
//     user: {
//         login: "aquib",
//         firstname: "Aquib",
//         lastname: "Ahmed",
//         mail: "aquib@valuebound.com",
//         password: "password",
//         status: "3",
//     },
// };

const createUser = async(users) => {
    const userDetails = { user: users };
    const data = await redmine.create_user(userDetails);
    return data;
};

const listUsers = (users) => {
    const userDetails = { user: users };
    redmine.users(userDetails, function(err, data) {
        if (err) {
            console.log(err.message);
        }
        console.log(data);
    });
    return "Users listed successfully!";
};

const blockUser = (users) => {
    const userDetails = { user: users };
    // console.log(userDetails);
    redmine.update_user(
        userDetails.user.rm_id,
        userDetails,
        function(err, data) {
            if (err) {
                console.log(err.message);
            }
            console.log(data.message);
        }
    );
    return "User Blocked!";
};

module.exports = { createUser, listUsers, blockUser };