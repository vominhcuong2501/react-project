import SelectBox from '@components/primitive/SelectBox';

export default function InsightSelectBox({ options, ...props }: any) {
  return (
    <div>
      <SelectBox options={options} className="ibc-insight__select-box" {...props} />
    </div>
  );
}
