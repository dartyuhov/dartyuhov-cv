import { render, screen } from '@testing-library/react/pure';
import userEvent from '@testing-library/user-event';
import {
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';
import userData from './data/userData.json';
import App from './App';

import * as pageConfig from './hooks/usePageConfig';

const mockedScrollTo = jest.fn();

jest.mock('./hooks/useParallax', () => ({
  __esModule: true,
  default: () => ({
    ref: { current: {} },
    scrollTo: mockedScrollTo,
  }),
}));

jest.mock('./components/UI/Spoiler', () => ({
  __esModule: true,
  default: () => <div />,
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

    const helloText = await screen.findByText(`Hello, I'm ${userData.name}.`, { exact: true }, { timeout: 3000 });
    expect(helloText).toBeInTheDocument();

    const skills = await screen.findByLabelText('Skills carousel', { exact: true });
    expect(skills).toBeInTheDocument();
  });

  describe('Navigation buttons should scrollTo section taking into account header', () => {
    it('should scroll to skills', () => {
      const skillsButton = screen.getByRole('button', { name: 'Skills' });
      userEvent.click(skillsButton);
      expect(mockedScrollTo).toHaveBeenCalledWith(-0.05);
    });

    it('should scroll to about', () => {
      const aboutButton = screen.getByRole('button', { name: 'About' });
      userEvent.click(aboutButton);
      expect(mockedScrollTo).toHaveBeenCalledWith(0);
    });

    it('should scroll to projects', () => {
      const projectsButton = screen.getByRole('button', { name: 'My Projects' });
      userEvent.click(projectsButton);
      expect(mockedScrollTo).toHaveBeenCalledWith(-0.1);
    });

    it('should scroll to contact', () => {
      const contactMe = screen.getByRole('button', { name: 'Contact me' });
      userEvent.click(contactMe);
      expect(mockedScrollTo).toHaveBeenCalledWith(-0.05);
    });
  });
});

describe('Loading overlay', () => {
  it('should not render loading', async () => {
    const { container } = render(<App />);
    const loadingOverlay = container.querySelector('[class^="mantine-LoadingOverlay"]');
    expect(loadingOverlay).not.toBeInTheDocument();
  });

  it('should render loading', async () => {
    jest.spyOn(pageConfig, 'default').mockImplementationOnce(() => ({
      pagesConfig: {
        pageCount: 5,
        contactMe: { start: 0 },
        projects: { start: 0 },
        summary: { start: 0 },
        skills: { start: 0 },
        footer: { start: 0 },
      },
      isLoading: true,
    }) as any);

    const { container } = render(<App />);

    const loadingOverlay = container.querySelector('[class*="LoadingOverlay"]');
    expect(loadingOverlay).toBeInTheDocument();
  });
});
