import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface UsePDFOptions {
  filename?: string;
}

export const usePDF = (options: UsePDFOptions = {}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const toPDF = async () => {
    if (!targetRef.current) return;

    const canvas = await html2canvas(targetRef.current, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(options.filename || 'resume.pdf');
  };

  return { toPDF, targetRef };
};