# Teams app
This app demonstrates state manipulation and API usage to render teams and their respective members for users to browse / filter.
It was generated by using `create-react-app`, which comes prepacked with webpack and server tools, thus allowing to focus solely on the frontend development.

## UI Library
[material-ui](https://material-ui.com/)

## How the app works
The component structure will look like this:
`<App />`
  `<HomePage />`
    `<Team />`
      `<User />`
- The flow of the application will start in `<App />` which simply renders the `<HomePage />` component.
- `<HomePage />` component's job is to fetch the basic teams data from the `/teams` API, following a successful `axios promise` return, the data is rendered into *material-ui* `Accordions` with the team names displayed.
- `<HomePage />` allows users to filter teams by typing in a team name (substrings allowed to match)
- When a user opens an `Accordion`, the `<Team />` component is rendered.
- `<Team />` component fetches details for its respective team ID, that is passed into `props`, from the `/teams/<id>` API. Response data is used to merge team lead and team member IDs, which are stored in the state. Finally, it renders a table with a list of `<User />` components from the list of user IDs, passing `userId` in `props`.
- `<User />` component fetches the final piece of data we need - user details; `/users/<id>` API - and builds it into a table row.

## Areas of improvement
- Ideally user details would be fetched for each user in `<Team />` component so we can utilize it for filtering users and reduce API hit rate in `<User />`. However, I wasn't too sure how to make the tests work properly with `axios` mock so that it would resolve `Promise.all()` for a given list of user promises...

## Setup

To run the app on your localhost.

### `npm i`
### `npm start`

To test the app.

### `npm test`
