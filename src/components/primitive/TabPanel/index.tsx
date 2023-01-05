/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

function TabPanel({ children, value, index, ...props }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="ibc-tab__panel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export default TabPanel;
