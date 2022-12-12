import GroupPagination from '@components/compound/GroupPagination';
import Pagination from '@components/primitive/Pagination';
import SelectBox from '@components/primitive/SelectBox';
import SideBar from '@containers/GroupComponents/Sidebar';
import styleApp from '@scss/pages/group-components/index.scss';
import ButtonComponent from './Button';
import ComponentsCareer from './ComponentsCareer';
import ComponentsFaq from './ComponentsFaq';
import FormModalSubscribe from './FormModalSubscribe';
import Information from './Information';

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
          <Information />
        </div>
      </div>
    </div>
  );
}
