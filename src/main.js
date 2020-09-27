import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";

import {generateTask} from "./mock/task.js";

import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";

import FilterPresenter from "./presenter/filter.js";
import BoardPresenter from "./presenter/board.js";

import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";

const TASK_COUNT = 25;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = document.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenuView();
render(siteMainControlElement, siteMenuComponent, RenderPosition.BEFOREEND);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      remove(statisticsComponent);
      boardPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

const handleTaskNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.setMenuItem(MenuItem.TASKS);
};

const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);

filterPresenter.init();
boardPresenter.init();
