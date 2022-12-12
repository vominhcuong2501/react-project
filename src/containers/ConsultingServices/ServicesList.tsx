import GroupConsultingServicesList from '@components/compound/GroupConsultingServicesList';
import Breadcrumb from '@components/primitive/Breadcrumb';
import { IListServices } from '@interfaces/service-page';
import { useRouter } from 'next/router';

interface ServicesListProps {
  listServices: IListServices;
  metaInfo: any;
}
export default function DetailServices({ listServices, metaInfo }: ServicesListProps) {
  const router = useRouter();
  return (
    <section className="ibc-services">
      <div className="ibc-services__fluid">
        <div className="ibc-services__container">
          <div className="ibc-services__main">
            <div className="ibc-services__breadcrumb">
              <Breadcrumb></Breadcrumb>
            </div>
            <div dangerouslySetInnerHTML={{ __html: metaInfo.page.content }}></div>
            <GroupConsultingServicesList listServices={listServices} routerPath={router.asPath} />
          </div>
        </div>
      </div>
    </section>
  );
}
