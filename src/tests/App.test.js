/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  render,
  act,
  cleanup,
} from '@testing-library/react';
import App from '../App';

// this mock is a bit lazy
jest.mock('../components/HomePage', () => ({
  __esModule: true,
  default: () => (<div>home page with team accordions and user tables</div>),
}));

describe('<App />', () => {
  afterEach(cleanup);

  test('renders component', async () => {
    await act(async () => {
      const { container } = render(<App />);
      // simply renders the component
      expect(container).toMatchInlineSnapshot(`
        <div>
          <div>
            home page with team accordions and user tables
          </div>
        </div>
      `);
    });
  });
});
