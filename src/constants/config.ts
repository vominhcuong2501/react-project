export const getStaticPathsConfig = () => ({
  paths: [{ params: { locale: 'en-gx' } }],
  fallback: true,
});

export const INNER_WIDTH_MOBILE = 768;
export const PAGE_RANGE_MOBILE = 1;
export const PAGE_RANGE_BROWSER = 4;
export const MARGIN_PAGE = 2;

// Pagination
const SET_PAGINATION = 6;
export const PER_PAGE = SET_PAGINATION;
export const LIMIT_PAGINATE = SET_PAGINATION;
export const CURRENT_PAGE = 1;

export const pdfConfig = {
  jsPDF: {
    format: 'a4',
    unit: 'px',
  },
  html2canvas: {
    imageTimeout: 150000,
    scale: 10,
    logging: true,
    dpi: 192,
    letterRendering: true,
  },
  margin: {
    top: 30,
    right: 5,
    bottom: 30,
    left: 5,
  },
  // height: '100%',
  // imageQuality: 0.98,
  imageType: 'image/jpeg',
  output: 'generate.pdf',
  init(doc) {
    doc.setFontSize(16);
  },
  watermark({ pdf, pageNumber, totalPageNumber }) {
    pdf.setTextColor('black');
    pdf.setFontSize(6);
    pdf.text(
      pdf.internal.pageSize.width / 2 - 5,
      pdf.internal.pageSize.height - 30,
      `Page: ${pageNumber} of ${totalPageNumber}`,
    );
  },
  success(pdf) {
    pdf.save(this.output);
  },
};

export const initConfigState = {
  config: null,
  iat: null,
  iss: null,
  isSuccessful: null,
};
