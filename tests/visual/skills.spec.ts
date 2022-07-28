import test from '../fixtures';
import shouldMatchSnapshot from '../screenshot-utils';

const skills = require('../../src/data/skills.json');

test.describe('Skills', () => {
  skills.forEach((skill, index) => {
    test(`${skill.name} is displayed`, async ({ portfolio }) => {
      await portfolio.header.goTo('Skills');
      await portfolio.skillsCarousel.openSlide(index);
      await shouldMatchSnapshot(portfolio.page);
    });
  });
});
