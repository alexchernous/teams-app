const constants = {
  endpoints: {
    users: 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/',
    user: (userId) => `https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/users/${userId}`,
    teams: 'https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/',
    team: (teamId) => `https://cgjresszgg.execute-api.eu-west-1.amazonaws.com/teams/${teamId}`,
  },
  tableHeaders: [
    'Avatar',
    'Display Name',
    'First Name',
    'Last Name',
    'Location',
  ],
};

export default constants;
