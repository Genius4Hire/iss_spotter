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

module.exports = { fetchMyIP, fetchCoordsByIP };