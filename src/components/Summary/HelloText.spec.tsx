import { render, screen, waitFor } from '@testing-library/react/pure';
import HelloText from './HelloText';

jest.setTimeout(7000);

describe('Hello Text', () => {
  beforeEach(() => {
    render(<HelloText />);
  });

  it('should render hello text', async () => {
    const textElement = await screen.findByText('Hello, I\'m Dzmitry.', {}, { timeout: 2000 });
    expect(textElement).toBeInTheDocument();
  });

  it('should render specialities', async () => {
    const specialityElement = await screen.findByText('Quality Assurance');
    expect(specialityElement).toBeInTheDocument();
    await waitFor(() => expect(specialityElement).toHaveTextContent('Test Automation'), { timeout: 2500 });
    await waitFor(() => expect(specialityElement).toHaveTextContent('Software Developer In Test'), { timeout: 2500 });
  });
});
