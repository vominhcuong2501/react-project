/* eslint-disable react/no-unescaped-entities */
import style from '@scss/components/footer.scss';
import Facebook from '@svg/facebook.svg';
import Instagram from '@svg/instagram.svg';
import Linkedin from '@svg/linkedin.svg';
import Logo from '@svg/logo-oneibc-footer.svg';
import Tiktok from '@svg/tiktok.svg';
import Twitter from '@svg/twitter.svg';
import Youtube from '@svg/youtube.svg';
import Link from 'next/link';

export default function Footer({ menu }: any) {
  return (
    <footer className="ibc p-0">
      <style jsx>{style}</style>
      <div className="ibc_footer">
        <div className="ibc-container-content ibc_footer_up">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <div className="ibc_logo_footer">
                <div className="logo">
                  <Logo />
                  <span>Your success is our success</span>
                </div>
                <div className="social">
                  <p>SOCIAL NETWORK</p>
                  <ul>
                    <li>
                      <a href="/" title=" ">
                        <Facebook></Facebook>
                      </a>
                    </li>
                    <li>
                      <a href="/" title=" ">
                        <Youtube></Youtube>
                      </a>
                    </li>
                    <li>
                      <a href="/" title=" ">
                        <Twitter></Twitter>
                      </a>
                    </li>
                    <li>
                      <a href="/" title=" ">
                        <Instagram></Instagram>
                      </a>
                    </li>
                    <li>
                      <a href="/" title=" ">
                        <Linkedin></Linkedin>
                      </a>
                    </li>
                    <li>
                      <a href="/" title=" ">
                        <Tiktok></Tiktok>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9 col-sm-12">
              <div className="ibc_menu_footer">
                <div className="row">
                  {menu?.map((item) => (
                    <div className="col-md-6" key={item.name}>
                      <h2>{item.name}</h2>
                      <ul>
                        {item.sub.map((sub) => (
                          <li key={sub.name}>
                            <Link href={{ pathname: `/${sub.url}` }} target="_self">
                              <a target="_self" title={sub.name}>
                                {sub.name}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <span>
            One IBC refers to One IBC network of members firms, each of which is an independent and
            separate legal entity affiliated with One IBC Group ("One IBC AG"), a Swiss entity. One
            IBC Group provides no client services. Neither One IBC Group has any authority to bind
            or obligate any member firm nor member firm has any authority to bind or obligate One
            IBC Group or other third party member firms. All rights reserved.
          </span>
          <p>Copyright © 1997 - 2022 ONE IBC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
