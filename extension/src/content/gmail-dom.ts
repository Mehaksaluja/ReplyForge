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
 * Writes text into the most recently opened compose/reply box. We use
 * execCommand("insertText") instead of setting innerText directly — Gmail's
 * own JS (draft autosave, enabling the Send button) listens for the input
 * events that execCommand fires; a direct property write doesn't trigger
 * them and Gmail would think the box is still empty. execCommand is
 * deprecated but still functions in Chrome and is the standard trick used by
 * Gmail-integration extensions for exactly this reason.
 */
export function insertReplyIntoCompose(text: string): boolean {
  const boxes = findComposeBoxes();
  const target = boxes[boxes.length - 1];
  if (!target) return false;

  target.focus();
  const inserted = document.execCommand("insertText", false, text);
  if (!inserted) {
    target.innerText = text;
    target.dispatchEvent(new InputEvent("input", { bubbles: true }));
  }
  return true;
}
