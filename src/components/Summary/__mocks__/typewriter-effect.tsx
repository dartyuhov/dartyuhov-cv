/* eslint-disable no-unused-vars */
import React from 'react';
import Typewriter, { TypewriterClass } from 'typewriter-effect';

const mocked: React.FC<{
  onInit: (typewriter: TypewriterClass) => void, options: any
}> = ({ onInit, options }) => {
  const mockOnInit = jest.fn().mockImplementation((typewriter: TypewriterClass) => {
    onInit({
      ...typewriter,
      pauseFor: jest.fn().mockImplementation((ms: number) => typewriter),
      deleteAll: jest.fn().mockImplementation((ms: number) => typewriter.deleteAll(0)),
    } as any as TypewriterClass);
  });
  return (
    <Typewriter
      onInit={mockOnInit}
      options={{
        ...options,
        delay: 0,
        deleteSpeed: 0,
      }}
    />
  );
};

export default mocked;
