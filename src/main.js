import SiteMenu from "./view/site-menu.js";
import Filter from "./view/site-filter/site-filter.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

import BoardPresenter from "./presenter/board.js";
import {render, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 25;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = document.querySelector(`.main__control`);

const siteMenuComponent = new SiteMenu();
render(siteMainControlElement, siteMenuComponent.getElement(), RenderPosition.BEFOREEND);

const filterComponent = new Filter(filters);
render(siteMainElement, filterComponent.getElement(), RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainElement);
boardPresenter.init(tasks);
