"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Accessible modal dialog. Pass `isOpen` + `setIsOpen` from the parent.
const Modal = ({
  isOpen,
  setIsOpen,
  title,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: string;
  children: ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setIsOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, [setIsOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="m-auto w-full max-w-lg rounded-2xl bg-base-100 p-0 shadow-xl backdrop:bg-neutral/50"
      onClick={(e) => {
        // close when clicking the backdrop (target === dialog itself)
        if (e.target === dialogRef.current) setIsOpen(false);
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          {title && (
            <h2 className="text-lg font-semibold text-base-content">{title}</h2>
          )}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setIsOpen(false)}
            className="ml-auto rounded-md p-1 text-base-content/60 hover:bg-base-200 hover:text-base-content/80"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M6.225 4.811a1 1 0 011.414 0L10 7.172l2.361-2.36a1 1 0 111.415 1.414L11.414 8.586l2.362 2.361a1 1 0 01-1.415 1.415L10 10l-2.361 2.362a1 1 0 11-1.414-1.415l2.36-2.361-2.36-2.362a1 1 0 010-1.415z" />
            </svg>
          </button>
        </div>
        <div className="mt-4 text-sm text-base-content/80">{children}</div>
      </div>
    </dialog>
  );
};

export default Modal;
