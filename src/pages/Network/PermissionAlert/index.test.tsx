import { render } from '@testing-library/react';
import Alert from './index';

test('renders AppRouter without crashing', () => {
  const { baseElement } = render(<Alert />);
  expect(baseElement).toBeDefined();
});
