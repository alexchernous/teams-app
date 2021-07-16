const constants = {
  endpoints: {
    users: '/',
    user: (userId) => `/${userId}`,
    teams: '/',
    team: (teamId) => `/${teamId}`,
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
