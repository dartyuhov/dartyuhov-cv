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

const dummySkill = {
  name: 'Skill name',
  config: {
    skill1: 100,
  },
};

describe('Skills section', () => {
  beforeEach(() => {
    setupIntersectionMocking(jest.fn);
  });

  afterEach(() => {
    resetIntersectionMocking();
  });

  it('should render skills', () => {
    renderSkills([dummySkill]);
    const skillsSlider = screen.getByLabelText('Skills carousel');
    expect(skillsSlider).toBeInTheDocument();
  });

  it('should show message if no skills provided', () => {
    renderSkills([]);
    const message = screen.getByText('No skills available');
    expect(message).toBeInTheDocument();
  });

  const mockScreenType = (screenType: useScreenType.ScreenType) => jest.spyOn(useScreenType, 'default').mockReturnValue(screenType);

  describe('Carousel controls/indicators', () => {
    [
      { screenType: 'mobile', slidesCount: 1 },
      { screenType: 'tablet', slidesCount: 2 },
      { screenType: 'desktop', slidesCount: 2 },
      { screenType: 'widescreen', slidesCount: 3 },
    ].forEach((testData) => {
      beforeAll(() => {
        window.innerWidth = 100;
      });

      it(`should not show controls if there is ${testData.slidesCount} on ${testData.screenType} screen`, async () => {
        mockScreenType(testData.screenType as useScreenType.ScreenType);
        renderSkills(Array.from({ length: testData.slidesCount }, () => ({ ...dummySkill })));

        expect(screen.queryByLabelText('Next slide (right arrow)')).toBeNull();
        expect(screen.queryByLabelText('Previous slide (left arrow)')).toBeNull();
      });

      it(`should show controls  if there is ${testData.slidesCount + 1} on ${testData.screenType} screen`, async () => {
        mockScreenType(testData.screenType as useScreenType.ScreenType);
        renderSkills(Array.from({ length: testData.slidesCount + 1 }, () => ({ ...dummySkill })));

        expect(screen.getByLabelText('Next slide (right arrow)')).toBeInTheDocument();
        expect(screen.getByLabelText('Previous slide (left arrow)')).toBeInTheDocument();
      });

      it(`should show indicatores if ${testData.slidesCount + 1} slides on ${testData.screenType} screen`, async () => {
        mockScreenType(testData.screenType as useScreenType.ScreenType);
        renderSkills(Array.from({ length: testData.slidesCount + 1 }, () => ({ ...dummySkill })));

        expect(document.querySelector('.mantine-Carousel-indicators')).toBeInTheDocument();
      });

      it(`should not  show indicatores if ${testData.slidesCount} slides on ${testData.screenType} screen`, async () => {
        mockScreenType(testData.screenType as useScreenType.ScreenType);
        renderSkills(Array.from({ length: testData.slidesCount }, () => ({ ...dummySkill })));

        expect(document.querySelector('.mantine-Carousel-indicators')).toBeNull();
      });
    });
  });

  describe('Carousel parameterms on different screen types', () => {
    jest.mock('@mantine/carousel');
    const CarouselMock = Carousel as jest.MockedObject<typeof Carousel>;

    const prepareMocks = (screenType: useScreenType.ScreenType) => {
      mockScreenType(screenType);
      const pluginsMock = jest.fn();
      const slidesToScrollMock = jest.fn();
      const alignMock = jest.fn();
      (CarouselMock as any).render = (props: any) => {
        pluginsMock(props.plugins);
        slidesToScrollMock(props.slidesToScroll);
        alignMock(props.align);
        return (<div />);
      };
      return {
        pluginsMock,
        slidesToScrollMock,
        alignMock,
      };
    };

    ['tablet', 'desktop', 'widescreen'].forEach((screenType) => {
      it(`autoplay should be enabled ${screenType} screen`, async () => {
        const { pluginsMock } = prepareMocks(screenType as useScreenType.ScreenType);
        renderSkills([]);
        mockAllIsIntersecting(true);
        expect(pluginsMock).lastCalledWith(expect.arrayContaining([expect.any(Object)]));
      });
    });

    [
      { slidesToScroll: 3, screenType: 'widescreen' },
      { slidesToScroll: 2, screenType: 'tablet' },
      { slidesToScroll: 2, screenType: 'desktop' },
      { slidesToScroll: 1, screenType: 'mobile' },
    ].forEach((testData) => {
      it(`should scroll by ${testData.slidesToScroll} on ${testData.screenType}`, () => {
        const { slidesToScrollMock } = prepareMocks(
          testData.screenType as useScreenType.ScreenType,
        );
        renderSkills([]);

        expect(slidesToScrollMock).lastCalledWith(testData.slidesToScroll);
      });
    });

    it('autoplay should be enabled only in viewport screen', async () => {
      const { pluginsMock } = prepareMocks('desktop');
      renderSkills([]);
      mockAllIsIntersecting(false);
      expect(pluginsMock).lastCalledWith(expect.arrayContaining([]));
    });

    it('autoplay should be disabled mobile screen', async () => {
      const { pluginsMock } = prepareMocks('mobile');
      renderSkills([]);

      mockAllIsIntersecting(true);
      expect(pluginsMock).lastCalledWith([]);
    });

    it('should align to center if there is only 1 slide', () => {
      const { alignMock } = prepareMocks('tablet');
      renderSkills([dummySkill]);

      expect(alignMock).lastCalledWith('center');
    });

    it('should align to start if there is 2 or more slides', () => {
      const { alignMock } = prepareMocks('tablet');
      renderSkills([dummySkill, dummySkill]);

      expect(alignMock).lastCalledWith('start');
    });
  });

  // Carousel itself is 3rd party library, so we shouldn't test it here
});
