# Github page of the code task

You will find all the commit history here: https://github.com/franciszh/datatable-ts


# Getting Started with the code task

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

Launches the test runner in the interactive watch mode.\

## Tech stacks
- create-react-app to bootstrap
- Redux toolkits and RTK query to eliminate the boilerplates like fetch and redux
- Typescript, Jest, React testing library, MUI(datagrid and tab)
- Cursor AI to create the drafts for all the tests

## Design highlights
- The data table and tab are situated in the components directory. The data table accepts the columns config, onRowClickHanlder and data to render via props whereas the tab component allows the tabs name, order and content to be customised outside of the tab component.
- The redux store contains two slices, one is the data fetched through the Item API while another one is the GUID of the selected Item. No component level state exists in this particular code task.


## Side Notes
The Java endpoint is hardcoded on the endpoints.ts file in the constants directory, feel free to change it if the Java service is hosted on the ports other than 8080