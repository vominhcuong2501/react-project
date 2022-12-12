import { Button } from '@components/primitive';
import appStyle from '@scss/components/button-component.scss';

export default function ButtonComponent(props) {
  return (
    <div>
      <style jsx>{appStyle}</style>
      <Button {...props} label="Button" className="ibc-btn__group" />
    </div>
  );
}
