# Teams app
This app demonstrates state manipulation and API usage to render teams and their respective members for users to browse / filter.
It was generated by using `create-react-app`, which comes prepacked with webpack and server tools, thus allowing to focus solely on the frontend development.

## Setup

To run the app on your localhost.

`npm i`

`npm start`

To test the app.

`npm test`

## UI Library
[material-ui](https://material-ui.com/)

## How the app works
The component structure will look like this:
```
<App />
  <HomePage />
    <Team />
      <User />
```

- The flow of the application will start in `<App />` which simply renders the `<HomePage />` component.
- `<HomePage />` component's job is to fetch the basic teams data from the `/teams` API, following a successful `axios promise` return, the data is rendered into *material-ui* `Accordions` with the team names displayed.
- `<HomePage />` allows to filter teams by typing in a team name (substrings allowed to match); achieved through controlled input component.
- When a user opens an `Accordion`, the `<Team />` component is rendered.
- `<Team />` component fetches details for its respective team ID, that is passed into `props`, from the `/teams/<id>` API. Response data is used to merge team lead and team member IDs, which are then used to fetch each user's details from `/users/<id>` API. Finally, it renders a table with a list of `<User />` components, passing `user` object (with details) in `props`.
- `<Team />` allows to filter users by typing in any substring of any user object fields (i.e. can filter by first name, display name, location etc.); achieved through controlled input component.
- `<User />` component builds table row from `user` object passed in `props`.

## Tests
- Using `jest` and `react-testing-library` to render and check for presence of relevant components.
- Mocking `axios` and resolving with test data (in `src/tests/__mocks__/axios.js`).
- Mocking children components for simpler parent component tests.

## Areas of improvement
- Console will throw `Warning: findDOMNode is deprecated in StrictMode.` when *material-ui* `Accordion` is open... ideally this would be fixed
- Can always do with more tests :)
  - should test filter input
  - should test user click events on accordions
- UI quality could be improved
