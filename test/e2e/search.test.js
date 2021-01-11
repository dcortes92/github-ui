import {describe} from 'riteway';
import {E2E_URL} from './fixtures/url';
import Nightmare from 'nightmare';

describe('Search and Branches e2e tests', async assert => {
  const show = true;
  {
    const nightmare = Nightmare({show, });
    nightmare
      .goto(E2E_URL)
      .click('.react-datepicker__input-container input')
      .wait(500)
      .click('.react-datepicker__day')
      .wait(500)
      .click('.FormSearchRepos button[type="submit"]')
      .wait('.Table')
      .evaluate(() => document.querySelector('.Table #name').innerText)
      .end()
      .then(content => {
        assert({
          given: 'a search with valid data and results',
          should: 'display the results',
          actual: content,
          expected: 'REPOSITORY'
        });
      });
  }
  
  {
    const nightmare = Nightmare({show});
    nightmare
      .goto(E2E_URL)
      .type('.FormSearchRepos input[type="text"]', 'ashfkjashfkasdf')
      .wait(500)
      .click('.FormSearchRepos button[type="submit"]')
      .wait('.Repos p')
      .evaluate(() => document.querySelector('.Repos p').innerText)
      .end()
      .then(content => {
        assert({
          given: 'a search with valid data and no results',
          should: 'display a message',
          actual: content,
          expected: 'No results found'
        });
      });
  }

  {
    const nightmare = Nightmare({show, });
    nightmare
      .goto(E2E_URL)
      .click('.react-datepicker__input-container input')
      .wait(500)
      .click('.react-datepicker__day')
      .wait(500)
      .click('.FormSearchRepos button[type="submit"]')
      .wait('.Table')
      .click('Table .fa.fa-star-o')
      .evaluate(() => document.querySelector('.Table .fa.fa-star').title)
      .end()
      .then(content => {
        assert({
          given: 'a search with valid data and results and star a repo',
          should: 'mark the repo as favorite and display updated icon',
          actual: content,
          expected: 'Click to unstar repo'
        });
      });
  }
});