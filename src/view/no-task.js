import Abstract from "./abstract.js";

export default class NoTaskView extends Abstract {
  getTemplate() {
    return (
      `<p class="board__no-tasks">
        Click «ADD NEW TASK» in menu to create your first task
      </p>`
    );
  }
}
