import { render } from '@testing-library/react';
import Header from './index';

test('renders Header without crashing', () => {
    const { baseElement } = render(<Header title="" />);
    expect(baseElement).toBeDefined();
});
