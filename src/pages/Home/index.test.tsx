import { render } from '@testing-library/react';
import Home from './index';

test('renders Home without crashing', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeDefined();
});
