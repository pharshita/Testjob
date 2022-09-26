import { render, screen,getByText } from '@testing-library/react';

import Hero_Section from './Hero_Section';

test("Hero_Section",()=>{
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // deprecated
          removeListener: jest.fn(), // deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn()
        }))
      })
   
      render(<Hero_Section isDrawerOpen={false} closeDrawer={jest.fn()}/>)
    screen.debug();
})