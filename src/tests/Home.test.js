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
      </tbody>
    </table>
  ),
}));

describe('<HomePage />', () => {
  afterEach(cleanup);

  test('renders filter input', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [{
        id: 'team-id-1',
        name: 'Team 1 name',
      }],
    });

    await act(async () => {
      render(<HomePage />);
      await waitFor(() => {
        const filterInput = screen.getAllByText('Filter teams...');
        // team filter field exists
        expect(filterInput[0]).toBeInTheDocument();
      });
    });
  });
});
