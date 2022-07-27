import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Globals } from 'react-spring';

Globals.assign({
  skipAnimation: true,
});
