import React from 'react';
import enzyme from '../fixtures/enzyme';
import {describe} from 'riteway';
import {createDOM} from '../fixtures/fake-dom';
import {Pagination} from '../../../src/components/Pagination';

describe('Pagination component tests', async assert => {
  /* Disable warnings */
  const warnings = console.error;
  console.error = () => {};

  const document = createDOM();
  const onPageChange = page => {
    assert({
      given: 'a page change',
      should: 'call the `onPageChange` handler',
      actual: page,
      expected: 2
    });
  }
  const onRangeChange = range => {
    assert({
      given: 'a range change',
      should: 'call the `onRangeChange` handler',
      actual: range,
      expected: 100
    });
  }
  const $ = enzyme.mount(
    <Pagination
      onPageChange={() => onPageChange(2)}
      onRangeChange={() => onRangeChange(100)}
      totalItemsCount={50}
      activePage={1}
      activeRange={10}
    />,
    {attachTo: document.getElementById('root')}
  );
  const actual = $.find('.Pagination').length;
  const expected = 1;
  assert({
    given: 'valid props',
    should: 'render the pagination elements',
    actual,
    expected
  });
  const pageControl = $.find('.Pagination-items li.active');
  pageControl.simulate('click');

  const rangeControl = $.find('.Pagination__input input');
  rangeControl.simulate("keyDown", { key: "ArrowDown", keyCode: 40 });
  rangeControl.simulate("keyDown", { key: "Enter", keyCode: 13 });
  $.detach();

  /* Restore warnings */
  console.error = warnings;
});