import buttonStyle from '@scss/components/custom-button-expand.scss';
import ArrowRight from '@svg/arrow-right.svg';
import classNames from 'classnames';

interface CustomButtonExpandsProps {
  type?: 'submit' | 'reset' | 'button';
  label?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  className?: string;
  variant?: 'no-circle' | 'primary' | 'light';
}

const defaultProps = {
  type: 'button',
  onClick: (event) => null,
  disabled: false,
  className: '',
  label: 'View full list',
  variant: '',
};

export default function CustomButtonExpands({
  type,
  label,
  className,
  variant,
  onClick,
  ...props
}: CustomButtonExpandsProps) {
  const handleClick = (e) => {
    e.preventDefault();

    onClick(e);
  };
  return (
    <>
      <style jsx>{buttonStyle}</style>

      <a
        className={classNames(['ibc-custom-btn', `ibc-custom-btn--${variant}`, className])}
        onClick={(event) => handleClick(event)}
        {...props}
      >
        <span>{label}</span> <ArrowRight />
      </a>
    </>
  );
}

CustomButtonExpands.defaultProps = defaultProps;
