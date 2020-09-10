import {isTaskRepeating} from "../../utils";

export default class TaskEditRepeating {
  constructor(repeating) {
    this._repeating = repeating;
  }

  getTemplate() {
    return (
      `<button class="card__repeat-toggle" type="button">
        repeat:
        <span class="card__repeat-status">
          ${isTaskRepeating(this._repeating) ? `yes` : `no`}
        </span>
      </button>
      ${isTaskRepeating(this._repeating) ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${Object.entries(this._repeating).map(([day, repeat]) => `<input
            class="visually-hidden card__repeat-day-input"
            type="checkbox"
            id="repeat-${day}"
            name="repeat"
            value="${day}"
            ${repeat ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${day}"
            >${day}</label
          >`).join(``)}
        </div>
      </fieldset>` : ``}`
    );
  }
}
