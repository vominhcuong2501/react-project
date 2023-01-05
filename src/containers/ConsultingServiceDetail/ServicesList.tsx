import Breadcrumb from '@components/primitive/Breadcrumb';
import { useRefDimensions } from '@hooks/useRefDimensions';
import { get, map } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

interface DetailServicesProps {
  configFuture: any;
  name: string;
  articles: any;
}
export default function DetailServices({ configFuture, name, articles }: DetailServicesProps) {
  const configFutureData = get(configFuture, 'service.content', null);
  const router = useRouter();

  const elementRef = useRef(null);
  const dimensions = useRefDimensions(elementRef);
  useEffect(() => {
    let setScrollTimeout;
    let originPath = router.asPath;
    if (router.asPath.includes('#')) {
      originPath = router.asPath.slice(router.asPath.indexOf('#') + 1, router.asPath.length);

      if (dimensions.height) {
        setScrollTimeout = setTimeout(() => {
          const element = document.getElementById(originPath);
          element?.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
          });
        }, 0);
      }
    }

    return () => {
      clearTimeout(setScrollTimeout);
    };
  }, [dimensions, router.asPath]);

  return (
    <section className="ibc-services">
      <div className="ibc-services__fluid">
        <div className="ibc-services__container">
          <div className="ibc-services__main">
            <div className="ibc-services__breadcrumb">
              <Breadcrumb></Breadcrumb>
            </div>

            <h1>{name}</h1>
            <section dangerouslySetInnerHTML={{ __html: configFutureData }} />
            <ul className="ibc-services__item">
              {map(articles, (item) => (
                <li key={item.id} id={item.keyword} ref={elementRef}>
                  <img src={item.icon} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <div dangerouslySetInnerHTML={{ __html: item?.content || '' }}></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
