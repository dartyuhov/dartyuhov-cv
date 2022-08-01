import test from '../fixtures';
import { shouldMatchElementSnapshot } from '../screenshot-utils';

const skills = require('../../src/data/skills.json');

test.describe('Skills', () => {
  skills.forEach((skill) => {
    test(`${skill.name} is displayed`, async ({ portfolio }) => {
      await portfolio.header.goTo('Skills');
      const slide = portfolio.skillsCarousel.getSlideByName(skill.name);
      await slide.scrollIntoViewIfNeeded();
      await portfolio.page.waitForTimeout(1000);
      await shouldMatchElementSnapshot(slide);
    });
  });
});
