import { INSIGHTS } from '@/constants';
import { selectUpdateSection } from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import style from '@scss/components/group-get-update.scss';
import Link from 'next/link';

export function GroupGetUpdate() {
  const selectUpdateData = useAppSelector(selectUpdateSection);
  const { insights }: any = selectUpdateData;
  if (!insights) return null;

  return (
    <>
      <style jsx>{style}</style>
      <section className="ibc">
        <div className="ibc__update">
          <div className="ibc-container-content ">
            <div className="ibc-difference__content text-center">
              <h2>Get Updated</h2>
            </div>
            <div className="flex">
              {insights &&
                insights.map((item) => (
                  <div className="ibc__update__item" key={item.id}>
                    <div className="ibc__update__item__img">
                      <Link href={`/${INSIGHTS}/${item.keyword}`}>
                        <a target="_self" title={item.name}>
                          <img
                            src={item.icon}
                            alt={item.name}
                            width="324"
                            height="324"
                            title={item.name}
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="ibc__update__item__content">
                      <div className="ibc__update__item__content__title">
                        <Link scroll href={`${INSIGHTS}/${item.keyword}`}>
                          <a title={item.name} target="_self">
                            {item.name}
                          </a>
                        </Link>
                      </div>
                      <p>{item.summary}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="button_update">
              <div className=" ibc__form__box__button ">
                <button>
                  <a href="/insights">View full list</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
