import Abstract from "../abstract.js";
import FilterItem from "./filter-item.js";

export default class SiteFilterView extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
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
}
