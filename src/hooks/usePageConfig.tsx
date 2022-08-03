import { useEffect, useState } from 'react';
import {
  useViewportSize, useElementSize, useDebouncedValue,
} from '@mantine/hooks';

const defaultPageConfig = {
  pageCount: 6,
  summary: {
    start: 0,
    end: 1,
    speed: 0.5,
  },
  skills: {
    start: 1,
    end: 2,
    speed: 0.2,
  },
  projects: {
    start: 2,
    end: 4.5,
    speed: 0.1,
  },
  contactMe: {
    start: 5.3,
    end: 6,
    speed: 0.5,
  },
  footer: {
    start: 7,
    end: 7.3,
  },
  factor: 1,
};

const usePageConfig = () => {
  const { height: viewportHeight } = useViewportSize();
  const { ref: projectsSectionRef, height: projectsHeight } = useElementSize();
  const [pageConfig, setPageConfig] = useState(defaultPageConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedPageConfig] = useDebouncedValue(pageConfig, 100);

  useEffect(() => {
    setIsLoading(true);
    // trigger resize event once component mounted to get correct height
    window.dispatchEvent(new Event('resize'));
    if (projectsHeight > 0) {
      // calculater actual parallax offsets based on projects height
      const projectsEnd = +((projectsHeight / viewportHeight) + 2).toFixed(0);
      setPageConfig({
        ...pageConfig,
        pageCount: projectsEnd + 1.3,
        projects: {
          ...pageConfig.projects,
          end: projectsEnd,
        },
        contactMe: {
          ...pageConfig.contactMe,
          start: projectsEnd,
          end: projectsEnd + 1,
        },
        footer: {
          ...pageConfig.footer,
          start: projectsEnd + 1.1,
          end: projectsEnd + 1.3,
        },
      });
      setTimeout(() => setIsLoading(false), 700);
    }
  }, [projectsHeight]);

  return {
    projectsSectionRef,
    pagesConfig: debouncedPageConfig,
    isLoading,
  };
};

export default usePageConfig;
