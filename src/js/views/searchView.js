class SearchView {
  _parentElement = document.querySelector('.search');
  _searchField = document.querySelector('.search__field')
  getQuery() {
    return this._searchField.value;
  }

  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
      this._clear();
    });
  }

  _clear(){
    this._searchField.value = ''
  }
}

export default new SearchView();
