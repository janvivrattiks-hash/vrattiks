import React, { useEffect, useMemo, useRef, useState } from 'react';
import robotGreetingLogo from '../../assests/RobotSaludando.svg';

const rawBaseUrl = process.env.REACT_APP_CHATBOT_BASE_URL;
const rawWebsiteSlug = process.env.REACT_APP_CHATBOT_WEBSITE_SLUG;

function getChatUrl() {
  const baseUrl = rawBaseUrl?.trim().replace(/\/+$/, '');
  const websiteSlug = rawWebsiteSlug?.trim();

  if (!baseUrl || !websiteSlug) {
    return null;
  }

  try {
    const parsedBaseUrl = new URL(baseUrl);

    if (!['http:', 'https:'].includes(parsedBaseUrl.protocol)) {
      return null;
    }

    return `${parsedBaseUrl.href.replace(/\/+$/, '')}/${encodeURIComponent(websiteSlug)}/chat?embed=true`;
  } catch {
    return null;
  }
}

function ChatIcon({ className }) {
  return (
    <img
      src={robotGreetingLogo}
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}

function CloseIcon() {
  return (
    <svg
      className="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="26"
      height="26"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default function ChatWidget() {
  const dialogRef = useRef(null);
  const launcherRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const chatUrl = useMemo(getChatUrl, []);

  useEffect(() => {
    if (!chatUrl && process.env.NODE_ENV !== 'production') {
      console.error(
        'ChatWidget: missing or invalid chatbot configuration. Set REACT_APP_CHATBOT_BASE_URL and REACT_APP_CHATBOT_WEBSITE_SLUG.',
      );
    }
  }, [chatUrl]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (
        dialogRef.current?.contains(event.target) ||
        launcherRef.current?.contains(event.target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [isOpen]);

  if (!chatUrl) {
    return null;
  }

  const toggleWidget = () => {
    if (!isOpen) {
      setHasOpened(true);
    }

    setIsOpen((open) => !open);
  };

  const closeWidget = () => setIsOpen(false);

  return (
    <aside
      className="group fixed bottom-6 right-6 z-[99999] font-ibm text-left text-[#17131f] max-[599px]:bottom-3 max-[599px]:right-3"
      aria-label="Website chatbot"
    >
      {hasOpened && (
        <section
          ref={dialogRef}
          id="website-chatbot-dialog"
          className={`absolute bottom-[88px] right-0 flex h-[520px] max-h-[calc(100vh-132px)] w-[350px] origin-bottom-right flex-col overflow-hidden rounded-[20px] border border-[#1f182c17] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none max-[599px]:fixed max-[599px]:bottom-[96px] max-[599px]:left-4 max-[599px]:right-4 max-[599px]:top-8 max-[599px]:h-auto max-[599px]:max-h-none max-[599px]:w-auto max-[599px]:rounded-[18px] ${
            isOpen
              ? 'visible translate-y-0 scale-100 opacity-100 pointer-events-auto'
              : 'invisible translate-y-4 scale-[0.97] opacity-0 pointer-events-none'
          }`}
          role="dialog"
          aria-modal="false"
          aria-label="Website Assistant"
          aria-hidden={!isOpen}
        >
          <header className="flex min-h-[74px] items-center justify-between border-b border-[#eeeaf4] bg-white py-[13px] pl-4 pr-[14px]">
            <div className="flex items-center gap-[11px]">
              <span
                className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#f0e7ff]"
                aria-hidden="true"
              >
                <ChatIcon className="h-[40px] w-[40px] object-contain" />
              </span>
              <div>
                <h2 className="mb-0.5 text-base font-semibold leading-tight text-[#17131f]">
                  Website Assistant
                </h2>
                <p className="m-0 flex items-center gap-1.5 text-xs leading-[1.4] text-[#6e6877]">
                  <span
                    className="h-2 w-2 rounded-full bg-[#28b76b] shadow-[0_0_0_3px_rgba(40,183,107,0.14)]"
                    aria-hidden="true"
                  />
                  Online
                </p>
              </div>
            </div>
            <button
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-[#625b6c] transition-colors hover:bg-[#f3eff7] hover:text-[#1d1725] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b79af3bf]"
              type="button"
              onClick={closeWidget}
              aria-label="Close chatbot"
            >
              <CloseIcon />
            </button>
          </header>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
            {!isLoaded && !hasLoadError && (
              <div
                className="absolute inset-0 z-[1] flex items-center justify-center gap-2.5 p-6 text-center text-sm text-[#655d70]"
                role="status"
              >
                <span
                  className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-[#ded5e9] border-t-[#7f36ec] motion-reduce:animate-[spin_1.4s_linear_infinite]"
                  aria-hidden="true"
                />
                Loading assistant…
              </div>
            )}
            {hasLoadError && (
              <div
                className="absolute inset-0 z-[1] flex items-center justify-center gap-2.5 p-6 text-center text-sm text-[#a43a43]"
                role="alert"
              >
                The assistant could not be loaded. Please close it and try again.
              </div>
            )}
            <iframe
              className={`block h-full w-full border-0 transition-opacity duration-200 motion-reduce:transition-none ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              src={chatUrl}
              title="Website chatbot"
              allow="microphone; clipboard-write"
              onLoad={() => {
                setIsLoaded(true);
                setHasLoadError(false);
              }}
              onError={() => {
                setIsLoaded(false);
                setHasLoadError(true);
              }}
            />
          </div>
        </section>
      )}

      {!hasOpened && (
        <div
          className="pointer-events-none visible absolute right-[calc(100%+16px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-[#e7dcf7] bg-white px-4 py-2.5 text-sm font-medium text-[#31283d] opacity-100 shadow-[0_8px_24px_rgba(38,22,58,0.2)] transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none after:absolute after:-right-1.5 after:top-1/2 after:h-3 after:w-3 after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-[#e7dcf7] after:bg-white"
          role="tooltip"
        >
          How can I help?
        </div>
      )}

      <button
        ref={launcherRef}
        className="relative ml-auto flex h-[72px] w-[72px] cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-white transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#b79af3bf] motion-reduce:transition-none"
        type="button"
        onClick={toggleWidget}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        aria-expanded={isOpen}
        aria-controls="website-chatbot-dialog"
      >
        {!hasOpened && (
          <span
            className="pointer-events-none absolute right-2 -top-1 z-10 h-5 w-5 rounded-full border-[3px] border-white bg-[#28b76b] shadow-[0_0_0_4px_rgba(40,183,107,0.2)]"
            aria-hidden="true"
          />
        )}
        <span
          className="pointer-events-none absolute -inset-2 rounded-full bg-[#8e49f5]/65 blur-md animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
        <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#8e49f5] to-[#6822d2] shadow-[0_12px_30px_rgba(74,23,148,0.42)] transition-shadow duration-150 hover:shadow-[0_15px_34px_rgba(74,23,148,0.5)]">
          {isOpen ? <CloseIcon /> : <ChatIcon className="h-[66px] w-[66px] scale-[1.2] object-contain" />}
        </span>
      </button>
    </aside>
  );
}
