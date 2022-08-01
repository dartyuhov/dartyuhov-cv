import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectBox from './ProjectBox';

const dummyProject = {
  name: 'Project 1',
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
});
