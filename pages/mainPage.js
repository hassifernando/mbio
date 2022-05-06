'use strict';

let I = require('../steps_file')();


//locator

const ACCEPTALLBUTTON = 'shadow=button.wb-button--accept-all'
const MENU_OURCARS = `shadow=p.owc-header-navigation-topic__label`


module.exports = function () {
    return actor({
        /**command to accept cookien on the main page */
        acceptCookies() {
            I.wait(3)
            I.retry({ retries: 20, minTimeout: 1 }).forceClick(ACCEPTALLBUTTON)
        },
        /**action command to open a menu to choose the model */
        openOurCarsMenu() {
            I.wait(0.5)
            I.click(MENU_OURCARS)
        },
        /**action command to choose a model */
        selectModel(model) {
            I.wait(0.5)
            I.seeElement(`shadow=wb-icon[name='${model}']`)
            I.click(`shadow =wb-icon[name='${model}']`)
        }

    })
}