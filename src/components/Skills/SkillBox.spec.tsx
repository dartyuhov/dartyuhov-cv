import {
  render, screen, waitFor,
} from '@testing-library/react';
import {
  setupIntersectionMocking,
  resetIntersectionMocking,
  mockAllIsIntersecting,
} from 'react-intersection-observer/test-utils';

import SkillBox from './SkillBox';

describe('should render skill ifo', () => {
  beforeEach(() => {
    setupIntersectionMocking(jest.fn);
  });

  afterEach(() => {
    resetIntersectionMocking();
  });

  it('should render skill info', () => {
    const skillConfig = {
      name: 'Skill name',
      config: {
        skill1: 100,
      },
    };
    render(<SkillBox skillConfig={skillConfig} />);

    const skillInfo = screen.getByText(skillConfig.name);
    expect(skillInfo).toBeInTheDocument();
  });

  it('should sort skills by percentage', async () => {
    const skillConfig = {
      name: 'name',
      config: {
        skill1: 10,
        skill2: 50,
        skill3: 100,
      },
    };
    render(<SkillBox skillConfig={skillConfig} />);
    mockAllIsIntersecting(true);
    const skills = await screen.findAllByLabelText('Skill knowldege is', { exact: false });
    expect(skills).toHaveLength(3);

    await waitFor(() => {
      expect(skills[0]).toHaveStyle('width: 100%');
      expect(skills[1]).toHaveStyle('width: 50%');
      expect(skills[2]).toHaveStyle('width: 10%');
    });
  });
});
