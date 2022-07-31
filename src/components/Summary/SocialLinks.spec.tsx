import { render, screen } from '@testing-library/react';
import SocialLinks from './SocialLinks';

describe('Social links', () => {
  beforeEach(() => {
    render(<SocialLinks />);
  });

  it('should render social links', () => {
    const instagram = screen.getByRole('link', { name: 'instagram.svg' });
    const linkedin = screen.getByRole('link', { name: 'linkedin.svg' });
    const github = screen.getByRole('link', { name: 'github.svg' });

    expect(linkedin).toBeInTheDocument();
    expect(github).toBeInTheDocument();
    expect(instagram).toBeInTheDocument();
  });

  it('should redirect to link', () => {
    const instagram = screen.getByRole('link', { name: 'instagram.svg' });
    const linkedin = screen.getByRole('link', { name: 'linkedin.svg' });
    const github = screen.getByRole('link', { name: 'github.svg' });

    expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/dmitry-artyuhov-75873913b');
    expect(github).toHaveAttribute('href', 'https://github.com/dartyuhov');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/dima_artyukhov');
  });

  it('should open new tab after click to link', () => {
    const instagram = screen.getByRole('link', { name: 'instagram.svg' });
    const linkedin = screen.getByRole('link', { name: 'linkedin.svg' });
    const github = screen.getByRole('link', { name: 'github.svg' });

    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('target', '_blank');
    expect(instagram).toHaveAttribute('target', '_blank');
  });
});
