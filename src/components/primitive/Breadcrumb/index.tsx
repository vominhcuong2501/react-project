import { Breadcrumbs, Typography } from '@mui/material';
import style from '@scss/components/breadcrumb.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BreadcrumbsComponent = () => {
  const router = useRouter();
  const pathnames = router.asPath.split('/').filter((x) => x);
  return (
    <>
      <style jsx>{style}</style>
      <Breadcrumbs aria-label="breadcrumb" separator="|" className="ibc-breadcrumbs">
        {pathnames.length > 0 ? <Link href="/">Home</Link> : <Typography> Home </Typography>}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const customName = name
            .split('-')
            .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
            .join(' ');
          return isLast ? (
            <Typography key={customName}>{customName}</Typography>
          ) : (
            <Link key={customName} href={routeTo}>
              {customName}
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};

export default BreadcrumbsComponent;
