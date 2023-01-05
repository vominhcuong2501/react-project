import appStyle from '@scss/pages/about-us/index.scss';
import { get } from 'lodash';
import 'swiper/css';
import 'swiper/css/pagination';
import AwardArticles from './ListAwards';

interface LicensesArticlesContainerProps {
  listLicenses: any;
}
export default function LicensesContainer({ listLicenses }: LicensesArticlesContainerProps) {
  return (
    <main>
      <style jsx>{appStyle}</style>

      <section>
        <div className="ibc-container">
          <div className="ibc-container-content ibc-container-content__group-card"></div>
        </div>
      </section>
      <AwardArticles data={get(listLicenses, 'articles', [])} />
    </main>
  );
}
