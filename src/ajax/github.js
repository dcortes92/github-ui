import axios from 'axios';
import {API_URL, ENDPOINTS} from '../utils/api';
import {formatDate} from '../utils/date';

/**
 * Gets a list of trendy repositories created before a specific date.
 * @param {object} date The limit date to retrieve repositories
 * @param {string} sort The sort method e.g. `stars`
 * @param {string} order The order method e.g. `asc` or `desc`
 */
export const getRepositories = (date, sort, order='desc', page=1, per_page=20) => {
  let params = {};
  if(date) {
    const dateWithFormat = formatDate(date);
    params = { q: 'created:>' + dateWithFormat, sort, order };
  } else {
    params = { sort, order };
  }

  if(typeof page === 'number' && typeof per_page === 'number') {
    params = { ...params, page, per_page };
  }
  return axios.get(API_URL + ENDPOINTS.SEARCH_REPOS, {params});
}