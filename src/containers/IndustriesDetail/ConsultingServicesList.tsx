import GroupConsultingServicesList from '@components/compound/GroupConsultingServicesList';
import Breadcrumb from '@components/primitive/Breadcrumb';
import { useRefDimensions } from '@hooks/useRefDimensions';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

interface DetailServicesProps {
  configFuture: any;
  name: string;
}
export default function ConsultingServicesList({ configFuture, name }: DetailServicesProps) {
  const configFutureData = get(configFuture, 'industry.meta_content', null);
  const elementRef = useRef(null);
  const dimensions = useRefDimensions(elementRef);
  const router = useRouter();

  const getKeyword = get(configFuture, 'industry.keyword');
  useEffect(() => {
    let setScrollTimeout;
    if (dimensions.height && router.asPath.includes('#')) {
      setScrollTimeout = setTimeout(() => {
        const element = document.getElementById(getKeyword);
        element?.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      }, 1500);
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
            <h1 id={getKeyword}>{name}</h1>
            <section dangerouslySetInnerHTML={{ __html: configFutureData }} ref={elementRef} />
            <GroupConsultingServicesList routerPath="/consulting-services" />
          </div>
        </div>
      </div>
    </section>
  );
}
