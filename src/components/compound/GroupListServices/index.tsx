import Expand from '@components/primitive/Expand';
import { selectServices } from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import style from '@scss/components/group-list-services.scss';
import { get, map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GroupListServices({ listServicesData }: any) {
  const router = useRouter();
  const getListServices = useAppSelector(selectServices);
  const listData = get(getListServices, 'services', listServicesData);

  return (
    <div>
      <style jsx>{style}</style>
      <div className="ibc-services__list">
        {map(listData, (item) => (
          <div
            className="ibc-services__list--item"
            key={item.id}
            onClick={() => router.push(`${router.asPath}/${item.keyword}`)}
          >
            <div>
              <img src={item.icon} alt={item.name} width="360" height="80" title={item.name} />
              <h3>
                <a href="/404">Strategy</a>

                <Link href={{ pathname: `${router.asPath}/${item.keyword}` }}>
                  <a target="_self" title={item.name}>
                    {item.name}
                  </a>
                </Link>
              </h3>
              <p>{item.summary}</p>
            </div>
            <Expand link={`${router.asPath}/${item.keyword}`} label="View more"></Expand>
          </div>
        ))}
      </div>
    </div>
  );
}

const defaultProps = {
  listServicesData: [],
};

GroupListServices.defaultProps = defaultProps;
