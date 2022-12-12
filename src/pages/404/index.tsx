import appStyle from '@/scss/pages/404/index.scss';
import { MainLayout } from '@components/compound';
import NotFoundPageSVG from '@svg/error-404.svg';

export default function NotFound() {
  return (
    <>
      <style jsx>{appStyle}</style>
      <div className="ibc_notfound">
        <NotFoundPageSVG />
      </div>
    </>
  );
}

NotFound.Layout = MainLayout;
