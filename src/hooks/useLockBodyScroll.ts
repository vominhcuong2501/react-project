import { useLayoutEffect } from 'react';

function useLockBodyScroll(): void {
  // useLayoutEffect callback return type is "() => void" type
  useLayoutEffect((): (() => void) => {
    // Get original body overflow
    const originalStyle: string = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []); // Empty array ensures effect is only run on mount and unmount
}
export { useLockBodyScroll };

// function Modal({ title, content, onClose }) {
//   useLockBodyScroll();
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal">
//         <h2>{title}</h2>
//         <p>{content}</p>
//       </div>
//     </div>
//   );
// }
