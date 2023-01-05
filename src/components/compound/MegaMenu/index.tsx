// import { NextImage } from '@components/primitive';
import { NextImage } from '@components/primitive';
import styleMenu from '@scss/components/mega-menu.scss?type=scoped';
import classNames from 'classnames';
import { map } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';

interface IDataMenu {
  name: string;
  url: string;
  summary: string;
  sub: {
    name: string;
    url: string;
    icon: string;
  }[];
}
interface MegaMenuProps {
  data: IDataMenu[];
  name: string;
  onMouseUp: () => void;
}

export default function MegaMenu({ data, name, onMouseUp }: MegaMenuProps) {
  const [current, setCurrent] = useState<any>(data[0] || {});
  return (
    <>
      <style jsx>{styleMenu}</style>
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ul
          className={classNames({
            'ibc-mega-menu__insight': name === 'Insights',
            'ibc-mega-menu__container': name !== 'Insights',
            'ibc-mega-menu__about-us': name === 'About Us',
          })}
        >
          {name === 'Insights' && <h2>{name}</h2>}
          {map(data, (items) => (
            <li
              key={items.name}
              className={classNames('ibc-mega-menu__item', {
                'ibc-mega-menu__item--insight-list': name === 'Insights',
              })}
            >
              <ul>
                <li
                  className={classNames({ 'ibc-mega-menu__item--insights': name === 'Insights' })}
                >
                  <Link href={`/${items.url}`}>
                    <a
                      onMouseEnter={() => setCurrent(items)}
                      target="_self"
                      title={items.name}
                      onClick={onMouseUp}
                    >
                      <strong style={{ fontWeight: name !== 'Insights' ? '600' : '400' }}>
                        {items.name}
                      </strong>
                    </a>
                  </Link>
                </li>
                {map(items.sub, (item, idx) =>
                  items.name === current ? (
                    <li key={`${idx}`.toString()}>{item.name}</li>
                  ) : (
                    name !== 'Insights' &&
                    name !== 'Industries' && (
                      // sub item different insight
                      <li key={`${idx}`.toString()}>
                        {/* <a href={`/${item.url}`} target="_self" title={item.name}> */}
                        <Link href={`/${items.url}#${item.url}`}>
                          <a
                            target="_self"
                            title={item.name}
                            onClick={onMouseUp}
                            className="ibc-mega-menu__sub-item"
                          >
                            {item.name}
                          </a>
                        </Link>
                      </li>
                    )
                  ),
                )}
              </ul>
            </li>
          ))}
        </ul>

        {/* insights */}
        {name === 'Insights' && (
          <div className="ibc-container__insights">
            <h4>{current.summary}</h4>
            <div className="ibc-mega-menu__insights  scroll-bar">
              {current && (
                <>
                  {current.name !== 'FAQ' &&
                    map(current.sub, (item) => (
                      <div className="ibc-mega-menu__insights__global" key={item.name}>
                        <div>
                          <Link href={`/${item.url}`}>
                            <a target="_self" title={item.name} onClick={onMouseUp}>
                              <NextImage alt={item.name} width="271" height="192" src={item.icon} />
                            </a>
                          </Link>
                          <ul>
                            <li>
                              <Link href={`/${item.url}`}>
                                <a target="_self" title={item.name} onClick={onMouseUp}>
                                  {item.name}
                                </a>
                              </Link>
                              <p>{item.summary}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}

                  {current.name === 'FAQ' && (
                    <>
                      {map(current?.sub, (item, index) => (
                        <div
                          className="ibc-mega-menu__insights__faq"
                          key={`${index}`.toString()}
                          onClick={onMouseUp}
                        >
                          <div>
                            <h3>
                              <Link href={`/${item.url}`}>
                                <a target="_self" title={item.name}>
                                  {item.name}
                                </a>
                              </Link>
                            </h3>
                          </div>
                          <div>
                            <i className="fa-light fa-arrow-right-long"></i>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
