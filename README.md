# A11y Bookmarklets Lab

This is a starter static site that showcases bookmarklets for accessibility testing and development. You can open `index.html` locally or host the folder on any static server.

🔗 **[Try the live demo](https://anthonybyansi.github.io/A11y-Bookmarklets/)** 

## How to use

1. Open `index.html` in a browser.
2. Drag an item labeled Drag me to your bookmarks bar, or click Copy URL.
3. Visit any page you want to test and click the bookmarklet.

Items tagged AI expect you to provide an endpoint and, if required, an API key. The code uses `fetch` with a simple JSON payload and expects a simple JSON response. You can wire these to any service you prefer.

## AI payload shapes

- **AI alt text suggester**: sends `{ imgUrl, surroundingText }`, expects `{ alt }`.
- **AI page summary**: sends `{ input, task: "a11y_page_summary" }`, expects `{ summary }`.
- **AI ARIA advisor**: sends `{ input, task: "a11y_aria_hints" }`, expects `{ tips }`.
- **AI plain language**: sends `{ input, task: "plain_language" }`, expects `{ text }`.
- **Form autolabel helper**: sends `{ input, task: "form_label" }`, expects `{ label | text }`.

You can adapt the payloads to match your service. Keep responses short for bookmarklet performance.

## Notes

- Some pages use Content Security Policy that can block bookmarklets or external `fetch` calls.
- Single page apps can re-render and undo changes. You can run the tool again.
- Contrast spot-check uses a quick background search up the DOM which will not cover complex backgrounds or overlays.
- Color vision filters use approximate matrices.

## License

MIT
