import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Spoiler from './Spoiler';

jest.mock('@mantine/hooks', () => ({
  __esModule: true,
  useElementSize: () => ({
    ref: jest.requireActual('react').createRef(), height: 100, width: 100,
  }),
}));

describe('Spoiler element', () => {
  it('should be defined', () => {
    render(<Spoiler maxHeight={100} onExpandClickDecorator={jest.fn}><div data-testid="test" /></Spoiler>);
    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('should expand on click', async () => {
    const text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deserunt iusto laudantium omnis ex illo exercitationem odio nulla culpa maxime commodi, nam laborum vero praesentium voluptatem sit sunt reiciendis eaque.';
    render(<Spoiler maxHeight={100} onExpandClickDecorator={jest.fn}><div data-testid="test">{text}</div></Spoiler>);
    expect(screen.getByTestId('test')).toBeDefined();
    expect(screen.getByText(text)).toBeInTheDocument();
    const expandButton = await screen.getByRole('button', { name: 'Show more' });
    userEvent.click(expandButton);
    expect(expandButton).toHaveTextContent('Hide');
  });

  it('should call onExpandClickDecorator on click', async () => {
    const mock = jest.fn();
    render(<Spoiler maxHeight={100} onExpandClickDecorator={mock}><div data-testid="test">text</div></Spoiler>);

    const expandButton = await screen.getByRole('button', { name: 'Show more' });
    userEvent.click(expandButton);
    expect(mock).toBeCalledTimes(1);
  });

  it('should not render show more button if height is less then max height prop', async () => {
    const mock = jest.fn();
    render(<Spoiler maxHeight={101} onExpandClickDecorator={mock}><div data-testid="test">text</div></Spoiler>);

    const expandButton = screen.queryByRole('button', { name: 'Show more' });
    expect(expandButton).toBeNull();
  });
});
