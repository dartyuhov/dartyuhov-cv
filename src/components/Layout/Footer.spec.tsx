import { Parallax } from '@react-spring/parallax';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('Should render Footer', () => {
    render(<Parallax pages={1}><Footer offset={0} /></Parallax>);
    expect(screen.getByLabelText('Footer')).toBeInTheDocument();
  });

  it('Should contain social links', () => {
    render(<Parallax pages={1}><Footer offset={0} /></Parallax>);
    const socialLinks = screen.getByLabelText('Social links');
    expect(socialLinks).toBeInTheDocument();
  });

  it('should render Download CV button with link', async () => {
    render(<Parallax pages={1}><Footer offset={0} /></Parallax>);
    const downloadLink = await screen.findByRole('link', {
      name: /download cv/i,
    });
    expect(downloadLink).toBeInTheDocument();
  });
});
