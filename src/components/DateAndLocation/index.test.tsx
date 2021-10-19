import { render } from '@testing-library/react';
import DateAndLocation from './index';

test('renders DateAndLocation without crashing', () => {
  const { baseElement } = render(<DateAndLocation />);
  expect(baseElement).toBeDefined();
});