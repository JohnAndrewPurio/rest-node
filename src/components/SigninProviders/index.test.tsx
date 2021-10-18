import { render } from '@testing-library/react';
import SigninProviders from './index';

test('renders SigninProviders without crashing', () => {
  const { baseElement } = render(<SigninProviders />);
  expect(baseElement).toBeDefined();
});