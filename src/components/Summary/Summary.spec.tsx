import { Parallax } from '@react-spring/parallax';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Summary from './Summary';

describe('Summary screen', () => {
  it('should render summary screen', () => {
    render(<Parallax pages={1}><Summary /></Parallax>);

    const avatar = screen.getByAltText('avatar');
    expect(avatar).toBeInTheDocument();
  });

  describe('Terminal image', () => {
    afterEach(() => {
      jest.useRealTimers();
    });

    it('should render terminal with test demo after timeout', async () => {
      jest.useFakeTimers();
      render(<Parallax pages={1}><Summary /></Parallax>);

      act(() => {
        jest.runOnlyPendingTimers();
      });

      const image = screen.getByRole('img', { name: 'Running some tests...' });
      expect(image).toBeInTheDocument();
    });

    it('should not render terminal becaouse of timeout', () => {
      render(<Parallax pages={1}><Summary /></Parallax>);
      const image = screen.queryByRole('img', { name: 'Running some tests...' });
      expect(image).toBeNull();
    });
  });
});
