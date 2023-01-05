import { Breadcrumbs, Typography } from '@mui/material';
import { selectBreadcrumb } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import style from '@scss/components/breadcrumb.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const BreadcrumbsComponent = () => {
  const router = useRouter();
  const [pathnames, setPathnames] = useState([]);
  const dataBreadcrumb = useAppSelector(selectBreadcrumb);

  useEffect(() => {
    let originPath = router.asPath;

    if (router.asPath.indexOf('#') > -1) {
      originPath = router.asPath.slice(0, router.asPath.indexOf('#'));
    }
    if (router.asPath.indexOf('?') > -1) {
      originPath = router.asPath.slice(0, router.asPath.indexOf('?'));
    }
    const path = originPath.split('/').filter((x) => x);

    setPathnames(path);
  }, [router.asPath]);
  return (
    <>
      <style jsx>{style}</style>
      <Breadcrumbs aria-label="breadcrumb" separator="|" className="ibc-breadcrumbs">
        {pathnames.length > 0 ? <Link href="/">Home</Link> : <Typography> Home </Typography>}
        {/* {pathnames.map((name, index) => {
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
        })} */}

        {dataBreadcrumb?.map((item, index) => {
          const isLast = index === dataBreadcrumb.length - 1;
          return isLast ? (
            <Typography key={`${index}`.toString()}>
              <span dangerouslySetInnerHTML={{ __html: item.name }} />
            </Typography>
          ) : (
            <Link href={`/${item.keyword}`} key={`${index}`.toString()}>
              {item.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};

export default BreadcrumbsComponent;
