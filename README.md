# Handout questions

## Code organization

The project uses one main component (`App.jsx`) that contains information regarding the state as well as layout of the page.The state of the page is dependent on the following attributes:

- the cards currently displayed given the filters and sorting methods (a list of objects)
- the current filter for the winner attribute (a string)
- the current filter for the population attribute (a range, represented as an array)
- the current method of sorting (a string)
- the currently selected/aggregated states (a list of objects)

When filters are applied, the original data is sorted given the current method of sorting, and the current and new filters are applied.

In addition to the one main component, `StateCard.jsx`. This is a stateless component that represents the state of each card. Though it is stateless, it gets information about its status (such as whether it is selected or not) given the state in the main component. This maintains one source of truth, in the main component.

The React app was created using functional components and hooks (such as `useState()`). Styling was done with the `Material-UI` package.

## How data is passed between components

The State Cards in the grid are rendered by mapping on the current cards (a state). The items passed down are `item`, `selected`, and `setSelected`.

This list of current cards is a list of objects containing the attributes name, electoral, population, and result. This object is the `item` that StateCard uses to populate the card information.

Selected is the array of currently selected cards. StateCard uses this information to determine whether the state is selected or not, which determines properties such as background color, button text, and button action.

## How the user triggers state changes

The user triggers state changes through the buttons on the website. This includes the filter buttons, sort buttons, and include/remove buttons on each card.

If the user does not want to include/remove states from count on at a time, they can use the "Include states in count" and "Remove states from count" buttons to include/remove all of the displayed cards in the count. For example if a user wants to see all of the Biden votes, they can filter by states won by Biden, and then click Select All.

## Acknowledgements

Population data is given by the [Census population projection](https://www.census.gov/data/datasets/time-series/demo/popest/2010s-state-total.html#par_textimage_1873399417) for 2019.

State electoral counts and projected winners are given via the Associated Press.

The regex to convert a number into a comma-separated string was found via [Stack Overflow](https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript).

# Create React App (Boilerplate)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
