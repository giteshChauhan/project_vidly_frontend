// Pagination
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  window.scrollTo(0, 0);

  return (
    <nav>
      <ul className="myPagination">
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage
                ? "myListItem myListBox myListItemActive"
                : "myListItem myListBox"
            }
          >
            <a
              className="myPageLink"
              onClick={() => props.onPageChange(page)}
              href={"#" + currentPage}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
