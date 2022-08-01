import { Parallax } from '@react-spring/parallax';
import { renderHook, render } from '@testing-library/react';
import useParallax from './useParallax';

describe('useParallax', () => {
  it('should produce parallax ref', () => {
    const { result } = renderHook(() => useParallax());

    expect(result.current.ref).toBeDefined();
    expect(result.current.scrollTo).toBeDefined();
  });

  it('scrollTo should change parallax offset', () => {
    const { result } = renderHook(() => useParallax());
    render(<Parallax ref={result.current.ref} pages={4}><div /></Parallax>);
    result.current.scrollTo(4);
    expect(result.current.ref.current?.offset).toEqual(4);
  });
});
