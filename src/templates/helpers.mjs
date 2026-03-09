export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function escapeJsonScript(value) {
  return value.replace(/</g, "\\u003c");
}

export function iconMarkup(kind) {
  const icons = {
    download:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    manual:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h12M4 12h12M4 18h8M18 6v12l3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    booklet:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  return icons[kind];
}

export function relativeHref(fromOutputPath, targetPath) {
  const fromParts = fromOutputPath.split("/");
  fromParts.pop();
  const targetParts = targetPath.split("/");

  const fromSegments = fromParts.filter(Boolean);
  const targetSegments = targetParts.filter(Boolean);

  let shared = 0;
  while (
    shared < fromSegments.length &&
    shared < targetSegments.length &&
    fromSegments[shared] === targetSegments[shared]
  ) {
    shared += 1;
  }

  const upward = fromSegments.slice(shared).map(() => "..");
  const downward = targetSegments.slice(shared);
  const result = [...upward, ...downward].join("/");

  return result || ".";
}

export function pageHref(fromOutputPath, targetOutputPath) {
  const href = relativeHref(fromOutputPath, targetOutputPath);
  if (targetOutputPath.endsWith("index.html")) {
    return href === "." ? "./" : `${href}/`;
  }

  return href;
}
