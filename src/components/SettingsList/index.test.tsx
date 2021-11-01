import { render } from '@testing-library/react';
import SettingsList from './index';

test('renders SettingsList without crashing', () => {
  const { baseElement } = render(<SettingsList />);
  expect(baseElement).toBeDefined();
});
