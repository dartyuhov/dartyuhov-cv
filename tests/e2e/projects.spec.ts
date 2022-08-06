import { expect } from '@playwright/test';
import test from '../fixtures';

const projectsData: {
    name: string;
}[] = require('../../src/data/projects.json');

test.describe('My Projects', () => {
  test('should show all projects defined in config', async ({ portfolio }) => {
    await portfolio.header.goTo('My Projects');
    const projectNames = await portfolio.myProjects.getAllProjectNames();
    projectsData.forEach((project) => {
      expect(projectNames).toContain(project.name);
    });
  });
});
