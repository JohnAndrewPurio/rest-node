import { render } from '@testing-library/react';
import Learn from './index';

test('renders Learn without crashing', () => {
    const { baseElement } = render(<Learn />);
    expect(baseElement).toBeDefined();
});
