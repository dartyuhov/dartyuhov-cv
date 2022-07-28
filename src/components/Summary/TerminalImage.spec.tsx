import { render, screen } from '@testing-library/react';
import TerminalImage from './TerminalImage';

describe('Terminal image', () => {
  it('should render terminal image', () => {
    render(<TerminalImage active />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should not render terminal image', () => {
    render(<TerminalImage active={false} />);
    expect(screen.queryByRole('img')).toBeNull();
  });
});
