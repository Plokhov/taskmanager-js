export default class FilterItem {
  constructor(filter, isChecked) {
    this._filter = filter;
    this._isChecked = isChecked;
  }

  getTemplate() {
    const {name, count} = this._filter;

    return (
      `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${this._isChecked ? `checked` : ``}
        ${count === 0 ? `disabled` : ``}
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
