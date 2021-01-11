import React, {useState} from 'react';
import Select from 'react-select';
import {getRepositories} from '../ajax/github';
import {FormSearchRepos} from '../components/forms/FormSearchRepos';
import {Table} from '../components/Table';
import {Pagination} from '../components/Pagination';
import {isPaginationHidden} from '../utils/pagination';
import {animatedSelect} from '../utils/select';
import { formatDate } from '../utils/date';

export const Main = () => {
  const [date, setDate] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repos, setRepos] = useState([]);
  const [reposFiltered, setReposFiltered] = useState([]);
  const [activePage, setActivePage] = useState(null);
  const [activeRange, setActiveRange] = useState(null);
  const [totalElements, setTotalElements] = useState(0);

  const getStarredRepos = () => {
    const starredRepos = JSON.parse(localStorage.getItem('starredRepos'));
    return starredRepos && starredRepos.length ? starredRepos : [];
  }

  /**
   * Processes the results. Language is not a mandatory field to create a repo. Since the
   * app needs to filter by language, the repositories with no language will have a placeholder
   * instead of an empty string.
   * @param {array} repos The list of repositories
   */
  const processRepos = repos => {
    if(repos && repos.length) {
      return repos
        .map(repo => {
          const {language} = repo;
          if(language && language.length) {
            return repo;
          } else {
            return {
              ...repo,
              language: 'Not set'
            }
          }
        })
        .map(repo => {
          const starredRepos = getStarredRepos();
          if(starredRepos.indexOf(repo.id) === -1) {
            return {
              ...repo,
              isStarred: false
            };
          } else {
            return {
              ...repo,
              isStarred: true
            };
          }
        })
    } else {
      return [];
    }
  }

  const handleFormSearchReposSubmit = async date => {
    setLoadingRepos(true);
    const result = await getRepositories(date, 'stars', 'desc', activePage, activeRange).catch(() => {
      setLoadingRepos(false);
    });
    if(typeof result === 'undefined') {
      setRepos([]);
    } else {
      const {data} = result;
      if(data && data.hasOwnProperty('items')) {
        const repos = processRepos(data.items);
        setRepos(repos);
        setTotalElements(data.total_count);
      } else {
        setRepos([]);
      }
    }
    setLoadingRepos(false);
    setSubmitted(true);
  }

  const handlePaginationChange = async(date, page, per_page) => {
    setLoadingRepos(true);
    const result = await getRepositories(date, 'stars', 'desc', page, per_page).catch(error => {
      setLoadingRepos(false);
    });
    if(typeof result === 'undefined') {
      setRepos([]);
    } else {
      const repos = processRepos(result.data.items);
      const totalElements = result.data.total_count;
      setRepos(repos);
      setDate(date);
      setTotalElements(totalElements);
    }
    setLoadingRepos(false);
  }

  const handleRangeChange = range => {
    if(range === null) {
      setActiveRange(null);
      setActivePage(null);
      handleFormSearchReposSubmit(date);
    } else {
      const {value} = range;
      setActiveRange(parseInt(value));
      setActivePage(1);
      handlePaginationChange(date, 1, parseInt(value));
    }
  }

  const handlePageChange = page => {
    setActivePage(parseInt(page));
    handlePaginationChange(date, parseInt(page), activeRange);
  }

  const handleFilterChange = options => {
    if(options && options.length) {
      const filter = options.map(option => option.value);
      const reposFiltered = repos.filter(repo => filter.includes(repo.language));
      setReposFiltered(reposFiltered);
    } else {
      setReposFiltered([]);
    }
  }

  const setStarredStatus = (starredRepos, repoId, isStarred) => {
    if(reposFiltered && reposFiltered.length) {
      const newReposFiltered = reposFiltered.map(repo => {
        if(repo.id === repoId) {
          return {
            ...repo,
            isStarred
          };
        } else {
          return repo;
        }
      });
      setReposFiltered(newReposFiltered);
    }
    const newRepos = repos.map(repo => {
      if(repo.id === repoId) {
        return {
          ...repo,
          isStarred
        };
      } else {
        return repo;
      }
    });
    setRepos(newRepos);

    localStorage.setItem('starredRepos', JSON.stringify(starredRepos));
  }

  const handleStarChange = id => {
    const starredRepos = getStarredRepos();
    const foundIndex = starredRepos.indexOf(id);
    if(foundIndex === -1) {
      const newStarredRepos = [...starredRepos, id];
      setStarredStatus(newStarredRepos, id, true);
    } else {
      const newStarredRepos = starredRepos.filter(repoId => repoId !== id);
      setStarredStatus(newStarredRepos, id, false);
    }
  }

  /**
   * Utility functions
   */

  const getReposLanguageFilterOptions = repos => {
    return repos.map(repo => {
      return {
        value: repo.language,
        label: repo.language
      };
    }) // remove duplicates
    .reduce((unique, item) => {
      if(unique.find(el => el.label === item.label)) {
        return unique;
      } else {
        return unique.concat([item]);
      }
    }, []);
  }

  /**
   * Render functions
   */

  const getReposTableHeader = () => {
    return [
      {
        label: 'Actions',
        name: 'actions',
        transform: ({id, isStarred}) => {
          const iconTitle = isStarred ? 'Click to unstar repo' : 'Click to star repo';
          const iconClassName = isStarred ? 'fa fa-star' : 'fa fa-star-o';
          return <i className={iconClassName} title={iconTitle} onClick={() => handleStarChange(id)} />
        }
      },
      {
        label: 'Stars',
        name: 'stargazers_count'
      },
      {
        label: 'Repository',
        name: 'name',
        transform: ({html_url, name}) => {
          if(html_url) {
            return (
              <a
                href={html_url}
                target="_blank"
              >
                {name}&nbsp;
                <i className="fa fa-external-link" aria-hidden="true" title="Go to repository homepage"/>
              </a>
            );
          } else {
            return name;
          }
        }
      },
      {
        label: 'Language',
        name: 'language'
      },
      {
        label: 'Date Created',
        name: 'created_at'
      }
    ]
  }

  const getReposTableRows = (repos, reposFiltered) => {
    if(reposFiltered && reposFiltered.length) {
      return reposFiltered;
    } else {
      return repos;
    }
  }

  const renderActionControls = repos => {
    if(repos && repos.length) {
      const filterOptions = getReposLanguageFilterOptions(repos);
      return (
        <div className="clearfix">
          <div className="span span-4">
            <Select
              closeMenuOnSelect={true}
              components={animatedSelect}
              isMulti
              options={filterOptions}
              placeholder="Filter by programming language"
              onChange={handleFilterChange}
              className="Select"
            />
          </div>
        </div>
      );
    } else {
      return '';
    }
  }

  const renderPagination = (activePage, activeRange, totalElements) => {
    const page = activePage === null ? 0 : activePage;
    const range = activeRange === null ? 0 : activeRange;
    const totalItemsCount = activeRange === null ? -1 : totalElements;
    return (
      <Pagination
        onPageChange={handlePageChange}
        onRangeChange={handleRangeChange}
        totalItemsCount={totalItemsCount}
        activePage={page}
        activeRange={range}
        isPaginationHidden={isPaginationHidden(totalItemsCount, range)}
      />
    );
  }

  const renderRepos = (submitted, repos, reposFiltered, activePage, activeRange, totalElements) => {
    if(repos && repos.length) {
      const header = getReposTableHeader();
      const rows = getReposTableRows(repos, reposFiltered);
      return (
        <div>
          {renderActionControls(repos)}
          <Table header={header} rows={rows} />
          {renderPagination(activePage, activeRange, totalElements)}
        </div>
      )
    } else if(submitted) {
      return <p>No results found</p>
    } else {
      return '';
    }
  }

  return (
    <div className="Main">
      <h2 className="text-center">GitHub Client</h2>
      <FormSearchRepos
        onSubmit={handleFormSearchReposSubmit}
        loading={loadingRepos}
        startDate={date}
      />
      <div className="Repos">
        {renderRepos(submitted, repos, reposFiltered, activePage, activeRange, totalElements)}
      </div>
    </div>
  );
}