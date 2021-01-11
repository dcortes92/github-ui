import React from 'react';
import enzyme from '../fixtures/enzyme';
import {describe} from 'riteway';
import {createDOM} from '../fixtures/fake-dom';
import {FormSearchRepos} from '../../../src/components/forms/FormSearchRepos';

describe('FormSearchRepos component tests', async assert => {
  {
    const document = createDOM();
    const $ = enzyme.mount(
      <FormSearchRepos onSubmit={() => {}} />,
      {attachTo: document.getElementById('root')}
    );
    const actual = $.find('.FormSearchRepos').length;
    const expected = 1;
    $.detach();
    assert({
      given: 'valid props',
      should: 'render the form',
      actual,
      expected
    });
  }

  {
    const document = createDOM();
    const $ = enzyme.mount(
      <FormSearchRepos onSubmit={() => {}} loading={true}/>,
      {attachTo: document.getElementById('root')}
    );
    const actual = $.find('.fa.fa-spinner').length;
    const expected = 1;
    $.detach();
    assert({
      given: 'loading prop',
      should: 'render the spinner',
      actual,
      expected
    });
  }

  {
    const document = createDOM();
    const $ = enzyme.mount(
      <FormSearchRepos onSubmit={() => {}} />,
      {attachTo: document.getElementById('root')}
    );

    $.find('.react-datepicker__input-container input').simulate('change', {target: {value: ''}});
    $.find('form').simulate('submit');
    const actual = $.find('button[type="submit"]').getDOMNode().disabled;
    const expected = true;
    $.detach();
    assert({
      given: 'a form submission with empty data',
      should: 'do nothing and disable submit button',
      actual,
      expected
    });
  }

  {
    const document = createDOM();
    const onSubmit = data => {
      assert({
        given: 'a form submission',
        should: 'send the data to `onSubmit` handler',
        actual: data,
        expected: 'submitted'
      })
    };
    const $ = enzyme.mount(
      <FormSearchRepos onSubmit={() => onSubmit('submitted')} />,
      {attachTo: document.getElementById('root')}
    );
    $.find('form').simulate('submit');
    $.detach();
  }
});