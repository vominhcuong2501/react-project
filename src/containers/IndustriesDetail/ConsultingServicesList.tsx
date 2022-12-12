import GroupConsultingServicesList from '@components/compound/GroupConsultingServicesList';
import Breadcrumb from '@components/primitive/Breadcrumb';
import { get } from 'lodash';

interface DetailServicesProps {
  configFuture: any;
  name: string;
}
export default function ConsultingServicesList({ configFuture, name }: DetailServicesProps) {
  const configFutureData = get(configFuture, 'industry.meta_content', null);

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

            <GroupConsultingServicesList routerPath="/consulting-services" />
          </div>
        </div>
      </div>
    </section>
  );
}
