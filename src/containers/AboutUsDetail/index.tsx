import detailStyle from '@scss/pages/about-us-detail/index.scss';
import { groupFunc } from '@utils/helpers';
import { map, sortBy, uniqBy } from 'lodash';

interface AboutUsOfficesProps {
  article: {
    iss: string;
    iat: number;
    isSuccessful: string;
    article: {
      id: string;
      keyword: string;
      name: string;
      icon: string;
      icon_mobile: string;
      title: string;
      meta_keyword: string;
      meta_description: string;
      meta_image: string;
      update_time: string;
      content: string;
      type_id: string;
    };
    relate: any;
    offices: any;
  };
}

export default function AboutUsDetail({ article }: AboutUsOfficesProps) {
  // Group data follow key area_name
  const sortData = groupFunc(article.offices, 'area_name');

  // Get keys from array and filter get unit key
  const filterDataGetUnit = uniqBy(article.offices, 'area_id');

  // Custom data and sort data
  const groupArea = map(filterDataGetUnit, (item: any) => item.area_name);
  const finalData = sortBy(
    map(groupArea, (item) => ({
      name: item,
      data: sortData[item],
    })),
    (o) => o.name,
  );

  return (
    <main>
      <style jsx>{detailStyle}</style>

      <div className="ibc-offices__list">
        {/* Our Offices Item Custom Data */}
        {map(finalData, (item) => (
          <section key={item.name}>
            <div className="ibc-about-us__our-offices">
              <div className="ibc-about-us__our-offices__group-country">
                <div className="ibc-about-us__our-offices__group-country__title">
                  <h2>{item.name}</h2>
                </div>
                <div className="row">
                  {map(item.data, (office) => (
                    <div className="col-lg-3 col-sm-6 col-12" key={office.id}>
                      <a href="#" target="_self" title="Country">
                        <div className="ibc-about-us__our-offices__group-country__card">
                          <div className="ibc-about-us__our-offices__group-country__card__header">
                            <img
                              src={office.icon}
                              alt="Offices"
                              title="Offices"
                              width="28"
                              height="20"
                            />
                            <h3>{office.country_name}</h3>
                          </div>
                          <div className="ibc-about-us__our-offices__group-country__card__content">
                            <i className="fa-regular fa-location-dot"></i>
                            <p>{office.address}</p>
                          </div>
                          <div className="ibc-about-us__our-offices__group-country__card__footer">
                            <img
                              src="/images/icon-legal.svg"
                              alt="Legal"
                              title="Legal"
                              width="24"
                              height="24"
                            />
                            <p>{office.name}</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
