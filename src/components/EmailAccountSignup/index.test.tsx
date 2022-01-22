import { render } from '@testing-library/react';
import EmailAccountSignup from './index';

test('renders EmailAccountSignup without crashing', () => {
    const { baseElement } = render(<EmailAccountSignup />);
    expect(baseElement).toBeDefined();
});
