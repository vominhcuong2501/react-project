import mainStyle from '@/scss/components/expand.scss?type=scoped';
import ArrowRight from '@svg/arrow-right.svg';
import Link from 'next/link';

interface ExpandProps {
  link?: string;
  target?: string;
  label?: string;
}

export default function Expand({ link, target, label }: ExpandProps) {
  return (
    <>
      <style jsx>{mainStyle}</style>

      <div>
        <Link href={link}>
          <a target={target || '_self'}>{label}</a>
        </Link>
        <span>
          <ArrowRight></ArrowRight>
        </span>
      </div>
    </>
  );
}
