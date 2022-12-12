import InsightSelectBox from './SelectBox';

export default function Filter({
  optionsTags,
  optionsServices,
  selectOptionTopic,
  selectOptionService,
  ...props
}: any) {
  return (
    <div>
      <div className="ibc-container">
        <div className="ibc-container-content">
          <div className="ibc-insight__filter">
            <h2>Filter by</h2>
            <div className="ibc-insight__lastest__select-box">
              <InsightSelectBox
                options={optionsTags}
                selectedOption={selectOptionTopic.value}
                {...props}
                name="tags"
              />
              <InsightSelectBox
                options={optionsServices}
                selectedOption={selectOptionService.value}
                {...props}
                name="services"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
