'use strict';

let I = require('../steps_file')();




//locator
const FUELFILTER = `shadow=fieldset[data-primary-filter-id='technicalInformation.engine.fuelType']`
const FUELTYPEOPTION_DIESEL = `shadow=fieldset[data-primary-filter-id='technicalInformation.engine.fuelType'] > wb-multi-select-control > div > wb-checkbox-control:nth-child(1) > label > input`
const FUELTYPEOPTION_HYBRIDPREMIUM = `shadow=fieldset[data-primary-filter-id='technicalInformation.engine.fuelType'] > wb-multi-select-control > div > wb-checkbox-control:nth-child(2) > label > input`
const FUELTYPEOPTION_PREMIUM = `shadow=fieldset[data-primary-filter-id='technicalInformation.engine.fuelType'] > wb-multi-select-control > div > wb-checkbox-control:nth-child(3) > label > input`
const FUELTYPEOPTION_SUPER = `shadow=fieldset[data-primary-filter-id='technicalInformation.engine.fuelType'] > wb-multi-select-control > div > wb-checkbox-control:nth-child(4) > label > input`


module.exports = function () {
    return actor({
        /**function to get the name of a car on the specified position*/
        async getCarName(i) {
            //css selector to name of the car
            let carName = await I.grabTextFrom(`shadow=cc-motorization-comparison > div.cc-motorization-comparison > div.cc-motorization-comparison-wrapper > div:nth-child(${i}) div.cc-motorization-header__vehicle-name`);
            return carName;
        },
        /**function to get the price of a car on the specified position */
        async getCarPrice(i) {
            //css selector to get a price, after this I replace the value to remove other character and return just a numbers
            let carPrice = await I.grabTextFrom(`shadow=cc-motorization-comparison > div.cc-motorization-comparison > div.cc-motorization-comparison-wrapper > div:nth-child(${i}) span.cc-motorization-header__price`);
            carPrice = carPrice.replace(` £`, '');
            carPrice = carPrice.replace(` `, ``)
            carPrice = carPrice.replace(`,`, ``)
            return carPrice;
        },
        /**function to get a number of div of cars presented, the function will return the number o cars visible on the screen */
        async getNumberOfCarPresented() {
            let numOfCars = await I.grabNumberOfVisibleElements(`shadow=div.cc-motorization-comparison-wrapper > div.ng-star-inserted > div.cc-motorization-comparison-card`)
            return numOfCars
        },
        /**function to create array of cars with the name and price for the cars presented on screen */
        async createArrayCars() {

            let cars = new Array();
            for (let i = 1; i <= await this.getNumberOfCarPresented(); i++) {
                //name/model of car
                let carName = await this.getCarName(i);
                //price
                let priceCar = await this.getCarPrice(i);
                //push
                cars.push({ name: carName, price: priceCar })
            }
            return cars;
        },
        /**the function will order the array of cars to the cheapeest to most expensive and will return the first index and the last index */
        theCheapestAndtheMostExpensive(cars) {
            //SORT 
            console.log(`------------------------------------------------------------------------------------------------------`);
            cars.sort(function (a, b) {
                if (a.price < b.price) {
                    return -1;
                } else {
                    return true;
                }
            });
            let selectedCars = `Lowest price: ${cars[0].price} \nHighest price : ${cars[cars.length - 1].price}`
            return selectedCars
        },
        /**function to filter a fuel type inside the page to confiration of the car */
        selectFuelType(car) {
            /**I will scroll to the positon on the page that I will manipulate elements */
            I.wait(0.5)
            I.retry({ retries: 20, minTimeout: 1 }).scrollTo(FUELFILTER)
            I.wait(0.5)
            //open the fuel filter with a click
            I.retry({ retries: 20, minTimeout: 1 }).click(FUELFILTER)
            I.wait(0.5)
            //Chose the option with the parameter defined with the object at the botton of a test file
            switch (car.fuelType) {
                case 'Diesel':
                    I.forceClick(FUELTYPEOPTION_DIESEL)
                    break;
                case 'Hybrid (Premium)':
                    I.forceClick(FUELTYPEOPTION_HYBRIDPREMIUM)
                    break;
                case 'Premium':
                    I.forceClick(FUELTYPEOPTION_PREMIUM)
                    break;
                case 'Super':
                    I.forceClick(FUELTYPEOPTION_SUPER)
                    break;
                default:
                    console.log(`Sorry, we are out of ${car.fuelType}.`);
            }
        },
        /**Assert a value of the cars is correct using a parameters defined on the top of the scenario if all the value is inside the exptected values
         * not is present none error but if has one value not within the expected values, is presented a message of error with the position in array
         * the name of car and the price
        */
        assertionValueCars(minValue, maxValue, cars) {
            for (let i = 0; i < cars.length; i++) {

                if (cars[i].price >= minValue && cars[i].price <= maxValue) {
                    console.log(`[${i}] The value £ ${cars[i].price} of ${cars[i].name} is between the expected values`)
                }
                else {
                    throw new Error(`[${i}] The value £ ${cars[i].price} of ${cars[i].name} is not within the expected values (min: ${minValue} / max: ${maxValue})`)
                }
            }

        }
    })
}