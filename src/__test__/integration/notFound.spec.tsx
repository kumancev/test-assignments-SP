import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import NotFound from '../../pages/NotFound/NotFound';

let documentBody: RenderResult;

// describe('<NotFound />', () => {
//   beforeEach(() => {
//     documentBody = render(<NotFound />);
//   });

//   it('shows not found message', () => {
//     expect(documentBody.getByText('Not Found')).toBeInTheDocument();
//   })
// })

// Snapshot Test for fixed text 
describe('<NotFound />', () => {
  beforeEach(() => {
    documentBody = render(<NotFound />);
  });

  it('matches snapshot', () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
})