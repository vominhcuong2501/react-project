import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styles from '@scss/components/ListMenu.scss';
import IconDown from '@svg/arrow-menu-down.svg';
import IconUp from '@svg/arrow-menu-up.svg';
import { get, map } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ListMenu({ currentItem, closeModal }: any) {
  const [selectedIndex, setSelectedIndex] = useState('');
  const router = useRouter();

  const handleClick = (url, index) => {
    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
  };

  const handleClickSubItem = (item, subs) => {
    if (item.url.indexOf('insights') > -1) {
      closeModal();

      router.push(`/${subs.url}`);
      return;
    }
    closeModal();
    router.push(`/${item.url}#${subs.url}`);
  };

  const handleCLickItem = (subs) => {
    closeModal();

    router.push(`/${subs}`);
  };

  return (
    <>
      <style jsx>{styles}</style>
      <div className="list_custom">
        <List
          className="box_list"
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {map(get(currentItem, 'sub', []), (item, index) => (
            <div key={item?.name}>
              <ListItemButton>
                <ListItemText primary={item.name} onClick={() => handleCLickItem(item.url)} />
                {get(item, 'sub.length', []) > 0 &&
                  (index === selectedIndex ? (
                    <IconUp onClick={() => handleClick(item.url, index)} />
                  ) : (
                    <IconDown onClick={() => handleClick(item.url, index)} />
                  ))}
              </ListItemButton>

              <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                <List component="ul" disablePadding>
                  {item.sub.length > 0 &&
                    item.sub.map((subs) => (
                      <ListItemButton component="li" className="list_submenu" key={subs.name}>
                        <ListItemText
                          primary={subs.name}
                          onClick={() => handleClickSubItem(item, subs)}
                        />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </div>
    </>
  );
}
