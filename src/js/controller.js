import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

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

    //Update to active class
    resultsView.update(model.getSearchResultsPage());

    //Bookmarks
    bookmarksView.update(model.state.bookmark);

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
    resultsView.render(model.getSearchResultsPage(1));
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

const controlServings = function (numberOfServings) {
  model.updateServings(numberOfServings);

  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmarks = function () {
  if (model.state.recipe.bookmarked) {
    model.removeBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmark);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (e) {
    console.error(e);
    addRecipeView.renderError(e.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.renderMessage();
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
