import { render } from '@testing-library/react';
import Profile from './index';

test('renders Login without crashing', () => {
    const { baseElement } = render(<Profile />);
    expect(baseElement).toBeDefined();
});
