"use strict";

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");
const TVMAZE_BASE_URL = "http://api.tvmaze.com/";
const SEARCH_HEADER = 'search/';
const SHOWS_HEADER = 'shows';


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */


async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  let response = await axios.get(`${TVMAZE_BASE_URL}` + `${SEARCH_HEADER}` +
    `${SHOWS_HEADER}`, { params: { q: term } });

  let responseData = response.data;

  // Update response data to only include required info (map/loop/w/e)
  return responseData;
}


/** Given list of shows, create markup for each and to DOM
 * Iterates through array of shows in the response JSON, updates the DOM w/
 * requested information.
*/

function populateShows(shows) {
  $showsList.empty();
  let imageSrc = '';

  console.log('Populate shows called, arrays = ' + shows);
  for (let show of shows) {
    if (show.show.image === null) {
      imageSrc = 'https://tinyurl.com/tv-missing';
    } else {
      imageSrc = show.show.image.original;
    }
    console.log(imageSrc)
    const $show = $(
      `<div data-show-id="${show.show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${imageSrc}"
              alt="PLACEHOLDER"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.show.name}</h5>
             <div><small>${show.show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
