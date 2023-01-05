import { NextImage } from '@components/primitive';
import { getConfigLearMoreAbout, getListArticleAboutUs } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import articleStyle from '@scss/components/learn-more-about.scss';
import { getConfig } from '@utils/helpers';
import { get, map } from 'lodash';
import Link from 'next/link';

export default function AboutArticle() {
  const listAbout = get(useAppSelector(getListArticleAboutUs), 'articles', []);
  const txtLearMoreAbout = getConfig(useAppSelector(getConfigLearMoreAbout));

  return (
    <section className="ibc-container ibc-group-article-container">
      <style jsx>{articleStyle}</style>
      <div className="ibc-group-article">
        <div className="ibc-container-content">
          <h2 dangerouslySetInnerHTML={{ __html: txtLearMoreAbout }} />
          <ul>
            {map(listAbout, (item: any) => (
              <li key={item.id}>
                <h3>
                  <a href={`/about-us/${item.keyword}`} target="_self" title={item.name}>
                    {item.name}
                  </a>
                </h3>
                <div className="ibc-group-item">
                  <Link href={`/about-us/${item.keyword}`}>
                    <a target="_self" title={item.name}>
                      <NextImage
                        src={item.icon_mobile}
                        mobileSrc={item.icon_mobile}
                        title={item.name}
                        width="380"
                        alt={item.name}
                        height="248"
                      />
                    </a>
                  </Link>
                  <div>
                    <i className="fa-light fa-arrow-right"></i>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
