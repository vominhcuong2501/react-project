import { NextImage } from '@components/primitive';
import Expand from '@components/primitive/Expand';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function List({ data, title, disableBorderBottom, keyword, isDetail }: any) {
  const route = useRouter();
  const path = `${route.asPath}${!isDetail ? '/' : ''}${keyword || ''}`;

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
                {data &&
                  data?.map((item, index) => (
                    <div className="ibc-insight__list__item" key={`${index}`.toString()}>
                      <Link href={`${path}/${item.keyword}`}>
                        <a target="_self">
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
                            <a target="_self" title={item.name}>
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
