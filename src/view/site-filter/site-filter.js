import FilterItem from "./filter-item.js";
import {createElement} from "../../utils.js";

export default class SiteFilter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="main__filter filter container">
        ${this._filters
          .map((filter, index) => new FilterItem(filter, index === 0).getTemplate())
          .join(``)
      }
      </section>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
