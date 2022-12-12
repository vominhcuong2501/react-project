import Breadcrumb from '@components/primitive/Breadcrumb';
import { get } from 'lodash';

interface DetailServicesProps {
  configFuture: any;
  name: string;
  articles: any;
}
export default function DetailServices({ configFuture, name, articles }: DetailServicesProps) {
  const configFutureData = get(configFuture, 'service.content', null);

  return (
    <section className="ibc-services">
      <div className="ibc-services__fluid">
        <div className="ibc-services__container">
          <div className="ibc-services__main">
            <div className="ibc-services__breadcrumb">
              <Breadcrumb></Breadcrumb>
            </div>

            <h1>{name}</h1>
            <section dangerouslySetInnerHTML={{ __html: configFutureData }} />
            {/* <div className="ibc-services__description">
              <div className="ibc-services__content">
                <div className="ibc-services__content--image">
                  <a href="#">
                    <img src="/images/service-top-detail.jpg" alt="#" width="585" height="660" />
                  </a>
                </div>
                <div className="ibc-services__content--text">
                  <p>
                    Organizations at all stages of their life cycle have visions for the future,
                    including medium to long-term performance goals. The leaders should also have a
                    clear vision of how to achieve the defined goals and maximize the potential
                    value creation. At One IBC, we offer comprehensive consulting services that
                    cover all aspects of Corporate Strategy. We believe that developing a clear
                    strategy that plays to your strengths is the best and most efficient way.
                    Strategic planning, which represents the output of decisions made regarding an s
                    future strategy, is an essential component of this process. Having support from
                    professional advisors in making strategic decisions ensures that conclusions
                    drawn are based on solid foundations, including comparison of alternative
                    options, which should result in better choices for the company.
                  </p>
                </div>
              </div>
            </div>
            <div className="ibc-services__provide">
              <h2>What We Provide</h2>
              <p>
                We understand the struggles of conducting an in-depth analysis of your business
                goals and objectives to build a corporate strategy. We provide an outside, expert
                perspective on your business challenges. Our services offer professional advice on
                difficult issues and ensure that your business grow in the right direction.
              </p>
            </div> */}

            <ul className="ibc-services__item">
              {/* <li>
                <img src="/images/item-detail-1.jpg" alt="" />
                <div>
                  <h3>Market Entry Research</h3>
                  <p>
                    Conducting Market Research is the very first and crucial step before entering
                    new markets. A Market Entry Plan is vital for getting a clear picture of your
                    objectives. Therefore, having support from a professional consultant will guide
                    you to achieve your goals when entering a new market. We are confident that we
                    can provide you with an easier way to succeed.
                  </p>
                </div>
              </li>
              <li>
                <img src="/images/item-detail-4.jpg" alt="" />
                <div>
                  <h3>Sales, Marketing & Growth</h3>
                  <p>
                    Sales & Marketing play an important role in winning customers and promoting
                    growth. One IBC® is located where Sales and Marketing converge. To find, specify
                    and implement the best course of action for your organization, we provide
                    consultation services surrounding sales, marketing and growth with in-depth
                    research, attentive personalized care and exacting analytical rigor.
                  </p>
                </div>
              </li> */}
              {/* <li>
                <img src="/images/item-detail-3.jpg" alt="" />
                <div>
                  <h3>Corporate Strategy</h3>
                  <p>
                    From start-ups to industry leaders, developing a corporate strategy is critical
                    to achieving goals and ensuring long-term success in business. At its core,
                    corporate strategy is concerned with the entirety of a business, where decisions
                    are made regarding its overall growth and direction. Our Corporate Strategy
                    consulting service seeks to create value, develop a distinct marketing
                    advantage, and capture the greatest possible market share.
                  </p>
                </div>
              </li> */}

              {articles?.length > 0 &&
                articles.map((item) => (
                  <li key={item.id}>
                    <img src={item.icon} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <div dangerouslySetInnerHTML={{ __html: item?.content || '' }}></div>
                      {/* <p>
                        From start-ups to industry leaders, developing a corporate strategy is
                        critical to achieving goals and ensuring long-term success in business. At
                        its core, corporate strategy is concerned with the entirety of a business,
                        where decisions are made regarding its overall growth and direction. Our
                        Corporate Strategy consulting service seeks to create value, develop a
                        distinct marketing advantage, and capture the greatest possible market
                        share.
                      </p> */}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
