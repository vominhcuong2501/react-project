import sideBarStyle from '@scss/components/sidebar.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextImage from '../NextImage';

export default function SideBarComponent({ config, relate }: any) {
  const router = useRouter();
  const currentPath = router.asPath.split('/').filter((x) => x);
  const path = `${currentPath[0]}/${currentPath[1]}`;

  return (
    <>
      <style jsx>{sideBarStyle}</style>
      <div className="ibc-sidebar">
        {/* <div className="ibc-sidebar__header">
          <div className="ibc-sidebar__header__content">
            <h1>Subcirbe To Our Updates</h1>
            <h3>
              Latest news & insights from around the world brought to you by One IBC®’s experts
            </h3>
            <div>
              <a href="#">
                SUBSCRIBE NOW
                <i className="fa-light fa-arrow-right-long"></i>
              </a>
            </div>
          </div>
          <img
            src="/images/img-sidebar-header.jpg"
            alt="/images/img-sidebar-header.jpg"
            width="267"
            height="168"
          />
        </div> */}

        <div dangerouslySetInnerHTML={{ __html: config }} />
        <div className="ibc-sidebar__article">
          <h2>Realted Articles</h2>
          {/* <div className="ibc-sidebar__article__item">
            <a href="#" target="_self">
              <img
                src="/images/img-sidebar-article-1.jpg"
                alt="/images/img-sidebar-article-1.jpg"
                width="267"
                height="200"
              />
              <p>Singapore’s Major Trading Partners And Figures</p>
            </a>
          </div> */}

          {relate &&
            relate.map((item, index) => (
              <div className="ibc-sidebar__article__item" key={`${index}`.toString()}>
                <Link href={`/${path}/${item.keyword}`}>
                  <a target="_self" title={item.name}>
                    <NextImage src={item.icon} alt={item.name} width="267" height="200" />
                    <p>{item.name}</p>
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
