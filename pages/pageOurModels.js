'use strict';

let I = require('../steps_file')();


//locator
const BUILDYOURCAR = `shadow=wb-icon[name='car-config']`


module.exports = function () {
    return actor({

        /**assert to validate that has a car with the name specified in a object inside the test */
        assertHasCar(car) {
            I.retry({ retries: 20, minTimeout: 1 }).see(car.name, 'shadow=span')
            I.retry({ retries: 20, minTimeout: 1 }).seeElement(`shadow=div.wb-grid-row span.${car.classId}`)
        },
        /**the function will mouse over on the classId for the car defined in object and after the option Build Your Car appear realize a click*/
        openOptionBuildYourCar(car) {
            I.moveCursorTo(`shadow=span.${car.classId}`)
            I.seeElement(BUILDYOURCAR)
            I.click(BUILDYOURCAR)
        }
    })
}
