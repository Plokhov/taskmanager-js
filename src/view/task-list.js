import Abstract from "./abstract.js";

export default class TaskListView extends Abstract {
  getTemplate() {
    return (
      `<div class="board__tasks">
      </div>`
    );
  }
}
