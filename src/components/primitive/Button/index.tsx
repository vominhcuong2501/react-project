import styles from '@/scss/components/button.scss?type=scoped';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import classnames from 'classnames';

interface IProps {
  type?: 'submit' | 'reset' | 'button';
  size?: string;
  label?: string;
  isError?: boolean;
  isFull?: boolean;
  loading?: boolean;
  onClick?: (e: any) => void;
  disabled?: boolean;
  variant?: string;
  className?: string;
  href?: string;
}

const defaultProps = {
  type: 'button',
  isFull: true,
  loading: false,
  onClick: () => null,
  disabled: false,
  variant: 'primary',
  className: '',
  href: '#',
};

function Button({
  type,
  size,
  label,
  isError,
  isFull,
  loading,
  className,
  onClick,
  variant,
  ...props
}: IProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <a
        type={type}
        className={classnames([
          'ibc-btn',
          `ibc-btn--${size}`,
          `ibc-btn--${variant}`,
          { 'ibc-btn--full': isFull },
          { 'ibc-btn--error': isError },
          { 'ibc-btn--loading': loading },
          className,
        ])}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <span className="ibc-btn__loading-icon">
            <CachedRoundedIcon />
          </span>
        )}
        <span className="ibc-btn__text">{label}</span>
      </a>
    </>
  );
}

Button.defaultProps = defaultProps;

export default Button;
