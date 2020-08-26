import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter/site-filter.js";
import {createSiteBoardTemplate} from "./view/board.js";
import {createBoardSortTemplate} from "./view/board-sort.js";
import {createTasksListTemplate} from "./view/tast-list.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit/task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/load-more.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 36;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = document.querySelector(`.main__control`);

render(siteMainControlElement, createSiteMenuTemplate(), `beforeend`);

render(siteMainElement, createSiteFilterTemplate(filters), `beforeend`);

render(siteMainElement, createSiteBoardTemplate(), `beforeend`);

const siteBoardElement = document.querySelector(`.board`);

render(siteBoardElement, createBoardSortTemplate(), `beforeend`);
render(siteBoardElement, createTasksListTemplate(), `beforeend`);

const siteTasksListElement = document.querySelector(`.board__tasks`);

render(siteTasksListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(siteTasksListElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(siteBoardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((task) => render(siteTasksListElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}


