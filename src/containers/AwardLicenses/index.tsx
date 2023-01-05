import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import appStyle from '@scss/pages/about-us/index.scss';
import { get } from 'lodash';
import 'swiper/css';
import 'swiper/css/pagination';
import ListArticle from './ListArticle';

interface AwardsContainerProps {
  listArticle: any;
  options: any;
}
export default function AwardLicenses({ listArticle, options }: AwardsContainerProps) {
  return (
    <main>
      <style jsx>{appStyle}</style>
      <section>
        <div className="ibc-award-licenses">
          <img src="/images/licenses-award.jpg" alt="Banner" title="Banner" />
          <div className="ibc-award-licenses__content">
            <div>
              <p className="ibc-award-licenses__content__title">{get(options, 'name', '')}</p>
            </div>
          </div>

          <div className="ibc-container-content ibc-container__bread-crumb">
            <BreadcrumbsComponent />
          </div>
        </div>
      </section>
      <ListArticle data={get(listArticle, 'articles', [])} />
    </main>
  );
}
