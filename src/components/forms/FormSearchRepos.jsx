import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

export const FormSearchRepos = props => {
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = event => {
    event.preventDefault();
    const {onSubmit} = props;
    if(startDate) {
      onSubmit(startDate)
    }
  }

  const {loading} = props;

  return (
    <form onSubmit={handleSubmit} className="Form FormSearchRepos">
      <h4>Popular Repositores</h4>
      <label>
        Date:&nbsp;
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </label>
      <button type="submit" disabled={startDate === null}>
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
  startDate: PropTypes.object,
  loading: PropTypes.bool
}