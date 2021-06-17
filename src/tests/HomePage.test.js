/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  render,
  screen,
  act,
  cleanup,
  waitFor,
} from '@testing-library/react';
import axiosMock from 'axios';
import HomePage from '../components/HomePage';

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

jest.mock('../components/Team', () => ({
  __esModule: true,
  default: () => (
    <table>
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Display Name</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            user Avatar
          </td>
          <td>
            user Display Name
          </td>
          <td>
            user First Name
          </td>
          <td>
            user Last Name
          </td>
        </tr>
      </tbody>
    </table>
  ),
}));

describe('<HomePage />', () => {
  afterEach(cleanup);

  test('renders filter and team accordion and checks for team id / filter input presence', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [{
        id: 'team-id-1',
        name: 'Team 1 name',
      }],
    });

    await act(async () => {
      render(<HomePage />);
      await waitFor(() => {
        const filterInput = screen.getByLabelText('Filter teams...');
        const team = screen.getByTestId('team-id-1');
        // team filter field exists
        expect(filterInput).toBeInTheDocument();
        // team exists
        expect(team).toBeInTheDocument();
      });
    });
  });
});
