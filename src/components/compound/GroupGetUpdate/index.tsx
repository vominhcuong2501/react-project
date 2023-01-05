import { INSIGHTS } from '@/constants';
import { selectListInsights } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import style from '@scss/components/group-get-update.scss';
import ArrowRight from '@svg/arrow-right.svg';
import { get, map } from 'lodash';
import Link from 'next/link';
import button from '../../../scss/components/custom-button-expand.scss';

export function GroupGetUpdate() {
  const insights = get(useAppSelector(selectListInsights), 'insights', []);

  return (
    <>
      <style jsx>{button}</style>
      <style jsx>{style}</style>
      <section className="ibc">
        <div className="ibc__update">
          <div className="ibc-container-content ">
            <div className="ibc-difference__content text-center">
              <h2>Get Updated</h2>
            </div>
            <div className="flex">
              {map(insights, (item) => (
                <div className="ibc__update__item" key={item.id}>
                  <div className="ibc__update__item__img">
                    <Link href={`/${INSIGHTS}/${item.keyword}`}>
                      <a target="_self" title={item.name}>
                        <img
                          src={item.icon}
                          alt={item.name}
                          width="320"
                          height="324"
                          title={item.name}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="ibc__update__item__content">
                    <div className="ibc__update__item__content__title">
                      <h3>
                        <Link scroll href={`/${INSIGHTS}/${item.keyword}`}>
                          <a title={item.name} target="_self">
                            {item.name}
                          </a>
                        </Link>
                      </h3>
                    </div>
                    <p>{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="ibc-btn-wrapper">
              <a className="ibc-custom-btn ibc-custom-btn--light" href="/insights">
                <span>View full list</span>
                <ArrowRight></ArrowRight>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
