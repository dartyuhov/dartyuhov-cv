import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CvLink from './CvLink';
import userData from '../../data/userData.json';

describe('Cv Link', () => {
  it('should render Download CV button with link', async () => {
    render(<CvLink />);
    const downloadLink = await screen.findByRole('link', {
      name: /download cv/i,
    });
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute('href', userData.cvLink);
  });

  it('should change color on hover', async () => {
    render(<CvLink />);
    const downloadLink = await screen.findByRole('link', {
      name: /download cv/i,
    });
    const downloadIcon = screen.getByTestId('download-icon');
    expect(downloadIcon).toHaveAttribute('fill', 'white');
    userEvent.hover(downloadLink);
    expect(downloadIcon).toHaveAttribute('fill', '#777173');
    userEvent.unhover(downloadLink);
    expect(downloadIcon).toHaveAttribute('fill', 'white');
  });
});
