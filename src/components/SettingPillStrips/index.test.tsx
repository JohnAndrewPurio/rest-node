import { render } from '@testing-library/react';
import SettingPillStrips from './index';

test('renders SettingPillStrips without crashing', () => {
    const { baseElement } = render(<SettingPillStrips />);
    expect(baseElement).toBeDefined();
});
