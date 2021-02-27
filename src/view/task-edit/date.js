import {formatTaskDueDate} from "../../utils/task.js";

export default class TaskEditDate {
  constructor(dueDate, isDueDate, isDisabled) {
    this._dueDate = dueDate;
    this._isDueDate = isDueDate;
    this._isDisabled = isDisabled;
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
            value="${formatTaskDueDate(this._dueDate)}"
            ${this._isDisabled ? `disabled` : ``}
          />
        </label>
      </fieldset>` : ``}`
    );
  }
}
