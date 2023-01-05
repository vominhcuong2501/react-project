import { NextImage } from '@components/primitive';
import Expand from '@components/primitive/Expand';
import { map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function List({ data: lists, title, keyword, isDetail }: any) {
  const route = useRouter();
  const [path, setPath] = useState('');

  useEffect(() => {
    const { id } = route.query;
    if (keyword === 'data-hub') {
      setPath(`${!isDetail ? '/' : ''}${keyword || ''}`);
      return;
    }

    if (isDetail) {
      setPath(route.asPath.replace(`/${id}`, ''));
      return;
    }

    setPath(`${route.asPath}`);
  }, [route.asPath]);

  return (
    <section>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div>
            <div className="ibc-insight__list">
              <div className="ibc-insight__more">
                {title && (
                  <>
                    <h2>{title}</h2>
                    <Expand link={`${path}`} label="View more" />
                  </>
                )}
              </div>
              <div className="ibc-insight__list__swapper">
                {map(lists, (item, index) => (
                  <div className="ibc-insight__list__item" key={`${index}`.toString()}>
                    <Link href={`${path}/${item.keyword}`}>
                      <a target="_self" href={`${path}/${item.keyword}`} title={item.name}>
                        <NextImage
                          src={item.icon}
                          alt={item.name}
                          width="414"
                          height="182"
                          title={item.name}
                        />
                      </a>
                    </Link>
                    <div>
                      <h3>
                        <Link href={`${path}/${item.keyword}`}>
                          <a target="_self" title={item.name} href={`${path}/${item.keyword}`}>
                            {item.name}
                          </a>
                        </Link>
                      </h3>
                      <p>{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
