import { Box, Tab, Tabs } from '@mui/material';
import Typography from '@mui/material/Typography';
import styleInformation from '@scss/components/information.scss';
import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Information() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <style jsx>{styleInformation}</style>
      <div className="ibc-information">
        <div className="ibc-information__content">
          <div className="ibc-information__content__title">
            <div>
              <h1>Legal Disclaimer</h1>
              <p>Updated time: 16 Apr, 2020, 18:00 (UTC+08:00)</p>
            </div>
            <div className=" button_update">
              <div className="ibc__form__box__button ">
                <button>
                  <a
                    href="#"
                    target="_self"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <img src="./images/Download-icon.svg" alt="Download-icon.svg" />
                    <span>Download Now</span>
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="ibc-content-format">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Safeguard" {...a11yProps(0)} />
                <Tab label="Statement on conduct" {...a11yProps(1)} />
                <Tab label="Client KYC requirement" {...a11yProps(2)} />
                <Tab label="Client KYC requirement" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className="ibc-informat-border">
                <h2>1.Overview</h2>
              </div>
              <br />
              <p>Non-cooperative jurisdictions</p>
              <br />
              <p>
                The website www.oneibc.com is administered by One IBC Limited, a company registered
                in the Hong Kong SAR (License Number: TC001305) whose registered office is Unit
                1411, 14/Floor, Cosco Tower, 183 Queens Road Central, Sheung Wan, Hong Kong and/or
                One IBC Pte. Ltd, a company registered in Singapore whose registered office is 1
                Raffles Place, #40-02, One Raffles Place, Office Tower 1, Singapore 048616 (License
                Number: FA20180115)
              </p>
              <br />
              <p>
                Any articles or publications contained on this website are not intended to provide
                specific business or investment advice. No responsibility for any errors or
                omissions nor loss occasioned to any person or organization acting or refraining
                from acting as a result of any material in this website can, however, be accepted by
                the author(s) or One IBC Limited or/and One IBC Pte.Ltd. You should take specific
                independent advice before making any business or investment decision.
              </p>
              <br />
              <p>
                One IBC Group is the brand used by a network of independent company formation,
                accounting and consulting firms, each of which practices in its own right. The
                network is not itself a separate legal entity of any description in any
                jurisdiction.
              </p>
              <br />
              <ul>
                <li>
                  The network is administered by One IBC AG, whose registered office in
                  Hinterbergstrasse 48, Steinhausen, Switzerland
                </li>
                <li>
                  The brand and trademark One IBC and other intellectual property rights used by
                  members of the network are owned by One IBC AG, a registered company in
                  Switzerland.
                </li>
              </ul>
              <br />
              <p>
                All the name and logo of the banks used on the website One IBC Group are all
                trademarks of the banks and One IBC does not hold any ownership to these properties.
                All the banks listed are all One IBCs business partners and are subject to the
                agreements between the parties involved.
              </p>
              <br />
              <div className="ibc-informat-border">
                <h2>Contact Us</h2>
              </div>
              <br />
              <p>
                <i className="fa-light fa-location-dot"></i> Unit 1411, 14/Floor, Cosco Tower, 183
                Queens Road Central, Sheung Wan, Hong Kong.
              </p>
              <br />
              <p>
                <i className="fa-regular fa-phone"></i> +852 8199 0825
              </p>
              <br />
              <p>
                <i className="fa-regular fa-envelope"></i> support@oneibc.com
              </p>
              <br />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}
