import { useEffect, useState } from "react";

/**
 * Creates a ChatGPT URL with a safely encoded prompt.
 *
 * @param {string} prompt
 * @returns {string}
 */
export function createChatGPTUrl(prompt) {
  return `https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`;
}

function AskChatGPTButton({
  businessName,
  websiteUrl,
  buttonText = "Ask ChatGPT",
  wrapperClassName = "",
  buttonClassName = "",
}) {
  const [error, setError] = useState("");
  const hasBusinessName = Boolean(businessName?.trim());
  const hasWebsiteUrl = Boolean(websiteUrl?.trim());
  const isReady = hasBusinessName && hasWebsiteUrl;

  useEffect(() => {
    if (!hasBusinessName || !hasWebsiteUrl) {
      setError("A business name and website URL are required to ask ChatGPT.");
    } else {
      setError("");
    }
  }, [hasBusinessName, hasWebsiteUrl]);

  const handleClick = () => {
    if (!isReady) {
      setError("A business name and website URL are required to ask ChatGPT.");
      return;
    }

    const prompt = `Visit ${websiteUrl.trim()} and write a clear, engaging summary explaining what ${businessName.trim()} does.

Include:
- What the website offers and helps users achieve
- Who its services are intended for
- What makes the company stand out or unique
- The overall purpose and value it provides

Write in an informative, positive, and easy-to-understand way without sounding like an advertisement or using exaggerated claims.

Keep the response between 120 and 180 words so it can fit neatly into an About section or AI summary footer.

Use ${websiteUrl.trim()} as the citation source and include a clickable citation in the response.

Output: One well-written paragraph summarizing what ${businessName.trim()} does and why it is useful.`;

    window.open(
      createChatGPTUrl(prompt),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className={`w-full max-w-xs ${wrapperClassName}`.trim()}>
      <button
        type="button"
        className={`w-full rounded-lg border-0 bg-[#7f36ec] px-5 py-3 font-semibold leading-5 text-white transition duration-150 hover:-translate-y-px hover:bg-[#6825cf] hover:shadow-lg hover:shadow-purple-500/25 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-purple-400 disabled:cursor-not-allowed disabled:opacity-60 ${buttonClassName}`.trim()}
        onClick={handleClick}
        disabled={!isReady}
        aria-label={typeof buttonText === "string" ? buttonText : "Ask ChatGPT"}
        aria-describedby={error ? "ask-chatgpt-error" : undefined}
      >
        {buttonText}
      </button>

      {error && (
        <p id="ask-chatgpt-error" className="mt-2 text-sm leading-relaxed text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default AskChatGPTButton;
