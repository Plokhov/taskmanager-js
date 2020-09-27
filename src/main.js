import SiteMenuView from "./view/site-menu.js";

import {generateTask} from "./mock/task.js";

import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import BoardPresenter from "./presenter/board.js";
import {render, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 25;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = document.querySelector(`.main__control`);

render(siteMainControlElement, new SiteMenuView(), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);

filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
