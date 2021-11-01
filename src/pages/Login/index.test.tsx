import { render } from '@testing-library/react';
import Login from './index';

test('renders Login without crashing', () => {
  const { baseElement } = render(<Login />);
  expect(baseElement).toBeDefined();
});
