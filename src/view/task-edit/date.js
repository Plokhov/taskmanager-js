import {humanizeTaskDueDate} from "../../utils.js";

export default class TaskEditDate {
  constructor(dueDate) {
    this._dueDate = dueDate;
  }

  getTemplate() {
    return (
      `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${this._dueDate !== null ? `yes` : `no`}</span>
      </button>
      ${this._dueDate !== null ? `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${humanizeTaskDueDate(this._dueDate)}"
          />
        </label>
      </fieldset>` : ``}`
    );
  }
}
