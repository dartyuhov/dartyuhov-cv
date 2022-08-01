import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./hooks/usePageConfig', () => ({
  __esModule: true,
  default: () => ({
    pagesConfig: {
      factor: 1,
      contactMe: {
        start: 0,
        end: 1,
        speed: 0.5,
      },
      projects: {
        start: 0,
        end: 1,
        speed: 0.5,
      },
      summary: {
        start: 0,
        end: 1,
        speed: 0.5,
      },
      skills: {
        start: 0,
        end: 1,
        speed: 0.5,
      },
    },
    isLoading: false,
  }),
}));
