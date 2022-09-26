import { render, screen,getByText } from '@testing-library/react';
import React from 'react';
import Home from './Home';

test("Home section",()=>{
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
        render(<Home isDrawerOpen={false} closeDrawer={jest.fn()}/>)
    // screen.debug();
      const text = screen.queryByText("Service Providers").innerHTML
       expect(text).toBe("Service Providers")
})