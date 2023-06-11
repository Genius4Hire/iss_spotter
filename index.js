const {fetchMyIP, fetchCoordsByIP} = require('./iss');


const ip = fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return error;
  }
  console.log("It worked! Returned IP:", ip);
}); 


const latlong = fetchCoordsByIP("66.183.123.7", (error, latlong) => {
  if (error) {
    console.log("It didn't work!", error);
    return error;
  }
  console.log("It worked! Returned lat/long:", latlong); 
});




