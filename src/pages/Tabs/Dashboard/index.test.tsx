import { render } from '@testing-library/react';
import Dashboard from './index';

test('renders Dashboard without crashing', () => {
  const { baseElement } = render(<Dashboard />);
  expect(baseElement).toBeDefined();
});
