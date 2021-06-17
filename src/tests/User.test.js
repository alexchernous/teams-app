/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  render,
  cleanup,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import axiosMock from 'axios';
import User from '../components/User';

describe('<User />', () => {
  afterEach(cleanup);

  test('renders Users', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        avatarUrl: '!',
        displayName: 'bobLead',
        firstName: 'Bob',
        id: 'team-1-lead',
        lastName: 'G',
        location: 'Canada',
      },
    });

    await act(async () => {
      // since User returns <tr> need to wrap in proper table HTML to avoid warnings
      render(
        <table>
          <tbody>
            <User userId={'team-1-lead'} isTeamLead={true} />
          </tbody>
        </table>,
      );
      await waitFor(() => {
        const member = screen.getByText('bobLead');
        const lead = screen.getByText('LEAD');
        // user exists
        expect(member).toBeInTheDocument();
        // user is lead
        expect(lead).toBeInTheDocument();
      });
    });
  });
});
