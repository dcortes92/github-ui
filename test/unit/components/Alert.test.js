import React from 'react';
import render from 'riteway/render-component';
import {describe} from 'riteway';
import {Alert} from '../../../src/components/Alert';

describe('Alert component tests', async assert => {
  {
    const $ = render(<Alert />);
    const actual = $('.Alert-message').html().trim();
    const expected = '';
    assert({
      given: 'Alert component with no props',
      should: 'render empty component',
      actual,
      expected
    })
  }

  {
    const $ = render(<Alert message="hello world!" />);
    const actual = $('.Alert-message').html().trim();
    const expected = 'hello world!';
    assert({
      given: 'Alert component with message prop',
      should: 'render component with message',
      actual,
      expected
    })
  }
});