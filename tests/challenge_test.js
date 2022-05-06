Feature('QA Engineer Technical Challenge');

/** 
 * You are requested to automate the following test case “Validate A Class models price are between
£15,000 and £60,000" as described below:

• Open Mercedes-benz United Kingdom market
• Under “Our Models” - Select “Model: Hatchbacks”;
• Mouse over the “A Class” model available and proceed to “Build your car”
• Filter by Fuel type “Diesel”
• Take and save a screenshot of the results
• Save the value “£” of the highest and lowest price results in a text file
*/

Scenario("Validate A Class models price are between £15,000 and £60,000", async ({ I, mainPage, pageOurModels, pageCarConfigurator }) => {
  let minValue = 15000
  let maxValue = 60000
  let idTest = I.getRandomInt(1, 60000)


  I.amOnPage("https://www.mercedes-benz.co.uk/");
  await mainPage.acceptCookies()
  await mainPage.openOurCarsMenu()
  await mainPage.selectModel(car.model)
  await pageOurModels.assertHasCar(car)
  await pageOurModels.openOptionBuildYourCar(car)
  await pageCarConfigurator.selectFuelType(car)
  //time to screenshot, the screenshot is saved inside the output folder with the name of file mercedes-benz-cars-car-configurator.png
  I.saveScreenshot(`mercedes-benz-cars-car-configurator_${idTest}.png`, true)
  //create array with cars presented on screen as save into the cars[]
  let cars = await pageCarConfigurator.createArrayCars()
  console.log(cars)
  //Define the path and the name of the file
  let path = `output/cars_${idTest}.txt`
  //the function is inside the steps_file.js
  I.createFile(path, await pageCarConfigurator.theCheapestAndtheMostExpensive(cars))
  //Assert for the value of cars
  await pageCarConfigurator.assertionValueCars(minValue, maxValue, cars)

});

var car = {
  model: 'sportstourer', //Hatchbacks
  name: 'A-Class',
  classId: 'dh-io-vmos_1PW4e',
  fuelType: 'Diesel'
}