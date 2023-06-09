const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// https://api.ipify.org?format=json

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const URL = `https://api.ipify.org?format=json`;
  request(URL, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP.  Response${body}`), null);
      return;
    }
    try {
      callback(null,JSON.parse(body).ip);
    } catch (error) {
      console.log(Error(`Malformed JSON!`));
    }

  });
};

const fetchCoordsByIP = function(ip, callback) {
  const URL = `http://ipwho.is/${ip}`;
  request(URL, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching location.  Response${body}`), null);
      return;
    }
    const result = JSON.parse(body);
    if (!result.success) {
      callback(`Could not resolve lat/log with IP:"${ip}"`, null);
      return;
    }
    const loc = {
      lat: result.latitude,
      lon: result.longitude
    };
    callback(null, loc);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${coords.lat}&lon=${coords.lon}`;
  request(URL, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching fly-by times.  Response: ${body}`), null);
      return;
    }
    const result = JSON.parse(body);
    callback(null, result.response);

  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(loc, (error, passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, passes);
      });
    });
  });

}

const printFlyBys = function (flybys) {
  console.log("Here are the next fly-over times:");
  for (let flyby of flybys) {
    const date = new Date(0)
    date.setUTCSeconds(flyby.risetime);
    console.log(date, `for ${flyby.duration} seconds`)
  }
}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation, printFlyBys };