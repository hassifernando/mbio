# About this project

Code challenge to test this scenario

You are requested to automate the following test case “Validate A Class models price are between
£15,000 and £60,000" as described below:

 - Open Mercedes-benz United Kingdom market
 - Under “Our Models” - Select “Model: Hatchbacks”;
 - Mouse over the “A Class” model available and proceed to “Build your car”
 - Filter by Fuel type “Diesel”
 - Take and save a screenshot of the results
 - Save the value “£” of the highest and lowest price results in a text file

Tools used

* [CodeceptsJs](https://codecept.io/)
* [NodeJs](https://nodejs.org/en/)

## Requirements

- Install NodeJs
- This repository
- An internet connection (to download dependencies)

## Dependencies

Tools needed to run this app:

- `node` and `npm`

## Installing

* `clone` this repo
* `npm install` to install dependencies

## File Structure

```
mbio
⋅⋅nodemodules/
⋅⋅output/ 
.mainPage.js
.pageCarConfigurator.js
.pageOurModels.js
.challenge_test.js

package.json (scripts and dependencies)
steps_file.js (common and most used functions)
```

## Running tests

* `npm run codeceptjs`
