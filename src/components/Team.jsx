/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import TextField from '@material-ui/core/TextField';
import User from './User';
import constants from '../constants';

const Team = (props) => {
  const { team, selectedTeam } = props;
  const [users, setUsers] = useState(null);
  const [firstFetch, setFirstFetch] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [filteredUserString, setFilteredUserString] = useState('');
  const [teamLeadId, setTeamLeadId] = useState('');

  useEffect(() => {
    if (selectedTeam === team.id && firstFetch) {
      // fetch specific team details
      axios.get(constants.endpoints.team(team.id))
        .then((res) => {
          // set team lead
          setTeamLeadId(res.data.teamLeadId);
          // merge lead and members into single list
          const userIds = [res.data.teamLeadId, ...res.data.teamMemberIds];
          // avoiding fetching again if accordion is reopen
          setFirstFetch(false);

          const userPromises = userIds.map((userId) => axios.get(constants.endpoints.user(userId)));
          // execute promises for users in the team
          axios.all(userPromises)
            .then((results) => {
              // extract data from promise object
              const resultData = results.map((result) => result.data);
              // set user state data
              setUsers(resultData);
              // for filtering purposes
              setFilteredUsers(resultData);
            })
            .catch((error) => { throw new Error(error); });
        })
        .catch((error) => { throw new Error(error); });
    }
  }, [selectedTeam, team]);

  // input field handling
  const handleInputChange = (event) => {
    const userString = event.target.value;
    setFilteredUserString(userString);
    const userPattern = new RegExp(userString);
    if (userString !== '') {
      // filter based on any string entry in user object
      setFilteredUsers(users.filter((user) => (userPattern.test(
        user.displayName.toLowerCase()
        + user.firstName.toLowerCase()
        + user.lastName.toLowerCase()
        + user.location.toLowerCase(),
      ))));
    } else {
      // update back to full list
      setFilteredUsers(users);
    }
  };

  return (
    <div>
      {filteredUsers && selectedTeam === team.id && (
        <AccordionDetails data-testid={team.id} style={{ display: 'grid' }}>
          <TextField
            key={team.id}
            style={{ margin: '10px' }}
            id={team.id}
            size='medium'
            label='Filter users...'
            value={filteredUserString}
            variant='outlined'
            onChange={handleInputChange}
            fullWidth
          />
          <table>
            <thead>
              <tr>
                {constants.tableHeaders.map((header) => (
                  <th key={header} align="center">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <User key={user.id} user={user} isTeamLead={user.id === teamLeadId} />
              ))}
            </tbody>
          </table>
        </AccordionDetails>
      )}
    </div>
  );
};

export default Team;
