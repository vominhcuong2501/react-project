import GroupPagination from '@components/compound/GroupPagination';
import CustomButtonExpands from '@components/primitive/CustomButtonExpand';
import Pagination from '@components/primitive/Pagination';
import SelectBox from '@components/primitive/SelectBox';
import SideBar from '@containers/GroupComponents/Sidebar';
import styleApp from '@scss/pages/group-components/index.scss';
import AboutUsBanner from './About-us-banner';
import AboutUsGroup from './About-us-group';
import ButtonComponent from './Button';
import ComponentsCareer from './ComponentsCareer';
import ComponentsFaq from './ComponentsFaq';
import Coporate from './Coporate';
import FormModalSubscribe from './FormModalSubscribe';
import Search from './Search';
import SidebarLicenses from './SidebarLicenses';

export default function GroupComponents() {
  const handleChange = (value) => value;
  const optionsTags = [
    { value: 'p1', name: 'Topics' },
    { value: 'p2', name: 'Topics 2' },
    { value: 'p3', name: 'Topics 3' },
  ];

  const newData = optionsTags.map((item) => ({
    ...item,
    label: item.name,
  }));

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <style jsx>{styleApp}</style>
      <h1>Elements</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '500px' }}>
        <h1>Components Sidebar</h1>

        <div>
          <SideBar></SideBar>
        </div>

        <div>
          <GroupPagination currentPage={1} lengthPage={10} onPageChange={handleChange} />
        </div>

        <div>
          <Pagination itemsPerPage={2} totalPage={6} />
        </div>

        <div>
          <FormModalSubscribe />
        </div>

        <div>
          <ComponentsCareer />
        </div>

        <div>
          <ComponentsFaq />
        </div>

        <div>
          <SelectBox options={newData} />
        </div>

        <ButtonComponent className="ibc-btn" />

        <div>
          {/* <Information /> */}
          <CustomButtonExpands />
        </div>

        <div>
          <AboutUsBanner />
        </div>

        <div>
          <AboutUsGroup />
        </div>

        <div>
          <Coporate />
        </div>

        <div>
          <SidebarLicenses />
        </div>

        <div>
          <Search />
        </div>
      </div>
    </div>
  );
}
