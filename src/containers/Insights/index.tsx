import appStyle from '@scss/pages/insights/index.scss';
import { get } from 'lodash';
import FAQ from './FAQ';
import Lastest from './Lastest';
import List from './List';

export default function Insights({ articlesInsights, faq, dataHub, listInsightLastest }: any) {
  const listInsights = get(articlesInsights, 'insights', []);
  const faqs = get(faq, 'faqs', null);
  const dataHubs = get(dataHub, 'faqs', null);

  return (
    <>
      <style jsx>{appStyle}</style>
      <Lastest listInsights={listInsightLastest} />
      {listInsights &&
        listInsights?.map((item, index) => (
          <List
            data={item.articles}
            title={item.name}
            key={`${index}`.toString()}
            keyword={item.keyword}
          />
        ))}
      {dataHubs && <List data={dataHubs} title="data hub" keyword="data-hub" />}
      {faqs && <FAQ data={faqs} keyword="faqs" />}
    </>
  );
}
