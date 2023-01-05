import 'swiper/css';
import 'swiper/css/pagination';

import { useUrls } from '@hooks/useUrls';
import appStyle from '@scss/pages/awards/index.scss';
import { map } from 'lodash';
import Link from 'next/link';

interface ListArticleProps {
  data: {
    id: number;
    keyword: string;
    name: string;
    icon: string;
    icon_mobile: any;
    summary: string;
    type_id: number;
  }[];
}
export default function ListArticle({ data }: ListArticleProps) {
  const url = useUrls();
  return (
    <section>
      <style jsx>{appStyle}</style>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-group-card">
            <div className="ibc-group-card__content">
              {map(data, (item) => (
                <div key={item.id} className="ibc-group-card__content--item">
                  <div>
                    <Link href={`${url}/${item.keyword}`}>
                      <a title={item.name} target="_self">
                        <img
                          src={item.icon}
                          width="342"
                          height="342"
                          alt={item.name}
                          title={item.name}
                        />
                      </a>
                    </Link>
                    <h3>
                      <Link href={`${url}/${item.keyword}`} title={item.name} target="_self">
                        <a
                          title={item.name}
                          target="_self"
                          dangerouslySetInnerHTML={{ __html: item.name }}
                        />
                      </Link>
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
