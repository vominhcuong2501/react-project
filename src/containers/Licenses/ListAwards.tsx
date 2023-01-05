import 'swiper/css';
import 'swiper/css/pagination';

import appStyle from '@scss/pages/awards/index.scss';
import { map } from 'lodash';

export default function LicensesArticles({ data }: any) {
  return (
    <section>
      <style jsx>{appStyle}</style>
      <div className="ibc-container__award-header">
        <p>Licenses</p>
      </div>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-award">
            <div className="ibc-award__content">
              {map(data, (item) => (
                <div key={item.id} className="ibc-award__content--item">
                  <div>
                    <a href={`/about-us/${item.keyword}`} title={item.name} target="_self">
                      <img
                        src={item.icon}
                        width="342"
                        height="256"
                        alt={item.name}
                        title={item.name}
                      />
                    </a>
                    <h3>
                      <a href={`/about-us/${item.keyword}`} title={item.name} target="_self">
                        {item.summary}
                      </a>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
