const {nextISSTimesForMyLocation, printFlyBys } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((flybys) => {
    printFlyBys(flybys);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

