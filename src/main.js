import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createSiteBoardTemplate} from "./view/board.js";
import {createBoardSortTemplate} from "./view/board-sort.js";
import {createTasksListTemplate} from "./view/tast-list.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/load-more.js";

const TASK_COUNT = 12;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = document.querySelector(`.main__control`);

render(siteMainControlElement, createSiteMenuTemplate(), `beforeend`);

render(siteMainElement, createSiteFilterTemplate(), `beforeend`);

render(siteMainElement, createSiteBoardTemplate(), `beforeend`);

const siteBoardElement = document.querySelector(`.board`);

render(siteBoardElement, createBoardSortTemplate(), `beforeend`);
render(siteBoardElement, createTasksListTemplate(), `beforeend`);
render(siteBoardElement, createLoadMoreButtonTemplate(), `beforeend`);

const siteTasksListElement = document.querySelector(`.board__tasks`);

render(siteTasksListElement, createTaskEditTemplate(), `beforeend`);

for (let i = 1; i <= TASK_COUNT; i++) {
  render(siteTasksListElement, createTaskTemplate(), `beforeend`);
}
