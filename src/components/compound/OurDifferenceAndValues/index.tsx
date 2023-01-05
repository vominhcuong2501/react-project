import { getConfigOurDifferenceAndValues } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import OurDifferenceAndValuesStyle from '@scss/components/our-difference-and-value.scss?type=scoped';

export default function OurDifferenceAndValues() {
  const ourDifferenceAndValues = useAppSelector(getConfigOurDifferenceAndValues);

  return (
    <>
      <style jsx>{OurDifferenceAndValuesStyle}</style>
      <section
        className=" ibc-difference ibc-container-content"
        dangerouslySetInnerHTML={{ __html: ourDifferenceAndValues }}
      />
    </>
  );
}
