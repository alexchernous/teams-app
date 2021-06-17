/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import TextField from '@material-ui/core/TextField';
import Team from './Team';
import constants from '../constants';

const HomePage = () => {
  const [teams, setTeams] = useState(null);
  const [filteredTeams, setFilteredTeams] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [filteredTeamName, setFilteredTeamName] = useState('');

  useEffect(() => {
    if (!teams) {
      // fetch basic teams data
      axios.get(constants.endpoints.teams)
        .then((res) => {
          setTeams(res.data);
          setFilteredTeams(res.data);
        })
        .catch((error) => { throw new Error(error); });
    }
  }, [teams]);

  // input field handling
  const handleInputChange = (event) => {
    const teamName = event.target.value;
    setFilteredTeamName(teamName);
    const teamNamePattern = new RegExp(teamName);
    if (teamName !== '') {
      setFilteredTeams(teams.filter(
        (team) => teamNamePattern.test(team.name.toLowerCase()),
      ));
    } else {
      // update back to full list
      setFilteredTeams(teams);
    }
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <TextField
        style={{ margin: '10px' }}
        id='team-filter'
        label='Filter teams...'
        size='medium'
        value={filteredTeamName}
        variant='outlined'
        onChange={handleInputChange}
        fullWidth
      />
      {filteredTeams && filteredTeams.map((team) => (
        <Accordion
          key={team.id}
          data-testid={team.id}
          style={{ margin: '10px' }}
          onChange={(() => setSelectedTeam(team.id))}
        >
          <AccordionSummary
            expandIcon={'+'}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            {team.name}
          </AccordionSummary>
          <Team team={team} selectedTeam={selectedTeam} />
        </Accordion>
      ))}
    </div>
  );
};

export default HomePage;
