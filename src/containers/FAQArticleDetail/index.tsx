import faqDetail from '@scss/pages/faq-article-detail/index.scss';
import faqDetailStyle from '@scss/pages/faq-type-detail/index.scss';
import { get } from 'lodash';

export default function FAQArticleDetail({ faqDetailPage }: any) {
  const detail = get(faqDetailPage, 'article', '');
  return (
    <>
      <style jsx>{faqDetailStyle}</style>
      <style jsx>{faqDetail}</style>

      <section>
        <div className="ibc-container">
          <div className="ibc-container-content">
            <div className="ibc-container-content__detail-type">
              <h1>{detail.name}</h1>
              <div
                className="ibc-content-format"
                dangerouslySetInnerHTML={{ __html: detail.content }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
