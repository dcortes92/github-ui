/**
 * Helper function that toggles the visibility of the items of a `Pagination` component
 * @param {number} totalItemsCount The total items
 * @param {number} activeRange The number of items per page
 */
export const isPaginationHidden = (totalItemsCount, activeRange) => totalItemsCount < activeRange;