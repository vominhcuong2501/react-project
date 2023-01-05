import { useToggle } from '@hooks/useToggle';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconDown from '@svg/arrow-menu-down.svg';
import IconUp from '@svg/arrow-menu-up.svg';
import { map } from 'lodash';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function DropDown({ data }: any) {
  const [isTextChanged, setIsTextChanged] = useToggle();
  const router = useRouter();
  const dropDownItemRef = useRef(null);

  const handleClick = (url) => {
    router.push(`/consulting-services/${url.keyword}`);
  };

  const handleDropDownActive = () => {
    setIsTextChanged();
    dropDownItemRef.current.style.background = 'white';
  };

  return (
    <div>
      <ListItemButton onClick={() => handleDropDownActive()} ref={dropDownItemRef}>
        <ListItemText primary="Services" />
        {isTextChanged ? <IconUp /> : <IconDown />}
      </ListItemButton>

      <Collapse in={isTextChanged} timeout="auto" unmountOnExit>
        <List component="ul" disablePadding>
          {map(data, (item) => (
            <ListItemButton
              component="li"
              className="list_submenu"
              key={item.id}
              onClick={() => handleClick(item)}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </div>
  );
}
