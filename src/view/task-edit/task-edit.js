import {COLORS} from "../../const.js";
import {isTaskExpired, isTaskRepeating} from "../../utils/task.js";
import Abstract from "../abstract.js";
import TaskEditDate from "./date.js";
import TaskEditRepeating from "./repeating.js";
import TaskEditColors from "./colors.js";

const BLANK_TASK = {
  color: COLORS[0],
  description: ``,
  dueDate: null,
  repeating: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  },
  isArchive: false,
  isFavorite: false
};

export default class TaskEditView extends Abstract {
  constructor(task) {
    super();
    this._task = task || BLANK_TASK;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    const {
      color,
      description,
      dueDate,
      repeating,
    } = this._task;

    const deadlineClassName = isTaskExpired(dueDate)
      ? `card--deadline`
      : ``;

    const repeatingClassName = isTaskRepeating(repeating)
      ? `card--repeat`
      : ``;

    const dateTemplate = new TaskEditDate(dueDate).getTemplate();
    const repeatingTemplate = new TaskEditRepeating(repeating).getTemplate();
    const colorsTemplate = new TaskEditColors(color).getTemplate();

    return (
      `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  ${dateTemplate}
                  ${repeatingTemplate}
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${colorsTemplate}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}
