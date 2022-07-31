import { render, screen } from '@testing-library/react';
import TerminalImage from './TerminalImage';

it('should render terminal image', () => {
  render(<TerminalImage />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
