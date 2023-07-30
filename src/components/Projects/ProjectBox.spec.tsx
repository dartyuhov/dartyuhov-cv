import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectBox from './ProjectBox';

const dummyProject = {
  name: 'Project 1',
  link: 'http://example.com',
  industry: 'Industry',
  description: 'lorem ipsum dolor sit amet lorem ipsum dolor ipsum dolor sit amet lorem ipsum dolor sit amet. lorem ipsum dolor sit amet lorem ipsum dolor ipsum dolor sit amet lorem ipsum dolor sit amet',
  techStack: ['Tech 1', 'Tech 2'],
  year: 2020,
  role: 'Role 1',
};

jest.mock('@mantine/hooks', () => ({
  __esModule: true,
  useElementSize: () => ({
    ref: jest.requireActual('react').createRef(), height: 100, width: 100,
  }),
}));

describe('Project', () => {
  beforeEach(() => {
    render(
      <ProjectBox project={dummyProject} />,
    );
  });
  it('should render project', () => {
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  it('should render project name', () => {
    expect(screen.getByText(dummyProject.name)).toBeInTheDocument();
  });

  it('should render project short description', () => {
    const shortDescription = screen.getByText(dummyProject.description);
    expect(shortDescription).toBeInTheDocument();
  });

  it('should render project role', () => {
    expect(screen.getByText(dummyProject.role)).toBeInTheDocument();
  });

  it('should render project industry', () => {
    expect(screen.getByText(dummyProject.industry)).toBeInTheDocument();
  });

  it('should render project link', () => {
    const link = screen.getByRole('link', { name: 'Link to project website' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', dummyProject.link);
  });

  it('should render project tech stack', async () => {
    expect(screen.getByText(dummyProject.techStack[0])).toBeInTheDocument();
    expect(screen.getByText(dummyProject.techStack[1])).toBeInTheDocument();
  });

  it('should hide tech stack if summary is extended', async () => {
    const showMoreButton = screen.getByRole('button', { name: 'Show more' });
    expect(showMoreButton).toBeInTheDocument();

    userEvent.click(showMoreButton);
    expect(screen.queryByText(dummyProject.techStack[0])).toBeNull();
    expect(screen.queryByText(dummyProject.techStack[1])).toBeNull();
  });

  it('should render tech stack after hide', async () => {
    const showMoreButton = screen.getByRole('button', { name: 'Show more' });
    userEvent.click(showMoreButton);
    expect(screen.queryByText(dummyProject.techStack[0])).toBeNull();
    expect(screen.queryByText(dummyProject.techStack[1])).toBeNull();
    const hide = screen.getByRole('button', { name: 'Hide' });
    jest.useFakeTimers();

    userEvent.click(hide);
    jest.runOnlyPendingTimers();
    await waitFor(() => {
      expect(screen.queryByText(dummyProject.techStack[0])).toBeInTheDocument();
      expect(screen.queryByText(dummyProject.techStack[1])).toBeInTheDocument();
    });
  });
});

describe('Project', () => {
  it('should not render link and industry if undefined', async () => {
    render(
      <ProjectBox project={{
        ...dummyProject,
        industry: undefined,
        link: undefined,
      }}
      />,
    );
    const link = screen.queryByRole('link', { name: 'Link to project website' });
    const industry = screen.queryByLabelText('Project industry');

    expect(link).toBeNull();
    expect(industry).toBeNull();
  });

  it('should allow to render html in description', async () => {
    render(
      <ProjectBox project={{
        ...dummyProject,
        description: '<div data-testid="test">lorem ipsum dolor sit amet</div>',
      }}
      />,
    );
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should not render tech stack if techStack length === 0', async () => {
    render(
      <ProjectBox project={{
        ...dummyProject,
        techStack: [],
      }}
      />,
    );
    expect(screen.queryByText('Technologies:')).toBeNull();
  });
});
