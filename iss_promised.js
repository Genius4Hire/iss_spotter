const request = require('request-promise-native');

const fetchMyIP = function() {
  return request(`https://api.ipify.org?format=json`);

}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};


const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const printFlyBys = function (flybys) {
  console.log("Here are the next fly-over times:");
  for (let flyby of flybys) {
    const date = new Date(0)
    date.setUTCSeconds(flyby.risetime);
    console.log(date, `for ${flyby.duration} seconds`)
  }
}


module.exports = { nextISSTimesForMyLocation, printFlyBys };