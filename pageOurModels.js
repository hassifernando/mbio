'use strict';

let I = require('./steps_file')();


//locator
const BUILDYOURCAR = `shadow=wb-icon[name='car-config']`


module.exports = function () {
    return actor({

        /**assert to validate that has a car with the name specified in a object inside the test */
        assertHasCar(car) {
            I.see(car.name, 'shadow=span')
            I.seeElement(`shadow=div.wb-grid-row span.${car.classId}`)
        },
        openOptionBuildYourCar(car) {
            I.moveCursorTo(`shadow=span.${car.classId}`)
            I.seeElement(BUILDYOURCAR)
            I.click(BUILDYOURCAR)
        }
    })
}