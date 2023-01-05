import { getContent } from '@redux/common/selectors';
import { useAppSelector } from '@redux/hooks';
import styleDetail from '@scss/components/group-style-first-detail.scss?type=scoped';

export default function GroupStyleFirstDetail() {
  const content = useAppSelector(getContent);

  return (
    <section>
      <style jsx>{styleDetail}</style>
      <div className="ibc-group-detail__description">
        <div className="ibc-group-detail__content">
          <div className="ibc-group-detail__content--image">
            <a href="#">
              <img src="/images/group-first-detail.jpg" alt="" />
            </a>
          </div>
          <div className="ibc-group-detail__content--text">
            <p>
              One IBC is one brand used by a network of independent company formation including
              accounting and consulting firms, each of which practices in its own right. The network
              is not itself a separate legal entity of any description in any jurisdiction. The
              network is administered by One IBC Limited, a company registered in Hong Kong SAR
              (License Number: TC001305) whose registered office is Unit 1411, 14/Floor, Cosco
              Tower, 183 Queens Road Central, Sheung Wan, Hong Kong. The brand and trademark One IBC
              and other intellectual property rights used by members of the network are owned by One
              IBC Limited. Listed below are active client facing entities within the One IBC®
              network
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
