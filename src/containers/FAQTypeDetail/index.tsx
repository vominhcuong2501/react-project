import { useDisplay } from '@hooks/useDisplay';
import { useUrls } from '@hooks/useUrls';
import { selectDetailType } from '@redux/faq/selectors';
import { useAppSelector } from '@redux/hooks';
import faqDetailStyle from '@scss/pages/faq-type-detail/index.scss';
import { get, map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function FAQTypeDetail() {
  const urls = useUrls();
  const isMobile = useDisplay();
  const faqType: any = get(useAppSelector(selectDetailType), 'type', '');
  const faqDataType: any = get(useAppSelector(selectDetailType), 'data', []);
  const { id } = useRouter().query;
  const path = urls?.replace(`/${id}`, '');

  return (
    <>
      <style jsx>{faqDetailStyle}</style>

      <section>
        <div className="ibc-container">
          <div className="ibc-container-content">
            <div className="ibc-container-content__detail-type">
              {!isMobile && <h1>{faqType.name}</h1>}

              <ul>
                {map(faqDataType, (item) => (
                  <li key={`${item.id}`.toString()}>
                    {urls && (
                      <Link href={`${path}/${item.keyword}`}>
                        <a title={item.name} target="_self">
                          {item.name}
                        </a>
                      </Link>
                    )}
                    <i className="fa-light fa-arrow-right-long"></i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
