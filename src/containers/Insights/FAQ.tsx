import Expand from '@components/primitive/Expand';
import { useAppSelector } from '@redux/hooks';
import { selectsListFaq } from '@redux/insights/selecters';
import { get, map } from 'lodash';
import Link from 'next/link';

export default function Faq() {
  const listFaqs = get(useAppSelector(selectsListFaq), 'faqs', null);
  const pathRoot = '/faq';

  return (
    <section>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-insightsFaq__list">
            <div>
              <h2>FAQ</h2>
              <Expand link="/faq" label="View more" />
            </div>
            <div className="row justify-content-between">
              {map(listFaqs, (item, index) => (
                <div className="col-md-6 col-12" key={`${index}`.toString()}>
                  <Link href={`${pathRoot}/${item.keyword}`}>
                    <a target="_self" className="d-flex justify-content-between align-items-center">
                      <p>{item.name}</p>
                      <i className="fa-light fa-arrow-right-long"></i>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
