import paginationStyles from '@scss/components/pagination.scss';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  onPageChange?: (page: any) => void;
  itemsPerPage: number;
  totalPage: number;
}

export default function Pagination({ itemsPerPage = 1, onPageChange, totalPage }: PaginationProps) {
  const pageCount = Math.ceil(totalPage / itemsPerPage);
  const handlePageClick = (event) => {
    if (onPageChange) {
      onPageChange(event.selected + 1);
    }
  };

  return (
    <>
      <style jsx>{paginationStyles}</style>
      <div>
        {/* <Items /> */}
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          // pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName="ibc-pagination-item"
          activeClassName="ibc-pagination-item__active"
          containerClassName="ibc-pagination"
          pageLinkClassName="ibc-pagination-link"
          breakLinkClassName="ibc-pagination-link"
          breakClassName="ibc-pagination-break"
          nextClassName="ibc-pagination-next"
          previousClassName="ibc-pagination-previous"
          nextLinkClassName="ibc-pagination-action-link"
          previousLinkClassName="ibc-pagination-action-link"
        />
      </div>
    </>
  );
}
