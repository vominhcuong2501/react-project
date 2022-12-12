import { IContactsBannerProps } from '@interfaces/contact-us';
import Style from '@scss/pages/contact-us/index.scss';
import { Address } from './Address';
import Banner from './Banner';
import { ContactForm } from './ContactForm';
import MapContact from './MapContact';

export default function ContactUS({
  banner,
  listService,
  officesService,
  countriesService,
  officesAllService,
}: IContactsBannerProps) {
  return (
    <main>
      <style jsx>{Style}</style>
      <Banner banner={banner} />
      <ContactForm listServices={listService} />
      <Address officesService={officesService} />
      <MapContact countriesService={countriesService} officesAllService={officesAllService} />
    </main>
  );
}
