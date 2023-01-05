import linkStyle from '@scss/components/next-link.scss?type=scoped';
import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ILinkProps {
  href: string;
  className?: string;
  width?: string;
  height?: string;
  title?: string;
  hover?: boolean;
  target?: string;
  label?: string;
  scroll?: boolean;
  children?: ReactNode;
}

const defaultProps = {
  className: '',
  title: '',
  target: '_self',
  label: '',
  scroll: true,
};

export default function NextLink({
  href,
  className,
  width,
  height,
  title,
  target,
  label,
  children,
  scroll,
  ...props
}: ILinkProps) {
  return (
    <>
      <style jsx>{linkStyle}</style>
      <Link href={href} {...props} target={target} title={title} scroll={scroll}>
        <a target={target} title={title} className={classNames(['ibc-next-link', className])}>
          {label} {children}
        </a>
      </Link>
    </>
  );
}

NextLink.defaultProps = defaultProps;
