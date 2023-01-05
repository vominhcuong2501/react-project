import Expand from '@components/primitive/Expand';
import NextLink from '@components/primitive/Link';
import { useUrls } from '@hooks/useUrls';
import { IFaqContainer } from '@interfaces/faq';
import faqStyle from '@scss/pages/faq/index.scss';
import { get, map } from 'lodash';
import Link from 'next/link';

interface FAQContainerProps {
  listFaq: IFaqContainer;
}
export default function FAQContainer({ listFaq }: FAQContainerProps) {
  const getFaqs = get(listFaq, 'faqs');
  const url = useUrls();

  return (
    <>
      <style jsx>{faqStyle}</style>

      <section>
        <div className="ibc-container">
          <div className="ibc-container-content ibc-container-content__group-card">
            <div className="ibc-container-content__group-card__item">
              {map(getFaqs, (item, index) => (
                <div className="ibc-container-content__card-item" key={`${index}`.toString()}>
                  <div className="ibc-container-content__card-item--header">
                    <h2>
                      <NextLink
                        label={item.type_name}
                        href={`${url}/${item.type_keyword}`}
                        title={item.type_name}
                      />
                    </h2>
                    <Expand link={`${url}/${item.type_keyword}`} label="View more" />
                  </div>
                  <ul>
                    {item.faqs?.length > 0 ? (
                      map(item.faqs, (faq, idx) => (
                        <li key={`${idx}`.toString()}>
                          <Link href={`${url}/${faq.keyword}`}>
                            <a title={faq.name} target="_self">
                              {faq?.name}
                            </a>
                          </Link>
                          <i className="fa-light fa-arrow-right-long"></i>
                        </li>
                      ))
                    ) : (
                      <li className="ibc-container-content__card-item__no-data">
                        <a>No Data</a>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
