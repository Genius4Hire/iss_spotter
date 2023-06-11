const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

let ip = fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return error;
  }
  console.log("It worked! Returned IP:", ip);
}); 

ip = "66.183.123.7";

let latlong = fetchCoordsByIP(ip, (error, latlong) => {
  if (error) {
    console.log("It didn't work!", error);
    return error;
  }
  console.log("It worked! Returned lat/long:", latlong); 
});

latlong = { lat: 48.4284207, lon: -123.3656444 }

const flybys = fetchISSFlyOverTimes(latlong, (error, times) => {
  if (error) {
    console.log("It didn't work!", error);
    return error;
  }
  console.log("It worked! Returned these times:", times); 
})



