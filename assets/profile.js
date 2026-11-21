const wechat = document.getElementById('wechat');
function openLinkedSection(hash = location.hash) {
  const target = document.getElementById(hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
}
document.querySelectorAll('a[href^="#"]').forEach(link =>
  link.addEventListener('click', () => openLinkedSection(link.hash))
);
window.addEventListener('hashchange', () => openLinkedSection());
openLinkedSection();
const demo = document.getElementById('demo');
demo.addEventListener('toggle', () => {
  if (!demo.open) demo.querySelector('video').pause();
});
document.getElementById('show-wechat').addEventListener('click', () => wechat.showModal());
document.getElementById('close-wechat').addEventListener('click', () => wechat.close());
wechat.addEventListener('click', event => { if (event.target === wechat) wechat.close(); });
const languageLink = document.querySelector(".language");
function syncLanguageLink() {
  languageLink.hash = window.location.hash;
}
window.addEventListener("hashchange", syncLanguageLink);
syncLanguageLink();
