const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation, printFlyBys} = require('./iss');

// let ip = fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return error;
//   }
//   console.log("It worked! Returned IP:", ip);
// }); 

// ip = "66.183.123.7";

// let latlong = fetchCoordsByIP(ip, (error, latlong) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return error;
//   }
//   console.log("It worked! Returned lat/long:", latlong); 
// });

// latlong = { lat: 48.4284207, lon: -123.3656444 }

// const flybys = fetchISSFlyOverTimes(latlong, (error, times) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return error;
//   }
//   console.log("It worked! Returned these times:", times); 
// })

// flybys = [
//   { risetime: 1686623961, duration: 132 },
//   { risetime: 1686660361, duration: 477 },
//   { risetime: 1686696761, duration: 552 },
//   { risetime: 1686733161, duration: 280 },
//   { risetime: 1686769561, duration: 295 }
// ];



nextISSTimesForMyLocation((error, flybys) => {
  if (error) {
    console.log("It didn't work!", error);
    return error;
  }
  printFlyBys(flybys);

});
