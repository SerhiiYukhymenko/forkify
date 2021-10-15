import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////

// if(module.hot) {
//   module.hot.accept();
// };

async function controlRecipes() {
  try {
    //Hash check
    const id = window.location.hash.slice(1);
    if (!id) return;

    ///Loading Spinner
    recipeView.renderSpinner();

    //Loading recipe
    await model.loadRecipe(id);

    //Rendering
    recipeView.render(model.state.recipe);
  } catch (e) {
    recipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
    //Get Query from search input
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    //Load search results
    await model.loadSearchResult(query);
    //Render results
    resultsView.render(model.getSearchResultsPage());
    //Render page arrows
    paginationView.render(model.state.search);
  } catch (e) {
    console.warn(e);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function () {
  
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addSearchHandler(controlSearchResults);
  recipeView.renderMessage();
  paginationView.addHandlerClick(controlPagination);
};
init();
