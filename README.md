# AQIMonit
The project provides a UI to monitor the Air Quality Index of Cities in India. (3 hrs Development & Developer Testing Time + 30min Documentation & Deployment Time)

- City Wise Live Air Quality Index Monitoring
- AQI Highlighted with different colors based on the level
- Live Chart of selected city, click on a city to select
- Upto 10 points in live chart
- Look at AQI data of different cities in a single table
- When AQI of a city goes from good to poor i.e., from <=200 to >200, an indicator is shown
- Displaying last updated time for each city as sec from now else clock time
- Live chart is displayed only when minimun of 2 data points are available

## Tech Stack
- Reactjs
- Websockets for connecting to ws aqi
- Momentjs for Time Display Formats
- Recharts for charts

##Components
1. AQI Table - 1 hr Development & Developer Testing Time
2. Live Chart - 1 hr Development & Developer Testing Time

UI Quality/TroubleShooting - 1 hr

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

Heroku BuildPack:
https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz
