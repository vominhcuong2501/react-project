import { NextImage } from '@components/primitive';
import Expand from '@components/primitive/Expand';
import { selectServices } from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import componentStyle from '@scss/components/group-consulting-services-list.scss';
import { get } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GroupConsultingServicesList({ routerPath }: any) {
  const router = useRouter();

  const consultingServicesStore: any = useAppSelector(selectServices);
  const listServices = get(consultingServicesStore, 'services', []);

  return (
    <>
      <style jsx> {componentStyle}</style>
      <div className="ibc-component__list">
        {listServices.length > 0 &&
          listServices.map((item) => (
            <div
              className="ibc-component__list--item"
              key={item.id}
              onClick={() => router.push(`${routerPath}/${item.keyword}`)}
            >
              <div className="ibc-component__list--item-content">
                <div>
                  <NextImage
                    src={item.icon}
                    alt={item.name}
                    width="360"
                    height="80"
                    title={item.name}
                  />
                  <h3>
                    <Link href={{ pathname: `${routerPath}/${item.keyword}` }}>
                      <a target="_self" title={item.name}>
                        {item.name}
                      </a>
                    </Link>
                  </h3>
                  <p>{item.summary}</p>
                </div>
                <div>
                  <Expand link={`${routerPath}/${item.keyword}`} label="View more" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
