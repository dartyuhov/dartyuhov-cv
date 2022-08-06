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
});
