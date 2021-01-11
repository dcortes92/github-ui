import React from 'react';
import render from 'riteway/render-component';
import {describe} from 'riteway';
import {Table} from '../../../src/components/Table';

describe('Table component tests', async assert => {
  const header = [
    {label: 'Organization', name: 'organization'},
    {label: 'Country', name: 'country'}
  ];
  const rows = [
    {organization: 'Payworks', country: 'GER'},
    {organization: 'GitHub', country: 'US'}
  ];
  const $ = render(<Table header={header} rows={rows} />);

  let actual = $('.Table .Table-header .Table-row .Table-cell').length;
  let expected = 2;
  assert({
    given: 'a Table with valid props',
    should: 'render the Table with header',
    actual,
    expected
  });

  actual = $('.Table .Table-header .Table-row #organization').html().trim();
  expected = header[0].label;
  assert({
    given: 'a Table with valid props',
    should: 'render the Table with header value',
    actual,
    expected
  });

  actual = $('.Table .Table-body .Table-row').length;
  expected = 2;
  assert({
    given: 'a Table with valid props',
    should: 'render the Table with body',
    actual,
    expected
  });

  actual = $('.Table .Table-body .Table-row:first-child #organization').html().trim();
  expected = rows[0].organization;
  assert({
    given: 'a Table with valid props',
    should: 'render the Table with body value',
    actual,
    expected
  });
});