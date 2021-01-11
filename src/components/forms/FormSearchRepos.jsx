import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

export const FormSearchRepos = props => {
  const handleSubmit = event => {
    event.preventDefault();
    const {onSubmit} = props;
    if(selectedDate) {
      onSubmit(selectedDate)
    }
  }

  const {loading, selectedDate, onDateChange} = props;

  return (
    <form onSubmit={handleSubmit} className="Form FormSearchRepos">
      <h4>Popular Repositores</h4>
      <label>
        Date:&nbsp;
        <DatePicker selected={selectedDate} onChange={onDateChange} />
      </label>
      <button type="submit" disabled={selectedDate === null}>
        {loading ? (
          <span>
            <i className="fa fa-spinner fa-spin" aria-hidden="true" title="Getting repositories"></i>
          </span>
        ) : (
          <span>Search</span>
        )}
      </button>
    </form>
  )
}

FormSearchRepos.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.object,
  loading: PropTypes.bool
}