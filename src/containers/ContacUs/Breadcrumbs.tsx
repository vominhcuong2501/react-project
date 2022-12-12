import styles from '@scss/components/breadcrumbs.scss?type=scoped';
import { useRouter } from 'next/router';

export default function Breadcrumbs() {
  const router = useRouter();

  return (
    <>
      <style jsx>{styles}</style>
      <section className="ibc-breadcrumbs">
        <div className="ibc-container-content">
          <div className="ibc-breadcrumbs_title">
            <h1>Contact Us</h1>
          </div>
          <div className="ibc-breadcrumbs_link">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a className="router">{router?.asPath}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
