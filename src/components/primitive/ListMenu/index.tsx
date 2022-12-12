import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import styles from '@scss/components/ListMenu.scss';
import IconDown from '@svg/arrow-menu-down.svg';
import IconUp from '@svg/arrow-menu-up.svg';
import { useState } from 'react';

export default function ListMenu({ currentItem }: any) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');

  const handleClick = (url, index) => {
    setOpen(!open);
    // closeModal();
    // route.push(`/${url}`);

    if (selectedIndex === index) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
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
          {currentItem?.sub?.map((item, index) => (
            <div key={item?.name}>
              <ListItemButton onClick={() => handleClick(item.url, index)}>
                <ListItemText primary={item.name} />
                {item.sub.length > 0 && (index === selectedIndex ? <IconUp /> : <IconDown />)}
              </ListItemButton>

              <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                <List component="ul" disablePadding>
                  {item.sub.length > 0 &&
                    item.sub.map((subs) => (
                      <ListItemButton component="li" className="list_submenu" key={subs.name}>
                        <ListItemText primary={subs.name} />
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
