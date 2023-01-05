import sidebarLicense from '@scss/components/sidebarLicense.scss';

export default function SidebarLicenses() {
  return (
    <>
      <style jsx>{sidebarLicense}</style>
      <div className="ibc-licenses__sidebar">
        <div className="ibc-licenses__sidebar__article">
          <h2>Other Licenses</h2>
          <div className="ibc-licenses__sidebar__article__item">
            <a
              href="#"
              target="_self"
              title="One IBC® Pte. Ltd - Certified Corporate Services Provider in Singapore by ACRA 2021 - 2023"
            >
              <img
                src="/images/img-licenses-article-1.jpg"
                alt="One IBC® Pte. Ltd - Certified Corporate Services Provider in Singapore by ACRA 2021 - 2023"
                width="267"
                height="200"
                title="One IBC® Pte. Ltd - Certified Corporate Services Provider in Singapore by ACRA 2021 - 2023"
              />
              <p>
                One IBC® Pte. Ltd - Certified Corporate Services Provider in Singapore by ACRA 2021
                - 2023
              </p>
            </a>
          </div>
          <div className="ibc-licenses__sidebar__article__item">
            <a
              href="#"
              target="_self"
              title="One IBC® was granted as a Service Provider of DMCC Free Zone"
            >
              <img
                src="/images/img-licenses-article-2.jpg"
                alt="Article"
                width="267"
                height="200"
                title="One IBC® was granted as a Service Provider of DMCC Free Zone"
              />
              <p>One IBC® was granted as a Service Provider of DMCC Free Zone</p>
            </a>
          </div>
          <div className="ibc-licenses__sidebar__article__item">
            <a
              href="#"
              target="_self"
              title="One IBC® Limited (Incorporated in Hong Kong) owns The Trust or Company Service Provider License (TCSP) in Hong Kong"
            >
              <img
                src="/images/img-licenses-article-3.jpg"
                alt="Article"
                width="267"
                height="200"
                title="One IBC® Limited (Incorporated in Hong Kong) owns The Trust or Company Service Provider License (TCSP) in Hong Kong"
              />
              <p>
                One IBC® Limited (Incorporated in Hong Kong) owns The Trust or Company Service
                Provider License (TCSP) in Hong Kong
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
