import { useDisplay } from '@hooks/useDisplay';
import nextStyle from '@scss/components/next-image.scss';
import classNames from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';

interface IProps {
  src?: string;
  objectFit?: 'cover' | 'contain';
  alt?: string;
  className?: string;
  width?: string;
  height?: string;
  title?: string;
  mobileSrc?: string;
  hover?: boolean;
}

const defaultProps = {
  alt: 'ibc-img',
  className: '',
  hover: true,
};

const NextImage: FC<IProps> = ({
  src,
  alt,
  className,
  objectFit,
  width,
  height,
  title,
  mobileSrc,
  hover,
  ...props
}) => {
  const [isError, setError] = useState(false);
  const isMobile = useDisplay();
  const temp = useMemo(() => (isMobile && !!mobileSrc ? mobileSrc : src), [isMobile, src]);

  useEffect(() => {
    if (!temp) {
      setError(true);
    } else {
      const newImg = new Image();
      newImg.src = temp;
      newImg.onerror = () => {
        setError(true);
      };
    }
  }, [src, temp]);

  return (
    <>
      <style jsx>{nextStyle}</style>
      <img
        src={!isError ? temp : ''}
        alt={alt}
        className={classNames(['ibc-image', className])}
        style={{ objectFit: isError ? 'cover' : objectFit, cursor: hover && 'pointer' }}
        width={width}
        height={height}
        title={title}
        {...props}
      />
    </>
  );
};

NextImage.defaultProps = defaultProps;

export default NextImage;
