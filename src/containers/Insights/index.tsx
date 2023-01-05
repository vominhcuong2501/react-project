import { useAppSelector } from '@redux/hooks';
import { selectsListDataHub, selectsListInSightsTypes } from '@redux/insights/selecters';
import appStyle from '@scss/pages/insights/index.scss';
import { get, map } from 'lodash';
import FAQ from './FAQ';
import Lastest from './Lastest';
import List from './List';

export default function Insights() {
  const listInsightTypes = get(useAppSelector(selectsListInSightsTypes), 'insights', []);
  const listDataHub = get(useAppSelector(selectsListDataHub), 'data-hub', null);

  return (
    <>
      <style jsx>{appStyle}</style>
      <Lastest />

      {map(listInsightTypes, (item, index) => (
        <List
          data={item.articles}
          title={item.name}
          key={`${index}`.toString()}
          keyword={item.keyword}
        />
      ))}
      {/* Data-Hub */}

      {listDataHub && <List data={listDataHub} title="data hub" keyword="data-hub" />}
      {/* Faq */}
      <FAQ />
    </>
  );
}
