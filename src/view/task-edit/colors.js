import {COLORS} from "../../const.js";

export default class TaskEditColors {
  constructor(currentColor) {
    this._currentColor = currentColor;
  }

  getTemplate() {
    return (
      COLORS.map((color) => `<input
        type="radio"
        id="color-${color}"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${this._currentColor === color ? `checked` : ``}
      />
      <label
        for="color-${color}"
        class="card__color card__color--${color}"
        >${color}</label
      >`).join(``)
    );
  }
}
