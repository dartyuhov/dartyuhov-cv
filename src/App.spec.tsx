import { Parallax } from '@react-spring/parallax';
import { render, screen } from '@testing-library/react';

import {
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';
import App from './App';

const renderApp = () => {
  render(<Parallax pages={1}><App /></Parallax>);
};

describe('App', () => {
  beforeEach(() => {
    setupIntersectionMocking(jest.fn);
  });

  afterEach(() => {
    resetIntersectionMocking();
  });

  it('should render without crashing', async () => {
    renderApp();
    const helloText = await screen.findByText('Hello, I\'m Dzmitry', { exact: true }, { timeout: 2000 });
    expect(helloText).toBeInTheDocument();

    const skills = await screen.findByLabelText('Skills carousel', { exact: true });
    expect(skills).toBeInTheDocument();
  });
});
