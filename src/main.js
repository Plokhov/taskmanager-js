import SiteMenu from "./view/site-menu.js";
import Filter from "./view/site-filter/site-filter.js";
import Board from "./view/board.js";
import BoardSort from "./view/board-sort.js";
import TaskList from "./view/tast-list.js";
import Task from "./view/task.js";
import TaskEdit from "./view/task-edit/task-edit.js";
import LoadMoreButton from "./view/load-more.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

import {render, RenderPosition} from "./utils.js";

const renderTask = (taskListElement, task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);

  const replaceCardToForm = () => {
    taskListElement
      .replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement
      .replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  taskComponent
    .getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      replaceCardToForm();
    });

  taskEditComponent
    .getElement()
    .querySelector(`form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToCard();
    });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const TASK_COUNT = 9;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = document.querySelector(`.main__control`);

render(siteMainControlElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new Board().getElement(), RenderPosition.BEFOREEND);

const siteBoardElement = document.querySelector(`.board`);

render(siteBoardElement, new BoardSort().getElement(), RenderPosition.BEFOREEND);
render(siteBoardElement, new TaskList().getElement(), RenderPosition.BEFOREEND);

const siteTasksListElement = document.querySelector(`.board__tasks`);

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTask(siteTasksListElement, tasks[i]);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(siteBoardElement, new LoadMoreButton().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => renderTask(siteTasksListElement, task));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}


