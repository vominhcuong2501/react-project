import insightFilter from '@scss/layout/insight.scss';
import { useId } from 'react';
import Select from 'react-select';
import InsightSelectBox from './SelectBox';

export default function Filter({
  optionsTags,
  optionsServices,
  selectOptionTopic,
  selectOptionService,
  ...props
}: any) {
  interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
  }

  interface FlavourOption {
    readonly value: string;
    readonly label: string;
    readonly rating: string;
  }

  interface GroupedOption {
    readonly label: string;
    readonly options: readonly ColourOption[] | readonly FlavourOption[];
  }

  const handleSelectChange = (value) => {
    props.onChange({ name: 'services', selectOption: value });
  };
  return (
    <>
      <style jsx>{insightFilter}</style>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-insight__filter">
            <h2>Filter by</h2>
            <div className="ibc-insight__lastest__select-box ">
              {optionsTags && (
                <InsightSelectBox
                  options={optionsTags}
                  selectedOption={selectOptionTopic.value}
                  {...props}
                  name="tags"
                />
              )}

              {/* {optionsServices && (
                <InsightSelectBox
                  options={optionsServices}
                  selectedOption={selectOptionService.value}
                  {...props}
                  name="services"
                />
              )} */}

              {optionsServices && (
                <div className="ibc-group-select">
                  <Select<ColourOption | FlavourOption, false, GroupedOption>
                    options={optionsServices}
                    onChange={handleSelectChange}
                    instanceId={useId.toString()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
