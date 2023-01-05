/* eslint-disable @next/next/no-sync-scripts */
/* eslint no-use-before-define: 0 */ // --> OFF
import BreadcrumbsComponent from '@components/primitive/Breadcrumb';
import HeadSEO from '@components/primitive/HeadSEO';
import { useDisplay } from '@hooks/useDisplay';
import infoStyle from '@scss/pages/info/index.scss';
import Download from '@svg/download-icon.svg';
import { convertTZ } from '@utils/helpers';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { get } from 'lodash';
import Script from 'next/script';

const getTime = (time) => format(time, "'Updated time:' dd LLL, yyyy, HH:mm '(UTC+8)'");

function TabContent({ contentData }: any) {
  const isPhone = useDisplay();
  const content = get(contentData, 'article.content', '');
  const contentTitle = get(contentData, 'article', '');

  const timeDfn = getTime(
    convertTZ(new Date(+`${contentTitle.update_time || 0}` * 1000), 'Singapore'),
  );

  const onButtonClick = () => {
    const input = document.getElementById('pdf-content');
    html2canvas(input, {
      useCORS: true,
      allowTaint: true,
      scrollY: 0,
    }).then((canvas) => {
      const image = { type: 'jpeg', quality: 0.98 };
      const margin = [0.5, 0.5];
      const filename = 'oneibc.pdf';

      let imgWidth = 8.5;
      let pageHeight = 11;

      let innerPageWidth = imgWidth - margin[0] * 2;
      let innerPageHeight = pageHeight - margin[1] * 2;

      // Calculate the number of pages.
      let pxFullHeight = canvas.height;
      let pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
      let nPages = Math.ceil(pxFullHeight / pxPageHeight);

      // Define pageHeight separately so it can be trimmed on the final page.
      pageHeight = innerPageHeight;

      // Create a one-page canvas to split up the full image.
      let pageCanvas = document.createElement('canvas');
      let pageCtx = pageCanvas.getContext('2d');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pxPageHeight;

      // Initialize the PDF.
      // eslint-disable-next-line new-cap
      let pdf: any = new jsPDF('p', 'in', [8.5, 11]);
      pdf.setFontSize(24);

      // eslint-disable-next-line no-plusplus
      for (let page = 0; page < nPages; page++) {
        // Trim the final page to reduce file size.
        if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
          pageCanvas.height = pxFullHeight % pxPageHeight;
          pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
        }
        pdf.setFontSize(20);

        // Display the page.
        let w = pageCanvas.width;
        let h = pageCanvas.height;
        pageCtx.fillStyle = 'white';
        pageCtx.fillRect(0, 0, w, h);
        pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

        // Add the page to the PDF.
        if (page > 0) pdf.addPage();

        // debugger;
        let imgData = pageCanvas.toDataURL(`image/${image.type}`, image.quality);
        pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
      }

      pdf.save(filename);
    });
  };

  return (
    <>
      <style jsx>{infoStyle}</style>
      <Script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossOrigin="anonymous"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossOrigin="anonymous"
      />
      <Script
        id="3"
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossOrigin="anonymous"
      />
      <Script
        id="1"
        dangerouslySetInnerHTML={{
          __html: `function showContent(evt, content) {
              let i;
              var x;
              let tabLinks;
              var x = document.getElementsByClassName('tabs-content');
              for (i = 0; i < x.length; i++) {
                x[i].style.display = 'none';
              }
              tabLinks = document.getElementsByClassName('tablink');
              for (i = 0; i < x.length; i++) {
                tabLinks[i].className = tabLinks[i].className.replace(' active', ' ');
              }
              document.getElementById(content).style.display = 'block';
              evt.currentTarget.className += ' active';
            }`,
        }}
      />

      <div className="ibc-container ibc-container">
        <HeadSEO {...contentTitle} />
        <div className="ibc-container-content" style={{ paddingBottom: '60px' }}>
          <div className="ibc-info__tab">
            <BreadcrumbsComponent />

            <div
              className="ibc-info__tab__title"
              style={{ alignItems: 'center', marginTop: '60px' }}
            >
              <div>
                <h1>{contentTitle?.name}</h1>
                <p>{timeDfn}</p>
              </div>
              <div className="ibc-btn-info">
                <div className="ibc-btn-download" onClick={onButtonClick}>
                  <Download />
                  {!isPhone && <span>Download Now</span>}
                </div>
              </div>
            </div>

            <div className="ibc-content-format" id="pdf-content">
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabContent;
