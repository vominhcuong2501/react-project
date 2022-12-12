import {
  INNER_WIDTH_MOBILE,
  MARGIN_PAGE,
  PAGE_RANGE_BROWSER,
  PAGE_RANGE_MOBILE,
  PER_PAGE,
} from '@/constants/config';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import paginationStyles from '@scss/components/group-pagination.scss';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

interface Props {
  onPageChange: (page: any) => void;
  lengthPage: number;
  currentPage: number;
}

function GroupPagination({ lengthPage, onPageChange, currentPage }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const totalPage = Math.ceil(lengthPage / PER_PAGE);
  const checkMobile = () => {
    if (window.innerWidth < INNER_WIDTH_MOBILE) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (totalPage > 1) {
    return (
      <>
        <style jsx>{paginationStyles}</style>
        <ReactPaginate
          pageCount={totalPage}
          pageRangeDisplayed={isMobile ? PAGE_RANGE_MOBILE : PAGE_RANGE_BROWSER}
          marginPagesDisplayed={MARGIN_PAGE}
          previousLabel={<ArrowBackIosRounded />}
          nextLabel={<ArrowForwardIosRounded />}
          breakLabel="・・・"
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
          onPageChange={onPageChange}
          forcePage={currentPage - 1}
        />
      </>
    );
  }
}

export default GroupPagination;
