import {describe} from 'riteway';
import {isPaginationHidden} from '../../../src/utils/pagination';

describe('pagination util tests', async assert => {
  {
    const totalItemsCount = 10;
    const activeRange = 5;
    const actual = isPaginationHidden(totalItemsCount, activeRange);
    const expected = false;

    assert({
      given: 'total items greater than range',
      should: 'display pagination controls',
      actual,
      expected
    });
  }

  {
    const totalItemsCount = 5;
    const activeRange = 10;
    const actual = isPaginationHidden(totalItemsCount, activeRange);
    const expected = true;

    assert({
      given: 'total items lesser than range',
      should: 'hide pagination controls',
      actual,
      expected
    });
  }
});