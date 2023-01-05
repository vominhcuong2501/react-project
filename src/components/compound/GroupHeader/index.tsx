/* eslint eqeqeq: 0 */
import { OFFSHORE } from '@/constants';
import MegaMenu from '@components/compound/MegaMenu';
import MenuMobile from '@components/compound/MobileMenu';
import { IHeader } from '@interfaces/common';
import style from '@scss/components/header.scss';
import search from '@scss/components/search-page.scss';
import Account from '@svg/account.svg';
import GlobalCountry from '@svg/global-country.svg';
import Search from '@svg/search.svg';
import classNames from 'classnames';
import { map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SearchInputComponent from './SearchInput';

interface HeaderProps {
  menu: IHeader[];
}

export default function Header({ menu }: HeaderProps) {
  const [isShow, setIsShow] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [queryString, setQueryString] = useState('');
  const handleClose = () => setIsShow((x) => !x);
  const navRef = useRef(null);
  const mobileIconRef = useRef(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isShowSearch, setIsShowSearch] = useState(true);
  const router = useRouter();
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(
      {
        pathname: '/search',
        query: {
          queryString,
        },
      },
      '/search',
    );

    setIsShowSearch((x) => !x);
  };

  const handleClickLanguage = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <style jsx>{style}</style>
      <style jsx>{search}</style>
      <header className="ibc-main">
        <div className="ibc-nav" ref={navRef}>
          <div className="ibc-nav-wrapper">
            <div className="ibc-nav__logo">
              <i
                className="fa-light fa-bars"
                onClick={() => setIsShow((x) => !x)}
                ref={mobileIconRef}
              />
              <Link href="/">
                <a target="_self">
                  {isScroll ? (
                    <img src="/images/one-ibc-logo.svg" alt="arrow-down" id="arrow-down" />
                  ) : (
                    <img src="/images/one-ibc-logo-white.svg" alt="arrow-down" id="arrow-down" />
                  )}
                </a>
              </Link>
            </div>

            {!isShowSearch ? (
              <div className="ibc-search-header">
                <form onSubmit={handleSearchSubmit}>
                  <div className="ibc-search-header__input">
                    {/* <i className="fa-light fa-magnifying-glass"></i> */}
                    <div className="ibc-search-header__input__button-search">
                      <button onClick={() => setIsShowSearch((x) => !x)}>
                        <i className="fa-light fa-magnifying-glass"></i>
                      </button>
                    </div>
                    <SearchInputComponent />
                    <div className="ibc-search-header__input__button-del">
                      <button onClick={() => setIsShowSearch((x) => !x)}>
                        <i className="fa-solid fa-x"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="ibc-nav__menu">
                <ul className="ibc-nav__main-menu">
                  {map(menu, (item, index) => (
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
                    <a
                      className="ibc-nav__link"
                      href="/"
                      target="_self"
                      onClick={handleClickLanguage}
                    >
                      <GlobalCountry width="30" />
                      <span>Global</span>
                      <i className="fa-solid fa-caret-down"></i>
                      <i className="fa-solid fa-caret-up"></i>
                    </a>
                  </li>
                  <li>
                    <a className="ibc-nav__link" href="/" onClick={handleClickLanguage}>
                      <span>EN</span>
                      <i className="fa-solid fa-caret-down"></i>
                      <i className="fa-solid fa-caret-up"></i>
                    </a>
                  </li>
                  <li>
                    <Link href={{ pathname: `${OFFSHORE}/login` }}>
                      <a className="ibc-nav__link" target="_blank">
                        <Account className="ibc-nav__icon--profile" />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a className="ibc-nav__link" onClick={() => setIsShowSearch((x) => !x)}>
                      <Search className="ibc-nav__icon--search" />
                    </a>
                  </li>
                  {/* <li className="ibc-nav__button"> */}
                  <li className="ibc-btn-wrapper">
                    <a
                      className="ibc-custom-btn ibc-custom-btn--no-circle"
                      title="Make an Enquiry"
                      target="_self"
                      href="/make-an-enquiry"
                    >
                      <span>MAKE AN ENQUIRY</span>
                    </a>
                  </li>
                  {/* <Button
                      label="MAKE AN ENQUIRY"
                      variant="danger"
                      size="small"
                      href="/make-an-enquiry"
                    /> */}
                  {/* </li> */}
                </ul>
              </div>
            )}
          </div>
        </div>
        <MenuMobile isShow={isShow} onClose={handleClose} />
      </header>
    </>
  );
}
