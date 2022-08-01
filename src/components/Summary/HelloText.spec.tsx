import { render, screen, waitFor } from '@testing-library/react/pure';
import HelloText from './HelloText';
import userData from '../../data/userData.json';

jest.setTimeout(7000);

describe('Hello Text', () => {
  beforeEach(() => {
    render(<HelloText />);
  });

  it('should render hello text', async () => {
    const textElement = await screen.findByText(`Hello, I'm ${userData.name}.`, {}, { timeout: 3000 });
    expect(textElement).toBeInTheDocument();
  });

  it('should render specialities', async () => {
    const specialityElement = await screen.findByText(userData.roles[0]);
    expect(specialityElement).toBeInTheDocument();
    await waitFor(
      () => expect(specialityElement).toHaveTextContent(userData.roles[1] as string),
      { timeout: 3000 },
    );
    await waitFor(
      () => expect(specialityElement).toHaveTextContent(userData.roles[2] as string),
      { timeout: 3000 },
    );
  });
});
