import {describe, Try} from 'riteway';
import {formatDate} from '../../../src/utils/date';

describe('Date util tests', async assert => {
  {
    const invalidDate = undefined;
    const actual = Try(formatDate, invalidDate).toString();
    const expected = 'TypeError: Not a valid date';

    assert({
      given: 'an invalid date',
      should: 'throw an exception',
      actual,
      expected
    });
  }

  {
    const today = new Date();
    const actual = typeof formatDate(today) === 'string';
    const expected = true;

    assert({
      given: 'a valid date',
      should: 'format the date',
      actual,
      expected
    });
  }

  {
    const date = new Date('Sun May 11,2014');
    const actual = formatDate(date);
    const expected = '2014-05-11';

    assert({
      given: 'a valid date with constructor',
      should: 'format the date',
      actual,
      expected
    });
  }
});