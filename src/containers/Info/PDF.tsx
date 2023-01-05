import { pdfConfig } from '@/constants/config';
import PDFLayout from '@components/compound/layout/PDF';
import { useEffect, useState } from 'react';

/* eslint-disable @next/next/no-sync-scripts */
let pdfConvert;
if (typeof window !== 'undefined') {
  pdfConvert = import('jspdf-html2canvas').then((module) => module.default);
}

export default function PDF({ data }: any) {
  const [listPage, setListPage] = useState<any>();
  const pdfDownload = async () => {
    await pdfConvert.then((pdf) => {
      pdf(document.getElementById('InvoiceTemp'), pdfConfig);
    });
  };

  useEffect(() => {
    const page = document.getElementsByClassName('container');
    setListPage(page);
  }, []);

  return (
    <>
      <button id="button" onClick={() => pdfDownload()}>
        DownLoad
      </button>

      <PDFLayout content={data} />
    </>
  );
}
