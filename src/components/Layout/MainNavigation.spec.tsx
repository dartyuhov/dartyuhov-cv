import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainNavigation from './MainNavigation';

const clickMock = jest.fn();

function renderMainNavigation() {
  render(<MainNavigation
    onAboutClick={clickMock}
    onContactClick={clickMock}
    onProjectsClick={clickMock}
    onSkillsClick={clickMock}
  />);
}
describe('Main Navigation Common ', () => {
  [1024, 768].forEach((width) => {
    it(`should render header for screen size ${width}`, () => {
      window.innerWidth = width;
      renderMainNavigation();

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });
  });
});

describe('Main Navigation for desktop', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
    renderMainNavigation();
  });

  it('should render render main navigation in header for desktop', () => {
    const mainNav = screen.getByRole('navigation');
    expect(mainNav).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });

  ['About', 'Skills', 'Projects', 'Contact me'].forEach((text) => {
    it(`should render button with text ${text}`, () => {
      const button = screen.getByText(text);
      expect(button).toBeInTheDocument();
    });
    it(`${text} should be clickable`, () => {
      const button = screen.getByText(text);
      userEvent.click(button);
      expect(clickMock).toBeCalledTimes(1);
    });
  });
});

describe('Main Navigation for mobile', () => {
  beforeEach(() => {
    window.innerWidth = 768;
    renderMainNavigation();
  });

  it('should not render main navigation buttons in header', () => {
    const mainNav = screen.queryByRole('navigation');
    expect(mainNav).toBeNull();

    const buttons = screen.queryAllByRole('button', { name: /About|Skills|Projects|Contact me/i });
    expect(buttons).toHaveLength(0);
  });

  it('should not render burger', async () => {
    const burger = await screen.findByRole('button', { name: 'Open navigation' });
    expect(burger).toBeInTheDocument();
  });

  it('burger should open left menu', async () => {
    const burger = await screen.findByRole('button', { name: 'Open navigation' });
    userEvent.click(burger);
    const leftMenu = await screen.findByRole('navigation');
    const menuText = await screen.findByText('Menu');

    expect(leftMenu).toBeInTheDocument();
    expect(menuText).toBeInTheDocument();
  });

  ['About', 'Skills', 'Projects', 'Contact me'].forEach((text) => {
    it(`should render button with text ${text}`, async () => {
      const burger = await screen.findByRole('button', { name: 'Open navigation' });
      userEvent.click(burger);
      const button = screen.getByText(text);
      expect(button).toBeInTheDocument();
    });

    it(`should render button with text ${text}`, async () => {
      jest.useFakeTimers();
      const burger = await screen.findByRole('button', { name: 'Open navigation' });
      userEvent.click(burger);
      const button = screen.getByText(text);
      userEvent.click(button);

      act(() => {
        jest.runOnlyPendingTimers();
      });
      jest.useRealTimers();

      await waitFor(() => expect(clickMock).toBeCalledTimes(1));
    });
  });
});
