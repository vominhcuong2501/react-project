import appStyle from '@scss/components/select.scss';
import SelectComponent, { components } from 'react-select';

export default function Select() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const CaretDownIcon = () => (
    <div>
      <i className="fa-solid fa-caret-down"></i>
    </div>
  );

  const style = {
    placeholder: (base) => ({
      ...base,
      fontSize: '1.6rem',
      fontWeight: 400,
    }),
  };

  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );

  return (
    <>
      <style jsx>{appStyle}</style>
      <SelectComponent options={options} components={{ DropdownIndicator }} styles={style} />
    </>
  );
}
