import pdfStyle from '@scss/layout/pdf.scss';
import classNames from 'classnames';

export default function PDFLayout({ content, currentPage }: any) {
  return (
    <>
      <style jsx>{pdfStyle}</style>
      <div className={classNames(['page', `page-${currentPage}`])}>
        <div className="ibc-pdf" id="InvoiceTemp">
          <div className="ibc-pdf__content ibc-content-format">
            <div className="ibc-pdf__header">
              <div>
                <img src="/images/one-ibc-logo.svg" alt="logo-one-ibc" />
              </div>
              <div className="ibc-pdf__header__address">
                <p>
                  <strong>Offshore Company Corp - Head Office:</strong>
                </p>
                <p>
                  Add: Unit 1411, 14/Floor, Cosco Tower, 183 Queens Road Central, Sheung Wan, Hong
                  Kong
                </p>
                <p>Tel: +852 8199 0825 or +65 6591 9991</p>
                <p>Email: support@offshorecompanycorp.com</p>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </>
  );
}
