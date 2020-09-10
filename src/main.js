import SiteMenu from "./view/site-menu.js";
import Filter from "./view/site-filter/site-filter.js";
import Board from "./view/board.js";
import BoardSort from "./view/board-sort.js";
import NoTask from "./view/no-tasks.js";
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

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent
    .getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEditComponent
    .getElement()
    .querySelector(`form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new Board();
  const noTaskComponent = new NoTask();
  const boardSortComponent = new BoardSort();
  const taskListComponent = new TaskList();

  render(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);

  if (tasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), noTaskComponent.getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), boardSortComponent.getElement(), RenderPosition.BEFOREEND);
  render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

  boardTasks
  .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
  .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButton();
    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardTasks
          .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
          .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= tasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }

};

const TASK_COUNT = 25;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = document.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenu();
render(siteMainControlElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);

const filterComponent = new Filter(filters);
render(siteMainElement, filterComponent.getElement(), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, tasks);
