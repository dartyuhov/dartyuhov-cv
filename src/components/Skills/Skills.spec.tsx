import { Parallax } from '@react-spring/parallax';
import { render, screen } from '@testing-library/react';
import {
  setupIntersectionMocking,
  resetIntersectionMocking,
} from 'react-intersection-observer/test-utils';
import Skills from '.';
import { Skill } from '../../models/types.d';

const renderSkills = (skills: Skill[]) => {
  render(<Parallax pages={1}><Skills skills={skills} /></Parallax>);
};

describe('Skills', () => {
  beforeEach(() => {
    setupIntersectionMocking(jest.fn);
  });

  afterEach(() => {
    resetIntersectionMocking();
  });

  it('should render skills', () => {
    const mockedSkills = [
      {
        name: 'Skill name',
        config: {
          skill1: 100,
        },
      },
    ];
    renderSkills(mockedSkills);
    const skillsSlider = screen.getByLabelText('Skills carousel');
    expect(skillsSlider).toBeInTheDocument();
  });

  it('should show message if no skills provided', () => {
    renderSkills([]);
    const message = screen.getByText('No skills available');
    expect(message).toBeInTheDocument();
  });

  it('should not show contols if only one skill', () => {
    const mockedSkils = [
      {
        name: 'Skill name',
        config: {
          skill1: 100,
        },
      },
    ];
    renderSkills(mockedSkils);
    const leftArrow = screen.queryByLabelText('Previous slide (left arrow)');
    expect(leftArrow).toBeNull();
    const rightArrow = screen.queryByLabelText('Next slide (right arrow)');
    expect(rightArrow).toBeNull();
  });

  it('should show contols if more than one skill', () => {
    const mockedSkills = [
      {
        name: 'Skill name',
        config: {
          skill1: 100,
        },
      },
      {
        name: 'Skill name 2',
        config: {
          skill1: 100,
        },
      },
    ];
    renderSkills(mockedSkills);
    const leftArrow = screen.getByLabelText('Previous slide (left arrow)');
    expect(leftArrow).toBeInTheDocument();
    const rightArrow = screen.getByLabelText('Next slide (right arrow)');
    expect(rightArrow).toBeInTheDocument();
  });

  // Carousel itself is 3rd party library, so we shouldn't test it here
});
