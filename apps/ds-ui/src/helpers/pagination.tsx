import { Pagination } from 'react-bootstrap';

/**
 * Helper function that can paginate a list of items in an array (of
 * any kind -- calling component responsible for using the arrays
 * properly.) Returns a tuple containing the subset of the array
 * that should be shown, as well as a list of Pagination.x tags
 * to be used in a <Paginate> element.
 *
 * Does NOT control pagination from the perspective of calling an
 * external API; works with a list of items that have already been
 * retrieved.
 *
 * @param itemList The array of items. This function is agnostic as to
 *     what that array might contain.
 * @param lengthToShow Number of items that should be shown on a "page"
 * @param currentPage Current page that's being displayed
 * @param clickFunction A function (taking in a number) to call when an
 *     item is clicked. Typically would be called by components leveraging
 *     useState, in which case simply use the setting function returned by
 * useState
 * @returns Tuple containing: The filteres list of array items to be shown
 *     on the screen, and the <Pagination> element. If only one screen is
 *     needed, undefined is returned for the Pagination element, which will
 *     still render fine.
 */
export const paginateItems = (
  itemList: any[],
  lengthToShow: number,
  currentPage: number,
  clickFunction: (page: number) => void,
  size: 'sm' | 'lg' | undefined = undefined
): [any[], JSX.Element | undefined] => {
  const indexOfLastItem = currentPage * lengthToShow;
  const indexOfFirstItem = indexOfLastItem - lengthToShow;
  const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);

  const pageNums: number[] = [];
  for (let i = 1; i <= Math.ceil(itemList.length / lengthToShow); i++) {
    pageNums.push(i);
  }

  if (pageNums.length === 1) {
    return [itemList, undefined];
  }

  const prependItems: JSX.Element[] = [];
  const appendItems: JSX.Element[] = [];
  if (pageNums.length > 1) {
    prependItems.push(
      <Pagination.First
        key="pagination-first"
        disabled={currentPage === 1 ? true : false}
        onClick={() => clickFunction(1)}
      />
    );
    prependItems.push(
      <Pagination.Prev
        key="pagination-prev"
        disabled={currentPage === 1 ? true : false}
        onClick={() => clickFunction(currentPage - 1)}
      />
    );

    appendItems.push(
      <Pagination.Next
        key="pagination-next"
        disabled={currentPage === pageNums.length ? true : false}
        onClick={() => clickFunction(currentPage + 1)}
      />
    );
    appendItems.push(
      <Pagination.Last
        key="pagination-last"
        disabled={currentPage === pageNums.length ? true : false}
        onClick={() => clickFunction(pageNums.length)}
      />
    );
  }

  const renderedPageNums = pageNums.map((item) => (
    <Pagination.Item
      key={`pagination-${item}`}
      onClick={() => {
        clickFunction(item);
      }}
      active={item === currentPage ? true : false}
    >
      {item}
    </Pagination.Item>
  ));

  const returnArray: JSX.Element[] = [...prependItems, ...renderedPageNums, ...appendItems];

  return [
    currentItems,
    <div className="pagination-div">
      <Pagination size={size}>{returnArray}</Pagination>
    </div>,
  ];
};
