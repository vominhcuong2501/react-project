import { LIMIT_PAGINATE, PER_PAGE } from '@/constants/config';
import Pagination from '@components/primitive/Pagination';
import { useAppSelector } from '@redux/hooks';
import { selectServicesOptions, selectTopicOptions } from '@redux/insights/selecters';
import appStyle from '@scss/pages/inside-detail/index.scss';
import insightServices from '@services/insight';
import { convertRouteName } from '@utils/helpers';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import List from '../Insights/List';

export default function InsightsDetailPage({ detailPage, noData }: any) {
  const configNodata = get(noData, 'config.content', '');
  const [dataCurrentPage, setDataCurrentPage] = useState(get(detailPage, 'data', []));
  const topic = useAppSelector(selectTopicOptions);
  const service = useAppSelector(selectServicesOptions);
  const nameType = get(detailPage, 'type.name', '');
  const router = useRouter();
  const { id } = router.query;
  const title = convertRouteName(router);
  const [totalPage, setTotalPage] = useState(detailPage.total);
  const insightsRef = useRef(null);

  const handlePageChange = async (page, param) => {
    const reqDataGetArticle: any = {
      limit: LIMIT_PAGINATE,
      page,
      type: id,
      table: 'insights',
      ...param,
    };
    const response: any = await insightServices.getInsightDetailPageClient(reqDataGetArticle);
    setTotalPage(response.total);
    setDataCurrentPage(response?.data || 0);
  };

  useEffect(() => {
    if (topic || service) {
      handlePageChange(1, {
        topic: topic.tag_id,
        service: service.id,
      });
      return;
    }
    handlePageChange(1, null);
  }, [topic, service, router.asPath]);

  return (
    <>
      <style jsx>{appStyle}</style>
      <div className="ibc-insight__detail" ref={insightsRef}>
        <div className="ibc-container">
          <div className="ibc-container-content">
            <h1>{nameType}</h1>
          </div>
        </div>

        {totalPage > 0 ? (
          <List disableBorderBottom data={dataCurrentPage} title={title} isDetail />
        ) : (
          <div
            className="ibc-container-content ibc-container-content__nodata"
            dangerouslySetInnerHTML={{ __html: configNodata }}
          />
        )}

        <div className="ibc-container">
          <div className="ibc-container-content">
            {totalPage > PER_PAGE && (
              <Pagination
                itemsPerPage={PER_PAGE}
                onPageChange={(page) => handlePageChange(page, null)}
                totalPage={totalPage || detailPage.total}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
