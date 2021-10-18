import { render } from '@testing-library/react';
import RestNode from './index';

test('renders RestNode without crashing', () => {
  const { baseElement } = render(<RestNode />);
  expect(baseElement).toBeDefined();
});