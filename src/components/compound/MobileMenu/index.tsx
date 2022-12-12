import appStyle from '@/scss/components/mobile-menu.scss?type=scoped';
import ListMenu from '@components/primitive/ListMenu';
import { selectHeaderMenu } from '@redux/app/selecters';
import { useAppSelector } from '@redux/hooks';
import IconLogin from '@svg/account-menu.svg';
import Close from '@svg/close.svg';
import LogoOneIbc from '@svg/logo-oneibc-black.svg';
import Search from '@svg/search-menu.svg';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SelectForm } from '../GroupSelect';

const data = [
  {
    id: 1,
    value: 51561,
    label: 'EN',
  },
  {
    id: 2,
    value: 4,
    label: 'VI',
  },
];
const data2 = [
  {
    id: 1,
    value: 51561,
    label: 'English',
    image: '../images/Language.png',
  },
  {
    id: 2,
    value: 4,
    label: 'Vietnam',
    image: '../images/Language.png',
  },
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
                <div className="ibc-mobile-sidebar__logo_box">
                  <LogoOneIbc />
                </div>
              </div>

              <div className="ibc-mobile-sidebar__menu">
                <div className="ibc-mobile-sidebar__menu__search">
                  <input type="text" placeholder="Services, News, Promotion..." />
                  <div className="icon-search">
                    <Search />
                  </div>
                </div>
                <div className="ibc-mobile-sidebar__menu_list-menu">
                  <ul>
                    {menuHeaderStore.map((item) => (
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
                      Language
                      <SelectForm
                        instanceId="select1"
                        OptionLIst={data}
                        onChange={(e: any) => setPhoneCountry(e.value)}
                        value={phoneCountry}
                      />
                    </li>
                    <li>
                      Location
                      <SelectForm
                        instanceId="select1"
                        OptionLIst={data2}
                        onChange={(e: any) => setPhoneCountry(e.value)}
                        value={phoneCountry}
                      />
                      <img src="" alt="" />
                    </li>
                  </ul>
                </div>
                <div className="ibc-mobile-sidebar__menu_login_btn">
                  <button className="ibc-menu-basic">
                    <IconLogin />
                    <a
                      href="https://www.offshorecompanycorp.com/login"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Log In
                    </a>
                  </button>
                  <button className="ibc-menu-medium">
                    <Link href="/make-an-enquiry">
                      <a title="Make an Enquiry" target="_self">
                        Make an Enquiry
                      </a>
                    </Link>
                  </button>
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
