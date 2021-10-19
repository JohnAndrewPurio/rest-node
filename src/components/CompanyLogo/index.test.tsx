import { render } from '@testing-library/react';
import CompanyLogo from './index';

test('renders CompanyLogo without crashing', () => {
  const { baseElement } = render(<CompanyLogo />);
  expect(baseElement).toBeDefined();
});