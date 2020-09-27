export default class FilterItem {
  constructor(filter, currentFilterType) {
    this._filter = filter;
    this._currentFilterType = currentFilterType;
  }

  getTemplate() {
    const {type, name, count} = this._filter;

    return (
      `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${type === this._currentFilterType ? `checked` : ``}
        ${count === 0 ? `disabled` : ``}
        value="${type}"
      />
      <label for="filter__${name}" class="filter__label">
        ${name}
        <span class="filter__${name}-count">
          ${count}
        </span>
      </label>`
    );
  }
}
