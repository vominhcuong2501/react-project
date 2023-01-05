// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getStaticPathsConfig } from '@/constants/config';
import appStyle from '@/scss/pages/404/index.scss';
import { MainLayout } from '@components/compound';
import withIncrementalStaticRegeneration from '@hoc/withWrapperSSR';

import Router from 'next/router';

export default function NotFound() {
  return (
    <main>
      <style jsx>{appStyle}</style>
      <section className="jsx-3697528824 ibc-banner breadcrumb-404">
        <div className="jsx-3697528824 ibc-container-content">
          <div className="jsx-3697528824 ibc-banner_link">
            <div className="jsx-3697528824 ibc-services__breadcrumb">
              <nav
                className="MuiTypography-root MuiTypography-body1 MuiBreadcrumbs-root ibc-breadcrumbs css-63vwl1-MuiTypography-root-MuiBreadcrumbs-root"
                aria-label="breadcrumb"
              >
                <ol className="MuiBreadcrumbs-ol css-4pdmu4-MuiBreadcrumbs-ol">
                  <li className="MuiBreadcrumbs-li">
                    <a href="/">Home</a>
                  </li>
                  <li
                    aria-hidden="true"
                    className="MuiBreadcrumbs-separator css-1wuw8dw-MuiBreadcrumbs-separator"
                  >
                    |
                  </li>
                  <li className="MuiBreadcrumbs-li">
                    <p className="MuiTypography-root MuiTypography-body1 css-ahj2mt-MuiTypography-root">
                      404
                    </p>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="ibc_touch ibc-main  ibc-404">
        <div className="ibc__form">
          <div className="ibc-404_img">
            <img src="../images/404.jpg" alt="" />
          </div>
          <div className="ibc-404_title">
            <div className="ibc-difference__content">
              <h2>Oops! Page not found</h2>
              <p>Sorry, We can not seem to find the page you are looking for. </p>
              <p>Error code: 404</p>
              <div className="bnt_404">
                <div className="jsx-2351668633 button_update">
                  <div className="ibc__form__box__button ">
                    <button>
                      <a onClick={() => Router.back()}>Back</a>
                    </button>
                  </div>
                </div>

                <div className="ibc__form__box__button ">
                  <button>
                    <a href="/">Home</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

NotFound.Layout = MainLayout;
export const getStaticPaths = getStaticPathsConfig;
export const getStaticProps = withIncrementalStaticRegeneration({
  callback: async () => ({
    props: {},
  }),
});
