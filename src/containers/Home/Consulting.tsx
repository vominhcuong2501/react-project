import { selectServices } from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import ConsultingSlice from './ConsultingSlice';

export function Consulting() {
  const listServicesStore: any = useAppSelector(selectServices);

  if (listServicesStore) {
    return (
      <section className="ibc-consulting">
        <div className="ibc-main">
          <h2>Consulting Services</h2>
          <div className="ibc-consulting__boundary">
            <div className="ibc-consulting__container">
              <div className="ibc-consulting__content">
                <ConsultingSlice listService={listServicesStore.services} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
