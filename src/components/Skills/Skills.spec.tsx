import { Parallax } from '@react-spring/parallax';
import { render, screen } from '@testing-library/react';
import {
  setupIntersectionMocking,
  resetIntersectionMocking,
  mockAllIsIntersecting,
} from 'react-intersection-observer/test-utils';
import { Carousel } from '@mantine/carousel';
import Skills from '.';
import { Skill } from '../../models/types.d';
import * as useScreenType from '../../hooks/useScreenType';

const renderSkills = (skills: Skill[]) => render(
  <Parallax pages={1}>
    <Skills offset={1} skills={skills} />
  </Parallax>,
);

describe('Skills section', () => {
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
      {
        name: 'Skill name 3',
        config: {
          skill1: 100,
        },
      },
      {
        name: 'Skill name 4',
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

  function mockScreenType(screenType: useScreenType.ScreenType) {
    jest.spyOn(useScreenType, 'default').mockReturnValue(screenType);
  }

  [{
    type: 'mobile',
    expected: 1,
  },
  {
    type: 'tablet',
    expected: 2,
  },
  {
    type: 'desktop',
    expected: 2,
  },
  {
    type: 'widescreen',
    expected: 3,
  },
  ].forEach((testData) => {
    it(`should show arrow button(s) if there is ${testData.expected} (exactly)) slides on ${testData.type} screen`, async () => {
      mockScreenType(testData.type as useScreenType.ScreenType);
      window.innerWidth = 100;
      const mockedSkills: Skill[] = Array.from({ length: testData.expected }, (_, index) => ({
        name: `Skill name ${index}`,
        config: {
          skill1: 100,
        },
      }));
      renderSkills(mockedSkills);

      const nextSlidesButton = screen.queryByLabelText('Next slide (right arrow)');
      expect(nextSlidesButton).toBeNull();
    });

    it(`should show arrow button(s) if there is ${testData.expected} + 1 slides on ${testData.type} screen`, async () => {
      mockScreenType(testData.type as useScreenType.ScreenType);
      window.innerWidth = 100;
      const mockedSkills: Skill[] = Array.from({ length: testData.expected + 1 }, (_, index) => ({
        name: `Skill name ${index}`,
        config: {
          skill1: 100,
        },
      }));
      renderSkills(mockedSkills);

      const nextSlidesButton = screen.getByLabelText('Next slide (right arrow)');
      expect(nextSlidesButton).toBeInTheDocument();
    });
  });

  describe('Autoplay', () => {
    jest.mock('@mantine/carousel');
    const CarouselMock = Carousel as jest.MockedObject<typeof Carousel>;
    function mockCarousel(screenType: useScreenType.ScreenType) {
      mockScreenType(screenType);
      const mock = jest.fn();
      (CarouselMock as any).render = (props: any) => {
        mock(props.plugins);
        return (<div />);
      };
      return mock;
    }

    ['tablet', 'desktop', 'widescreen'].forEach((screenType) => {
      it(`autoplay should be enabled ${screenType} screen`, async () => {
        const mock = mockCarousel(screenType as useScreenType.ScreenType);
        renderSkills([]);
        mockAllIsIntersecting(true);
        expect(mock).lastCalledWith(expect.arrayContaining([expect.any(Object)]));
      });
    });

    it('autoplay should be enabled only in viewport screen', async () => {
      const mock = mockCarousel('desktop');
      renderSkills([]);
      mockAllIsIntersecting(false);
      expect(mock).lastCalledWith(expect.arrayContaining([]));
    });

    it('autoplay should be disabled mobile screen', async () => {
      const mock = mockCarousel('mobile');
      renderSkills([]);

      mockAllIsIntersecting(true);
      expect(mock).lastCalledWith([]);
    });
  });

  // Carousel itself is 3rd party library, so we shouldn't test it here
});
