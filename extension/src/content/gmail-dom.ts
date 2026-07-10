const PROCESSED_ATTR = "data-replyforge-injected";

/**
 * Gmail's compose/reply text area has no stable class name, but it has always
 * carried aria-label="Message Body" as a contenteditable textbox — that's
 * accessibility markup, which Google has strong incentive not to break.
 */
export function findComposeBoxes(root: ParentNode = document): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>('div[contenteditable="true"][aria-label="Message Body"]')
  );
}

/**
 * Gmail is a single-page app: compose/reply boxes are added and removed from
 * the DOM as the user clicks around, with no page navigation to hook into.
 * A MutationObserver is the standard way to react to that.
 */
export function observeComposeBoxes(onFound: (box: HTMLElement) => void): void {
  const processExisting = () => {
    for (const box of findComposeBoxes()) {
      if (box.hasAttribute(PROCESSED_ATTR)) continue;
      box.setAttribute(PROCESSED_ATTR, "true");
      onFound(box);
    }
  };

  processExisting();

  const observer = new MutationObserver(() => {
    processExisting();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

/**
 * Reads the subject + every message body in the currently open thread.
 * `.a3s.aiL` (message body) and `h2.hP` (subject) aren't documented, but
 * they're some of Gmail's oldest, most-relied-upon class names — many
 * long-running Gmail extensions key off exactly these.
 */
export function extractThreadText(): string {
  const subject = document.querySelector("h2.hP")?.textContent?.trim() ?? "(no subject found)";

  const bodies = Array.from(document.querySelectorAll<HTMLElement>(".a3s.aiL"));

  if (bodies.length === 0) {
    return `Subject: ${subject}\n\n(No open email thread detected.)`;
  }

  // Gmail lets you click Reply on ANY message in a thread, not just the last
  // one — that opens a compose box right after that specific message. So the
  // message to reply to is whichever one precedes the currently open compose
  // box, not necessarily the chronologically last one.
  const composeBoxes = findComposeBoxes();
  const activeComposeBox = composeBoxes[composeBoxes.length - 1];
  const replyToIndex = activeComposeBox
    ? findAnchorMessageIndex(activeComposeBox, bodies)
    : bodies.length - 1;

  const messages = bodies.map((body, index) => {
    const container = body.closest('[role="listitem"]');
    const senderEl = container?.querySelector<HTMLElement>(".gD");
    const sender =
      senderEl?.getAttribute("email") || senderEl?.textContent?.trim() || `Sender ${index + 1}`;
    const label =
      index === replyToIndex
        ? `Message ${index + 1} of ${bodies.length} (reply to this one)`
        : `Message ${index + 1} of ${bodies.length}`;
    return `${label}\nFrom: ${sender}\n${body.innerText.trim()}`;
  });

  return [`Subject: ${subject}`, ...messages].join("\n\n---\n\n");
}

/** Finds the last message body that appears before the given compose box in the DOM. */
function findAnchorMessageIndex(composeBox: HTMLElement, bodies: HTMLElement[]): number {
  let anchorIndex = bodies.length - 1;
  for (let i = 0; i < bodies.length; i++) {
    const bodyPrecedesComposeBox = Boolean(
      bodies[i].compareDocumentPosition(composeBox) & Node.DOCUMENT_POSITION_FOLLOWING
    );
    if (bodyPrecedesComposeBox) {
      anchorIndex = i;
    }
  }
  return anchorIndex;
}

/**
 * Gmail's dark theme is a setting inside Gmail itself, independent of the
 * OS/browser dark mode preference — a user can have a dark OS with Gmail set
 * to its white theme, or vice versa. `prefers-color-scheme` only reflects the
 * OS setting, so it's the wrong signal for matching Gmail's actual on-screen
 * theme. Reading the real rendered background color of the page is reliable
 * regardless of which internal class name Gmail happens to use this month.
 */
export function isGmailDarkTheme(): boolean {
  const bg = getComputedStyle(document.body).backgroundColor;
  const channels = bg.match(/[\d.]+/g);
  if (!channels || channels.length < 3) return false;
  const [r, g, b] = channels.map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/**
 * Clicks Gmail's native Reply control under the most recent message in the
 * thread — the same message extractThreadText() falls back to as the reply
 * target when no compose box is already open. Only the expanded message
 * (normally the last one) renders Reply/Reply all/Forward controls, and like
 * the "Message Body" selector above, this is keyed off aria-label rather
 * than an unstable class name (English-language Gmail only, for now).
 */
function openReplyForLastMessage(): boolean {
  const bodies = Array.from(document.querySelectorAll<HTMLElement>(".a3s.aiL"));
  const lastBody = bodies[bodies.length - 1];
  const container = lastBody?.closest("[role=\"listitem\"]");
  const replyButton = container?.querySelector<HTMLElement>('[aria-label="Reply"]');
  if (!replyButton) return false;
  replyButton.click();
  return true;
}

/** Resolves with the newly-opened compose box, or null if none appears within `timeoutMs`. */
function waitForComposeBox(timeoutMs = 3000): Promise<HTMLElement | null> {
  const existing = findComposeBoxes();
  if (existing.length > 0) return Promise.resolve(existing[existing.length - 1]);

  return new Promise((resolve) => {
    let settled = false;
    const observer = new MutationObserver(() => {
      const boxes = findComposeBoxes();
      if (boxes.length > 0 && !settled) {
        settled = true;
        clearTimeout(timeout);
        observer.disconnect();
        resolve(boxes[boxes.length - 1]);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        observer.disconnect();
        resolve(null);
      }
    }, timeoutMs);
  });
}

/**
 * Writes text into the most recently opened compose/reply box, opening one
 * automatically (via Gmail's own Reply control) if none is open yet. We use
 * execCommand("insertText") instead of setting innerText directly — Gmail's
 * own JS (draft autosave, enabling the Send button) listens for the input
 * events that execCommand fires; a direct property write doesn't trigger
 * them and Gmail would think the box is still empty. execCommand is
 * deprecated but still functions in Chrome and is the standard trick used by
 * Gmail-integration extensions for exactly this reason.
 */
export async function insertReplyIntoCompose(text: string): Promise<boolean> {
  let boxes = findComposeBoxes();
  if (boxes.length === 0) {
    if (!openReplyForLastMessage()) return false;
    const opened = await waitForComposeBox();
    if (!opened) return false;
    boxes = [opened];
  }

  const target = boxes[boxes.length - 1];
  target.focus();

  // Select whatever's already in the box first, so insertText replaces it
  // instead of dropping the new reply in wherever the cursor happens to be.
  const range = document.createRange();
  range.selectNodeContents(target);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);

  const inserted = document.execCommand("insertText", false, text);
  if (!inserted) {
    target.innerText = text;
    target.dispatchEvent(new InputEvent("input", { bubbles: true }));
  }
  return true;
}
