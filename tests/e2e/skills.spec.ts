import { expect } from '@playwright/test';
import test from '../fixtures';

const skillsData: {
    name: string;
}[] = require('../../src/data/skills.json');

test.describe('My Skills', () => {
  test('should show all skills defined in config', async ({ portfolio }) => {
    await portfolio.header.goTo('Skills');
    const skillNames = await portfolio.skillsCarousel.getAllSkillSlideNames();
    skillsData.forEach((skill) => {
      expect(skillNames).toContain(skill.name);
    });
  });
});
