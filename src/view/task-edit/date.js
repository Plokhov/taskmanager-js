import {humanizeTaskDueDate} from "../../utils/task.js";

export default class TaskEditDate {
  constructor(dueDate, isDueDate) {
    this._dueDate = dueDate;
    this._isDueDate = isDueDate;
  }

  getTemplate() {
    return (
      `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${this._isDueDate ? `yes` : `no`}</span>
      </button>
      ${this._isDueDate ? `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${this._dueDate !== null ? humanizeTaskDueDate(this._dueDate) : ``}"
          />
        </label>
      </fieldset>` : ``}`
    );
  }
}
