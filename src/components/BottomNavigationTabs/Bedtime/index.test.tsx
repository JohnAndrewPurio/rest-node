import { render } from '@testing-library/react';
import Bedtime from './index';

test('renders Bedtime without crashing', () => {
  const { baseElement } = render(<Bedtime />);
  expect(baseElement).toBeDefined();
});