import { render, screen } from '@testing-library/react';
import LeftPanel from './LeftPanel';

describe('Left Panel', () => {
  it('should render left panel', () => {
    render(
      <LeftPanel onClose={jest.fn()} opened>
        <div />
      </LeftPanel>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render left panel', () => {
    render(
      <LeftPanel onClose={jest.fn()} opened={false}>
        <div />
      </LeftPanel>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
