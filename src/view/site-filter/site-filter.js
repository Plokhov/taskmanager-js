import Abstract from "../abstract.js";
import FilterItem from "./filter-item.js";

export default class SiteFilterView extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<section class="main__filter filter container">
        ${this._filters
          .map((filter) => new FilterItem(filter, this._currentFilterType).getTemplate())
          .join(``)
      }
      </section>`
    );
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
