import { OFFSHORE } from '@/constants';
import MegaMenu from '@components/compound/MegaMenu';
import MenuMobile from '@components/compound/MobileMenu';
import { Button } from '@components/primitive';
import style from '@scss/components/header.scss';
import Account from '@svg/account.svg';
import GlobalCountry from '@svg/global-country.svg';
import LogoOneIbcBlack from '@svg/logo-oneibc-black.svg';
import LogoOneIbc from '@svg/logo-oneibc.svg';
import Search from '@svg/search.svg';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Header({ menu }: any) {
  const [isShow, setIsShow] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const handleClose = () => setIsShow((x) => !x);
  const navRef = useRef(null);
  const mobileIconRef = useRef(null);
  const itemMenu = useRef(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const posY = window.scrollY;
      if (posY > 100 && !navRef.current.classList.contains('ibc-nav--scroll')) {
        navRef.current.classList.add('ibc-nav--scroll');
        mobileIconRef.current.classList.add('ibc-nav__logo--scroll');
        setIsScroll(true);
        return;
      }
      if (posY < 100 && navRef.current.classList.contains('ibc-nav--scroll')) {
        navRef.current.classList.remove('ibc-nav--scroll');
        mobileIconRef.current.classList.remove('ibc-nav__logo--scroll');
        setIsScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx>{style}</style>
      <header className="ibc-main">
        <div className="ibc-nav" ref={navRef}>
          <div className="ibc-nav__logo">
            <i
              className="fa-light fa-bars"
              onClick={() => setIsShow((x) => !x)}
              ref={mobileIconRef}
            />
            <Link href="/">
              <a target="_self">{isScroll ? <LogoOneIbcBlack /> : <LogoOneIbc />}</a>
            </Link>
          </div>
          <div className="ibc-nav__menu">
            <ul className="ibc-nav__main-menu">
              {menu?.length > 0 &&
                menu.map((item, index) => (
                  <li
                    key={`${index}`.toString()}
                    onMouseEnter={() => setActiveMegaMenu(index)}
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <Link className="ibc-nav__link" href={`/${item.url}`}>
                      <a
                        className="ibc-nav__link"
                        target="_self"
                        title={item.name}
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        <span>{item.name}</span>
                        {item.sub.length > 0 && (
                          <>
                            <i className="fa-solid fa-caret-down"></i>
                            <i className="fa-solid fa-caret-up"></i>
                          </>
                        )}
                      </a>
                    </Link>

                    {item.sub.length > 0 && (
                      <div
                        className={classNames([
                          'ibc-nav__mega-menu',
                          { 'ibc-nav__mega-menu--in-active': index !== activeMegaMenu },
                          { 'ibc-nav__mega-menu--active': index === activeMegaMenu },
                        ])}
                      >
                        <MegaMenu
                          data={item.sub}
                          name={item.name}
                          onMouseUp={() => setActiveMegaMenu(null)}
                        />
                      </div>
                    )}
                  </li>
                ))}
            </ul>
            <ul className="ibc-nav__controls-menu">
              <li>
                {/* <Flag code="gx" height="12" width="16" className="ibc-nav__flag" /> */}
                <a className="ibc-nav__link" href="#">
                  <GlobalCountry width="30" />
                  <span>Global</span>
                  <i className="fa-solid fa-caret-down"></i>
                  <i className="fa-solid fa-caret-up"></i>
                </a>
              </li>
              <li>
                <Link href="#">
                  <a className="ibc-nav__link">
                    <span>EN</span>
                    <i className="fa-solid fa-caret-down"></i>
                    <i className="fa-solid fa-caret-up"></i>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: `${OFFSHORE}/login` }}>
                  <a className="ibc-nav__link" target="_blank">
                    <Account className="ibc-nav__icon--profile" />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="ibc-nav__link">
                    <Search className="ibc-nav__icon--search" />
                  </a>
                </Link>
              </li>
              <li className="ibc-nav__button">
                <Button
                  label="MAKE AN ENQUIRY"
                  variant="danger"
                  size="small"
                  href="/make-an-enquiry"
                />
              </li>
            </ul>
            {/* <div className="ibc-nav__input--search">
              <div>
                <Search className="ibc-nav__icon--search" />
                <Input placeholder='Search'/>
                <i className="fas fa-times" onClick={handleClearBtn}></i>
              </div>
            </div> */}
          </div>
        </div>
        <MenuMobile isShow={isShow} onClose={handleClose} />
      </header>
    </>
  );
}
