// var siteConfig = require("./gm-site-config.js").siteConfig;
// var HaAnh = require("./haanh/haanh.js").HaAnh;

// let haAnh = HaAnh.createHaAnh(siteConfig);
//
// haAnh.runAll({
//     host: "http://localhost:8080",
//     // host: "https://latest.staging.groupmatics.co/manage",
//     accounts: [
//         { email: "josh@prototype1.io", password: "77Test77", roles: ["admin"] }
//     ],
// })
//     .then((report) => {
//         console.log("All tests are run");
//     })
// ;

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// rl.question('What do you think of Node.js? ', (answer) => {
//     // TODO: Log the answer in a database
//     console.log(`Thank you for your valuable feedback: ${answer}`);
//
//     rl.close();
//     // console.log("Closed");
// });