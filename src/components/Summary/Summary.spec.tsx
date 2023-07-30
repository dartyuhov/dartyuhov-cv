import { Parallax } from '@react-spring/parallax';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useMediaQuery } from '@mantine/hooks';
import userData from '../../data/userData.json';
import Summary from './Summary';

jest.mock('@mantine/hooks');
const useMediaQueryMock = useMediaQuery as jest.MockedObject<typeof useMediaQuery>;

const renderSummary = () => render(<Parallax pages={1}><Summary offset={0} /></Parallax>);
describe('Summary screen', () => {
  it('should render summary screen', () => {
    renderSummary();

    const avatar = screen.getByAltText('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('should show location', () => {
    renderSummary();

    const textElement = screen.getByLabelText('Location');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(userData.location);
  });

  describe('Terminal image', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('should render terminal with test demo after timeout', async () => {
      jest.useFakeTimers();
      renderSummary();

      act(() => {
        jest.runOnlyPendingTimers();
      });

      const image = screen.getByRole('img', { name: 'Running some tests...' });
      expect(image).toBeInTheDocument();
    });

    it('should not render terminal because of timeout', () => {
      renderSummary();
      const image = screen.queryByRole('img', { name: 'Running some tests...' });
      expect(image).toBeNull();
    });

    it('should not render terminal if small screen', () => {
      window.innerWidth = 1000;
      jest.useFakeTimers();
      (useMediaQueryMock as any).mockImplementation(() => true);
      renderSummary();
      act(() => {
        jest.runOnlyPendingTimers();
      });
      const image = screen.queryByRole('img', { name: 'Running some tests...' });
      expect(image).toBeNull();
    });

    it('should adjust position of hello text and avatar if terminal is active', async () => {
      jest.useFakeTimers();
      renderSummary();

      const mainContainer = screen.getByTestId('sammary-container');
      expect(mainContainer).toHaveStyle('width: 100%');

      act(() => {
        jest.runOnlyPendingTimers();
      });

      const image = await screen.findByRole('img', { name: 'Running some tests...' });
      expect(image).toBeInTheDocument();
      expect(mainContainer).toHaveStyle('width: 70%');
    });

    it('should not adjust position of hello text and avatar if small screen', async () => {
      jest.useFakeTimers();
      (useMediaQueryMock as any).mockImplementation(() => true);
      renderSummary();

      act(() => {
        jest.runOnlyPendingTimers();
      });
      const mainContainer = screen.getByTestId('sammary-container');
      expect(mainContainer).toHaveStyle('width: 100%');
    });
  });
});
