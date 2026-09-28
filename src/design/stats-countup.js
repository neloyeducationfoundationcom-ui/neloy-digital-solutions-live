// Keep the published numbers in the HTML; animate their text only after the stats enter view.
export const STATS_COUNTUP_SCRIPT = `<script id="nds-stats-countup">
(() => {
  const section = document.getElementById("business-results");
  if (!section || !window.IntersectionObserver || !window.requestAnimationFrame) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const values = [...section.querySelectorAll(".neloy-stats-grid dd")].map((element) => {
    const text = element.firstChild;
    if (!text || text.nodeType !== Node.TEXT_NODE) return null;
    const final = text.nodeValue;
    const target = Number.parseInt(final, 10);
    if (!Number.isFinite(target)) return null;
    return {text, final, target, suffix: final.slice(String(target).length)};
  }).filter(Boolean);
  if (values.length !== 5) return;

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect(); // One animation per page load.
    const duration = 1200;
    const start = performance.now();
    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      for (const value of values) {
        value.text.nodeValue = progress === 1
          ? value.final
          : String(Math.floor(value.target * eased)) + value.suffix;
      }
      if (progress < 1) requestAnimationFrame(frame);
    };
    for (const value of values) value.text.nodeValue = "0" + value.suffix;
    requestAnimationFrame(frame);
  }, {threshold: 0.15});
  observer.observe(section);
})();
</script>`;
