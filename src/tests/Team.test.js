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
      <td style={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
        image
      </td>
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

  test('renders Teams', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        id: 'team-id-1',
        name: 'Team 1 name',
        teamLeadId: 'team-1-lead',
        teamMemberIds: ['team-1-member-1', 'team-1-member-2'],
      },
    });

    await act(async () => {
      render(<Team team={team} selectedTeam='team-id-1' />);
      await waitFor(() => {
        const teamName = screen.getByTestId('team-id-1');
        // team id exists
        expect(teamName).toBeInTheDocument();
      });
    });
  });
});
