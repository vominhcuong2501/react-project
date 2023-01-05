// @typescript-eslint/no-use-before-define
import { ICountriesContact, IOfficeAllContact } from '@interfaces/contact-us';
import { useLoadScript } from '@react-google-maps/api';
import { getConfigContactMap, getConfigContactSelect } from '@redux/common/selectors';

import { useAppSelector } from '@redux/hooks';
import styles from '@scss/pages/contact-us/map.scss?type=scoped';
import { get, map, pick } from 'lodash';
import { useEffect, useState } from 'react';
import Map from './Map';

interface ServicesListProps {
  countriesService: ICountriesContact;
  officesAllService: IOfficeAllContact;
}
export default function MapContact({ countriesService, officesAllService }: ServicesListProps) {
  const areaServicesData = get(countriesService, 'areas', []);
  const listServicesData = get(countriesService, 'countries', []);
  const listAllServicesData = get(officesAllService, 'office_all', []);

  const titleMap = get(useAppSelector(getConfigContactMap), 'config.content', null);
  const configMap = JSON.parse(get(useAppSelector(getConfigContactSelect), 'config.content', null));

  const [isLoad, setIsLoaded] = useState(false);
  const [locale, setLocale] = useState(areaServicesData);
  const [nations, setNations] = useState([]);
  const [nationsArea, setNationsArea] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBSEa8zdNVPbKS_CmUe4HYNIc8tedjuLaA',
  });
  const { area, country } = pick(configMap, ['area', 'country']);
  const defineLocationDataFrist = (data) =>
    data.map((item) => ({
      id: item.id,
      name: item.name,
      code: item.code,
      area_id: item.area_id,
      position: {
        lat: Number(item.lat || 0),
        lng: Number(item.lng || 0),
      },
    }));
  const retrieveNationList = (value) => {
    const result = listServicesData.filter((item) => item.area_id === value);
    setNationsArea([...defineLocationDataFrist(result)]);
  };
  const defineLocationData = (data) =>
    data.map((item) => ({
      id: item.id,
      name: item.name,
      address: item.address,
      working: item.working,
      position: {
        lat: Number(item.lat || 0),
        lng: Number(item.lng || 0),
      },
    }));
  const handleChangeRegion = (e) => {
    const selectedValue = e.target.value;
    retrieveNationList(selectedValue);
  };
  const handleChangeNation = (e) => {
    const result = listAllServicesData.filter((item) => item.country_code === e.target?.value);
    setNations([...defineLocationData(result)]);
  };
  useEffect(() => {
    setIsLoaded(isLoaded);
    setNations([...defineLocationData(listAllServicesData)]);
  }, [isLoaded]);

  useEffect(() => {
    setTimeout(() => {
      setLocale([...locale]);
    }, 5000);
  }, []);

  return (
    <>
      <style jsx>{styles}</style>
      <section className="ibc_touch ibc-main ibc-map ">
        <div className=" ibc-map_title">
          <div
            className="ibc-difference__content"
            dangerouslySetInnerHTML={{ __html: titleMap }}
          ></div>
          <div className="box_select_map">
            <label htmlFor="">{get(area, 'label', '')}</label>
            <select className="browser-default custom-select" onChange={handleChangeRegion}>
              <option>{get(area, 'select', '')}</option>
              {map(locale, (item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="box_select_map">
            <label htmlFor="">{get(country, 'label', '')}</label>
            <select
              className="browser-default custom-select"
              onChange={handleChangeNation}
              disabled={nations.length === 0}
            >
              <option>{get(country, 'select', '')}</option>

              {map(nationsArea, (item) => (
                <option key={item.id} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className=" ibc-map_select">
          <div style={{ height: '100%', width: '100%' }}>
            {isLoad ? <Map locales={nations} /> : null}
          </div>
        </div>
      </section>
    </>
  );
}
