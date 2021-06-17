/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  render,
  cleanup,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import axiosMock from 'axios';
import Team from '../components/Team';

jest.mock('../components/User', () => ({
  __esModule: true,
  default: () => (
    <tr>
      <td>image</td>
      <td>displayName</td>
      <td>firstName</td>
      <td>lastName</td>
      <td>location</td>
    </tr>
  ),
}));

describe('<Team />', () => {
  afterEach(cleanup);

  const team = {
    id: 'team-id-1',
    name: 'Team 1 name',
  };

  test('renders team component and checks for team id presence', async () => {
    // for /team/<id>
    axiosMock.get.mockResolvedValueOnce({
      data: {
        id: 'team-id-1',
        name: 'Team 1 name',
        teamLeadId: 'team-1-lead',
        teamMemberIds: ['team-1-member-1'],
      },
    });
    // for /user/<id> promises
    axiosMock.all.mockResolvedValueOnce([{
      data: {
        avatarUrl: '!',
        displayName: 'bobLead',
        firstName: 'Bob',
        id: 'team-1-lead',
        lastName: 'G',
        location: 'Canada',
      },
    }, {
      data: {
        avatarUrl: '@',
        displayName: 'lucyMember',
        firstName: 'Lucy',
        id: 'team-1-member',
        lastName: 'L',
        location: 'Canada',
      },
    }]);

    await act(async () => {
      render(<Team team={team} selectedTeam='team-id-1' />);
      await waitFor(() => {
        const teamDiv = screen.getByTestId('team-id-1');
        // team exists
        expect(teamDiv).toBeInTheDocument();
      });
    });
  });
});
