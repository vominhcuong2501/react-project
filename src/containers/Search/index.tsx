import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import searchStyle from '@scss/pages/search/index.scss';
import SearchComponent from './Search';

export default function Search() {
  return (
    <>
      <style jsx>{searchStyle}</style>

      <div className="ibc-search-fluid">
        <div className="ibc-search-container">
          <div className="ibc-search-content">
            <BreadcrumbsComponent />
            <div className="ibc-search-content-result">
              <SearchComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
