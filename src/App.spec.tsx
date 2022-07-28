import {
  render, screen,
} from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';

import {
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';
import App from './App';

const mockedScrollTo = jest.fn();

jest.mock('./hooks/useParallax', () => ({
  __esModule: true,
  default: () => ({
    ref: { current: {} },
    scrollTo: mockedScrollTo,
  }),
}));

describe('App', () => {
  beforeAll(() => {
    setupIntersectionMocking(jest.fn);
    render(<App />);
  });

  afterAll(() => {
    resetIntersectionMocking();
  });

  it('should render without crashing', async () => {
    const background = await screen.findByLabelText('background', { exact: true });
    expect(background).toBeInTheDocument();

    const helloText = await screen.findByText('Hello, I\'m Dzmitry', { exact: true }, { timeout: 2000 });
    expect(helloText).toBeInTheDocument();

    const skills = await screen.findByLabelText('Skills carousel', { exact: true });
    expect(skills).toBeInTheDocument();
  });

  describe('should handle useParallax scrollTo', () => {
    it('should scroll to skills', () => {
      const skillsButton = screen.getByRole('button', { name: 'Skills' });
      userEvent.click(skillsButton);
      expect(mockedScrollTo).toHaveBeenCalledWith(0.96);
    });

    it('should scroll to about', () => {
      const aboutButton = screen.getByRole('button', { name: 'About' });
      userEvent.click(aboutButton);
      expect(mockedScrollTo).toHaveBeenCalledWith(0);
    });
    it('should scroll to projects', () => {
      const projectsButton = screen.getByRole('button', { name: 'Projects' });
      userEvent.click(projectsButton);
      expect(mockedScrollTo).toHaveBeenCalledWith(2);
    });
    it('should scroll to contact', () => {
      const contactMe = screen.getByRole('button', { name: 'Contact me' });
      userEvent.click(contactMe);
      expect(mockedScrollTo).toHaveBeenCalledWith(3);
    });
  });
});
