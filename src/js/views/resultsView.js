import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe for your query. Please try something else.';
  _message = '';
  
  _generateMarkup() {
    return this._data.map((el)=>{
        return `
        <li class="preview">
          <a class="preview__link" href="#${el.id}">
            <figure class="preview__fig">
              <img src="${el.image}" alt="Test" crossorigin/>
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${el.title}</h4>
              <p class="preview__publisher">${el.publisher}</p>
            </div>
          </a>
        </li>
        `;
    }).join("") 
  }
}

export default new ResultsView();
