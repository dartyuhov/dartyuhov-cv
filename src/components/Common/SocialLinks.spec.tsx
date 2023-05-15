import { render, screen } from '@testing-library/react';
import SocialLinks from './SocialLinks';

describe('Social links', () => {
  beforeEach(() => {
    render(<SocialLinks />);
  });

  it('should render social links', () => {
    const socialLinks = screen.getByLabelText('Social links');
    expect(socialLinks).toBeInTheDocument();
  });

  it('should redirect to link', () => {
    const instagram = screen.getByLabelText('Instagram link');
    const linkedin = screen.getByLabelText('LinkedIn link');
    const github = screen.getByLabelText('GitHub link');

    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/dzmitry-artsiukhou-75873913b/',
    );
    expect(github).toHaveAttribute('href', 'https://github.com/dartyuhov');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/dima_artyukhov');
  });

  it('should open new tab after click to link', () => {
    const instagram = screen.getByLabelText('Instagram link');
    const linkedin = screen.getByLabelText('LinkedIn link');
    const github = screen.getByLabelText('GitHub link');

    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('target', '_blank');
    expect(instagram).toHaveAttribute('target', '_blank');
  });
});
