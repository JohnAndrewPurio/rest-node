import { render } from '@testing-library/react';
import AppRouter from './index';

test('renders AppRouter without crashing', () => {
    const { baseElement } = render(<AppRouter />);
    expect(baseElement).toBeDefined();
});
