/* eslint-disable react/jsx-no-useless-fragment */
import tabStyles from '@scss/components/tab-pannel.scss';
import { ReactNode } from 'react';
/* eslint-disable react/jsx-no-useless-fragment */
import { AppBar, Tab as MaterialUITab, Tabs as MaterialUITabs } from '@mui/material';
import classNames from 'classnames';
import { map } from 'lodash';

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
interface TabProps {
  children: ReactNode;
  value: number;
  labels: ReactNode[];
  onChangeTabIndex?: ({ newValue }) => void;
  className?: string;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
}

const defaultProps = {
  onChangeTabIndex: () => null,
  className: '',
  disableFocusRipple: true,
  disableRipple: true,
};

function Tab({
  children,
  value,
  labels,
  onChangeTabIndex,
  className,
  disableFocusRipple,
  disableRipple,
  ...props
}: TabProps) {
  const handleTabChange = (event: any, newValue: number) => {
    onChangeTabIndex({ newValue });
  };

  return (
    <>
      <style jsx>{tabStyles}</style>
      <div className={classNames('ibc-tab', className)}>
        <AppBar position="static">
          <MaterialUITabs value={value} onChange={handleTabChange} {...props}>
            {map(labels, (label, index) => (
              <MaterialUITab
                key={index}
                label={label}
                disableRipple={disableRipple}
                disableFocusRipple={disableFocusRipple}
                {...a11yProps(index)}
              />
            ))}
          </MaterialUITabs>
        </AppBar>
        {children}
      </div>
    </>
  );
}

Tab.defaultProps = defaultProps;

export default Tab;
