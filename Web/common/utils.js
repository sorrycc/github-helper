
export function openUrl(url) {
  if (window.quark) {
    quark.openURL(url);
  } else {
    window.open(url);
  }
}