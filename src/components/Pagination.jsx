import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import {default as ReactPagination} from 'react-js-pagination';
import {PAGINATION_OPTIONS} from '../utils/select';

export class Pagination extends React.PureComponent {
  render() {
    const {
      onPageChange,
      onRangeChange,
      totalItemsCount,
      activePage,
      activeRange,
      pageRangeDisplayed,
      isPaginationHidden
    } = this.props;
    
    return(
      <div className="Pagination">
        <div className="Pagination-range">
          <CreatableSelect
            isClearable
            onChange={onRangeChange}
            formatCreateLabel={range => 'Custom Range: ' + range}
            options={PAGINATION_OPTIONS}
            placeholder="Items per page"
            className="Select"
            classNamePrefix="Pagination"
          />
        </div>
        <div className="Pagination-items">
          {!isPaginationHidden && (
            <ReactPagination
              totalItemsCount={totalItemsCount}
              activePage={activePage}
              itemsCountPerPage={activeRange}
              pageRangeDisplayed={pageRangeDisplayed}
              onChange={onPageChange}
            />
          )}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  onRangeChange: PropTypes.func.isRequired,
  totalItemsCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  activeRange: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number,
  isPaginationHidden: PropTypes.bool
}

Pagination.defaultProps = {
  pageRangeDisplayed: 5,
  isPaginationHidden: false
}