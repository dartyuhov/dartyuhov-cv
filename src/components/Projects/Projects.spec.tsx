import { Parallax } from '@react-spring/parallax';
import { render, screen } from '@testing-library/react';
import { Project } from '../../models/types.d';
import Projects from './Projects';

jest.mock('@mantine/hooks', () => ({
  __esModule: true,
  useElementSize: () => ({
    ref: jest.requireActual('react').createRef(), height: 100, width: 100,
  }),
}));

const renderProject = (projects: Project[]) => render(
  <Parallax pages={1}>
    <Projects offset={1} projects={projects} />
  </Parallax>,
);

const dummyProject = {
  name: 'Project 1',
  description: 'Description 1',
  techStack: ['Tech 1', 'Tech 2'],
  year: 2022,
  role: 'Role 1',
};

describe('Projects', () => {
  it('should render error message if there are no projects', () => {
    renderProject([]);
    expect(screen.getByText('No projects found')).toBeInTheDocument();
  });

  it('should render projects', () => {
    renderProject([dummyProject]);
    expect(screen.getByText('Project 1')).toBeInTheDocument();
  });

  it('should render title', () => {
    renderProject([dummyProject]);
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('projects should be gropped by year', () => {
    renderProject([
      {
        ...dummyProject,
        name: 'Project #1',
        year: 2020,
      },
      {
        ...dummyProject,
        name: 'Project #2',
        year: 2021,
      },
      {
        ...dummyProject,
        name: 'Project #3',
        year: 2021,
      },
      {
        ...dummyProject,
        name: 'Project #4',
        year: 2020,
      },
    ]);

    const projects = screen.getAllByText('Project #', { exact: false });
    expect(projects).toHaveLength(4);

    expect(projects[0]).toHaveTextContent('Project #1');
    expect(projects[1]).toHaveTextContent('Project #4');
    expect(projects[2]).toHaveTextContent('Project #2');
    expect(projects[3]).toHaveTextContent('Project #3');
  });

  it('projects should sorted by year', () => {
    renderProject([
      {
        ...dummyProject,
        name: 'Project #1',
        year: 2022,
      },
      {
        ...dummyProject,
        name: 'Project #2',
        year: 2019,
      },
      {
        ...dummyProject,
        name: 'Project #3',
        year: 2021,
      },
      {
        ...dummyProject,
        name: 'Project #4',
        year: 2020,
      },
    ]);

    const projects = screen.getAllByText('Project #', { exact: false });
    expect(projects).toHaveLength(4);

    expect(projects[0]).toHaveTextContent('Project #2');
    expect(projects[1]).toHaveTextContent('Project #4');
    expect(projects[2]).toHaveTextContent('Project #3');
    expect(projects[3]).toHaveTextContent('Project #1');
  });

  it('projects should render max year + 1', () => {
    renderProject([dummyProject]);

    expect(screen.getAllByText('202', { exact: false })).toHaveLength(2);
    expect(screen.getByText('2023')).toBeInTheDocument();
  });
});
