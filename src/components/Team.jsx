/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import User from './User';
import constants from '../constants';

const Team = (props) => {
  const { team, selectedTeam } = props;
  const tableHeaders = [
    'Avatar',
    'Display Name',
    'First Name',
    'Last Name',
    'Location',
  ];
  const [users, setUsers] = useState(null);
  const [firstFetch, setFirstFetch] = useState(true);
  // const [filteredUsers, setFilteredUsers] = useState(null);
  // const [filteredUserString, setFilteredUserString] = useState('');
  const [teamLeadId, setTeamLeadId] = useState('');

  useEffect(() => {
    if (selectedTeam === team.id && firstFetch) {
      // fetch specific team details
      axios.get(constants.endpoints.team(team.id))
        .then((res) => {
          setTeamLeadId(res.data.teamLeadId);
          // merge lead and members into users list
          setUsers([res.data.teamLeadId, ...res.data.teamMemberIds]);
          // for filtering purposes
          // setFilteredUsers([res.data.teamLeadId, ...res.data.teamMemberIds]);
          setFirstFetch(false);
        })
        .catch((error) => { throw new Error(error); });
    }
  }, [selectedTeam, team]);

  // const handleInputChange = (event) => {
  //   const userString = event.target.value;
  //   setFilteredUserString(userString);
  //   const userPattern = new RegExp(userString);
  //   if (userString !== '') {
  //     // filter based on any string entry in user object
  //     setFilteredUsers(users.filter((user) => (userPattern.test(
  //       user.displayName.toLowerCase()
  //       + user.firstName.toLowerCase()
  //       + user.lastName.toLowerCase()
  //       + user.location.toLowerCase(),
  //     ))));
  //   } else {
  //     setFilteredUsers(users);
  //   }
  // };

  return (
    <div>
      {users && selectedTeam === team.id && (
        <AccordionDetails data-testid={team.id} style={{ display: 'grid' }}>
          {/* <TextField
            key={team.id}
            style={{ margin: '10px' }}
            id={team.id}
            size="medium"
            label="Filter users..."
            value={filteredUserString}
            variant="outlined"
            onChange={handleInputChange}
          /> */}
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header} align="center">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User key={user} userId={user} isTeamLead={user === teamLeadId} />
              ))}
            </tbody>
          </table>
        </AccordionDetails>
      )}
    </div>
  );
};

export default Team;
