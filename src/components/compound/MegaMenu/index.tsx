// import { NextImage } from '@components/primitive';
import { NextImage } from '@components/primitive';
import styleMenu from '@scss/components/mega-menu.scss?type=scoped';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

interface MegaMenuProps {
  data: any;
  name: string;
}

export default function MegaMenu({ data, name }: MegaMenuProps) {
  const [current, setCurrent] = useState<any>(data[0] || {});

  return (
    <>
      <style jsx>{styleMenu}</style>
      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ul
          className={classNames({
            'ibc-mega-menu__insight': name === 'Insights',
            'ibc-mega-menu__container': name !== 'Insights',
          })}
        >
          {name === 'Insights' && <h2>{name}</h2>}
          {data.map((items) => (
            <li className="ibc-mega-menu__item" key={items.name}>
              <ul>
                <li
                  className={classNames({ 'ibc-mega-menu__item--insights': name === 'Insights' })}
                >
                  <Link href={name === 'Insights' ? '#' : `/${items.url}`}>
                    <a onMouseEnter={() => setCurrent(items)} target="_self" title={items.name}>
                      {items.name || 'Data null'}
                    </a>
                  </Link>
                </li>
                {items?.sub?.map((item, idx) =>
                  items.name === current ? (
                    <li key={`${idx}`.toString()}>{item.name}</li>
                  ) : (
                    name !== 'Insights' && <li key={`${idx}`.toString()}>{item.name}</li>
                  ),
                )}
              </ul>
            </li>
          ))}
        </ul>

        {/* insights */}
        {name === 'Insights' && (
          <div className="ibc-container__insights">
            <h4>{current.name || 'Data null'}</h4>
            <div className="ibc-mega-menu__insights  scroll-bar">
              {current && (
                <>
                  {current.name !== 'FAQ' &&
                    current?.sub?.map((item) => (
                      <div className="ibc-mega-menu__insights__global" key={item.name}>
                        <div>
                          <NextImage alt="" width="271" height="192" src={item.icon} />
                          <ul>
                            <li>
                              <Link href={`/${item.url}`}>
                                <a target="_self" title={item.name}>
                                  {item.name}
                                </a>
                              </Link>
                              <p>
                                Singapore is a major international air transit hub and an important
                                gateway to Asia, particularly Southeast Asia....
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}

                  {current.name === 'FAQ' && (
                    <>
                      <div className="ibc-mega-menu__insights__faq">
                        <div>
                          <h3>
                            <a href="">How is the BV included in the Commercial Registry?</a>
                          </h3>
                        </div>
                        <div>
                          <i className="fa-light fa-arrow-right-long"></i>
                        </div>
                      </div>
                      <div className="ibc-mega-menu__insights__faq">
                        <div>
                          <h3>
                            <a href="">
                              Do I need to come to the bank in person to open an account?
                            </a>
                          </h3>
                        </div>
                        <div>
                          <i className="fa-light fa-arrow-right-long"></i>
                        </div>
                      </div>
                      <div className="ibc-mega-menu__insights__faq">
                        <div>
                          <h3>
                            <a href="">
                              What are the requirements regarding the purpose and range of
                              activities of a private Dutch LLC?
                            </a>
                          </h3>
                        </div>
                        <div>
                          <i className="fa-light fa-arrow-right-long"></i>
                        </div>
                      </div>
                      <div className="ibc-mega-menu__insights__faq">
                        <div>
                          <h3>
                            <a href="">
                              Does setting up an offshore company mean that a bank account will
                              automatically be opened for the company?
                            </a>
                          </h3>
                        </div>
                        <div>
                          <i className="fa-light fa-arrow-right-long"></i>
                        </div>
                      </div>
                      <div className="ibc-mega-menu__insights__faq">
                        <div>
                          <h3>
                            <a href="">
                              What is the main difference between Offshore & Onshore companies in
                              Dubai, UAE?
                            </a>
                          </h3>
                        </div>
                        <div>
                          <i className="fa-light fa-arrow-right-long"></i>
                        </div>
                      </div>
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
