import {createFilterItemTemplate} from "./filter-item.js";

export const createSiteFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join(``);

  return (
    `<section class="main__filter filter container">
      ${filterItemsTemplate}
    </section>`
  );
};
