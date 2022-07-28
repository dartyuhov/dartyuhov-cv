import { render, screen } from '@testing-library/react';
import Background from './Background';

describe('Background', () => {
  it('should render background', () => {
    render(<Background />);
    expect(screen.getByLabelText('background')).toBeInTheDocument();
  });
});
