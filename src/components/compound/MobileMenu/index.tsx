import appStyle from '@/scss/components/mobile-menu.scss';
import ListMenu from '@components/primitive/ListMenu';
import useClickID from '@hooks/useClickId';
import { selectHeaderMenu } from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import Close from '@svg/close.svg';
import LogoOneIbc from '@svg/logo-oneibc-black.svg';
import Search from '@svg/search-menu.svg';
import classNames from 'classnames';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchInputComponent from '../GroupHeader/SearchInput';
import { SelectForm } from '../GroupSelect';

const data = [
  {
    id: 1,
    value: 51561,
    label: 'EN',
  },
  // {
  //   id: 2,
  //   value: 4,
  //   label: 'VI',
  // },
];
const data2 = [
  {
    id: 1,
    value: 51561,
    label: 'Global',
    image: '../images/international.jpg',
  },
  // {
  //   id: 2,
  //   value: 4,
  //   label: 'Vietnam',
  //   image: '../images/Language.png',
  // },
];

const listSubMenu = {
  sub: [
    {
      name: 'item 1',
      url: 'http://google.com',
    },
    {
      name: 'item 2',
      url: 'http://google.com',
    },
  ],
};
interface MenuMobileProps {
  isShow: boolean;
  onClose: () => void;
}

export default function MenuMobile({ isShow, onClose }: MenuMobileProps) {
  const [phoneCountry, setPhoneCountry] = useState(data[0].value);
  const [isFirstMenuShow, setIsFirstMenuShow] = useState(true);
  const [isSecondMenuShow, setIsSecondMenuShow] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const route = useRouter();

  const handleClickFirstItem = (item) => {
    if (item.sub.length === 0) {
      route.push(`/${item.url}`);
      onClose();
      return;
    }
    setIsFirstMenuShow(false);
    setIsSecondMenuShow(true);
    setCurrentItem(item);
  };
  const handleClickSecondItem = () => {
    setIsFirstMenuShow(true);
    setIsSecondMenuShow(false);
  };
  const closeModal = () => {
    setIsFirstMenuShow(true);
    setIsSecondMenuShow(false);
    onClose();
  };
  const handClickIconFirstItem = (item) => {
    closeModal();
    route.push(`/${item.url}`);
  };
  const handleClickSecondRoute = () => {
    route.push(`/${currentItem.url}`);
    closeModal();
  };

  const menuHeaderStore = useAppSelector(selectHeaderMenu);

  useClickID('arrow-down', '/');

  return (
    <>
      <style jsx>{appStyle}</style>
      <nav className={classNames('ibc-mobile-sidebar', { 'ibc-mobile-sidebar__open': isShow })}>
        <div className="ibc-mobile-sidebar__container">
          <div
            className={classNames('ibc-mobile-sidebar__main', {
              'ibc-mobile-sidebar__open': true,
            })}
          >
            {/* first menu */}
            <div
              className={classNames('ibc-mobile-sidebar__first', {
                'ibc-mobile-sidebar__first--open': isFirstMenuShow,
              })}
            >
              <div className="ibc-mobile-sidebar__logo">
                <button onClick={closeModal}>
                  <Close />
                </button>
                <div className="ibc-mobile-sidebar__logo_box" onClick={() => route.push('/')}>
                  {/* <LogoOneIbc /> */}
                  <img src="/images/one-ibc-logo.svg" alt="arrow-down" id="arrow-down" />
                </div>
              </div>

              <div className="ibc-mobile-sidebar__menu">
                <div className="ibc-mobile-sidebar__menu__search">
                  {isShow && <SearchInputComponent />}
                  <div className="icon-search">
                    <Search />
                  </div>
                </div>
                <div className="ibc-mobile-sidebar__menu_list-menu">
                  <ul>
                    {map(menuHeaderStore, (item) => (
                      <li key={item.name}>
                        <a
                          target="_self"
                          rel="noreferrer"
                          title={item.name}
                          onClick={() => handleClickFirstItem(item)}
                        >
                          {item.name}
                          <i
                            className="fal fa-long-arrow-right"
                            onClick={() => handClickIconFirstItem(item)}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="ibc-mobile-sidebar__menu_login">
                <div className="ibc-mobile-sidebar__menu_login_localtion">
                  <ul>
                    <li>
                      Location
                      <SelectForm
                        instanceId="select1"
                        OptionLIst={data2}
                        onChange={(e: any) => setPhoneCountry(e.value)}
                        value={phoneCountry}
                      />
                    </li>
                    <li>
                      Language
                      <SelectForm
                        instanceId="select1"
                        OptionLIst={data}
                        onChange={(e: any) => setPhoneCountry(e.value)}
                        value={phoneCountry}
                      />
                    </li>
                  </ul>
                </div>

                <div className="ibc-mobile-sidebar__menu_login_btn">
                  <div className="ibc-btn-wrapper">
                    <a
                      className="ibc-custom-btn ibc-custom-btn--no-circle"
                      target="_blank"
                      rel="noreferrer"
                      onClick={onClose}
                      href="https://www.offshorecompanycorp.com/login"
                    >
                      <i className="fa-solid fa-circle-user"></i>
                      <span>Log In</span>
                    </a>
                  </div>
                  <div className="ibc-btn-wrapper">
                    <a
                      className="ibc-custom-btn ibc-custom-btn--no-circle"
                      title="Make an Enquiry"
                      target="_self"
                      onClick={onClose}
                      href="/make-an-enquiry"
                    >
                      <span>Make an Enquiry</span>
                    </a>
                  </div>
                  {/* <button className="ibc-menu-basic">
                    <IconLogin />
                    <a
                      href="https://www.offshorecompanycorp.com/login"
                      target="_blank"
                      rel="noreferrer"
                      onClick={onClose}
                    >
                      Make an Enquiry
                    </a>
                  </button>
                  <button className="ibc-menu-medium">
                    <Link href="/make-an-enquiry">
                      <a title="Make an Enquiry" target="_self" onClick={onClose}>
                        Make an Enquiry
                      </a>
                    </Link>
                  </button> */}
                </div>
              </div>
            </div>

            {/* second menu */}
            <div
              className={classNames('ibc-mobile-sidebar__second', {
                'ibc-mobile-sidebar__second--open': isSecondMenuShow,
              })}
            >
              <div className="ibc-mobile-sidebar__logo">
                <button onClick={closeModal}>
                  <Close />
                </button>
                <div className="ibc-mobile-sidebar__logo_box">
                  <LogoOneIbc />
                </div>
              </div>
              <div className="ibc-mobile-sidebar_submenu">
                <div className="ibc-mobile-sidebar_submenu_back">
                  <button onClick={handleClickSecondItem}>
                    <i className="far fa-chevron-left"></i>Main Menu
                  </button>
                </div>
                <div className="ibc-mobile-sidebar_submenu_list">
                  <div className="header_menu">
                    <a onClick={handleClickSecondRoute} target="_self">
                      {currentItem && currentItem.name}
                      <i className="fal fa-long-arrow-right"></i>
                    </a>
                  </div>
                  <div className="ibc-mobile-sidebar_submenu_list_item">
                    <ListMenu
                      listSubMenu={listSubMenu}
                      closeModal={closeModal}
                      currentItem={currentItem}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="overlay" onClick={closeModal}></section>
    </>
  );
}
