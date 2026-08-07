import { useEffect, useRef, useState } from "react";
import { Check, Copy, Printer, X } from "lucide-react";
import { motion } from "motion/react";
import QRCode from "react-qr-code";

export function ShareDialog({ url, onClose }) {
  const linkInput = useRef(null);
  const closeButton = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      linkInput.current?.focus();
      linkInput.current?.select();
      document.execCommand("copy");
    }

    setCopied(true);
  }

  return (
    <motion.div
      className="share-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        className="share-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 6 }}
      >
        <header className="share-dialog-header">
          <h2 id="share-title">supaChef!</h2>
          <motion.button
            ref={closeButton}
            className="dialog-icon-button"
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
            aria-label="Close share dialog"
            title="Close"
          >
            <X size={20} />
          </motion.button>
        </header>

        <div className="qr-code-wrap">
          <QRCode value={url} size={220} bgColor="#ffffff" fgColor="#090909" />
        </div>

        <div className="share-link-row">
          <input
            ref={linkInput}
            value={url}
            readOnly
            aria-label="Share link"
            onFocus={(event) => event.currentTarget.select()}
          />
          <motion.button
            className="copy-link-button"
            onClick={copyLink}
            whileTap={{ scale: 0.94 }}
            aria-label={copied ? "Link copied" : "Copy link"}
            title={copied ? "Copied" : "Copy link"}
          >
            {copied ? <Check size={19} /> : <Copy size={19} />}
          </motion.button>
          <motion.button
            className="print-share-button"
            onClick={() => window.print()}
            whileTap={{ scale: 0.94 }}
            aria-label="Print QR code"
            title="Print"
          >
            <Printer size={19} />
          </motion.button>
        </div>
        <p className="print-share-url">{url}</p>
      </motion.section>
    </motion.div>
  );
}
