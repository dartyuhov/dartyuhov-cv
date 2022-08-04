import { Parallax } from '@react-spring/parallax';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Summary from './Summary';

const renderSummary = () => render(<Parallax pages={1}><Summary offset={0} /></Parallax>);
describe('Summary screen', () => {
  it('should render summary screen', () => {
    renderSummary();

    const avatar = screen.getByAltText('avatar');
    expect(avatar).toBeInTheDocument();
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

    it('should not render terminal becaouse of timeout', () => {
      renderSummary();
      const image = screen.queryByRole('img', { name: 'Running some tests...' });
      expect(image).toBeNull();
    });

    it('should not render terminal if small screen', () => {
      window.innerWidth = 1000;
      renderSummary();
      const image = screen.queryByRole('img', { name: 'Running some tests...' });
      expect(image).toBeNull();
    });
  });
});
