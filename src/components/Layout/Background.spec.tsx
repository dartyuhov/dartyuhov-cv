import { render, screen } from '@testing-library/react';
import Background from './Background';

it('should render background', () => {
  render(<Background />);
  expect(screen.getByLabelText('background')).toBeInTheDocument();
});
