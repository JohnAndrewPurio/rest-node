import { render } from '@testing-library/react';
import Network from './index';

test('renders Home without crashing', () => {
    const { baseElement } = render(<Network />);
    expect(baseElement).toBeDefined();
});
