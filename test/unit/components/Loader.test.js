import React from 'react';
import render from 'riteway/render-component';
import {describe} from 'riteway';
import {Loader} from '../../../src/components/Loader';

describe('Loader component tests', async assert => {
  {
    const $ = render(<Loader />);
    const actual = $('.Loader-message').length
    const expected = 0;
    assert({
      given: 'Loader component with no props',
      should: 'render empty component',
      actual,
      expected
    })
  }

  {
    const $ = render(<Loader message="Geting data" />);
    const actual = $('.Loader-message').html().trim();
    const expected = 'Geting data';
    assert({
      given: 'Loader component with message prop',
      should: 'render component with message',
      actual,
      expected
    })
  }
});