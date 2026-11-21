const wechat = document.getElementById('wechat');
const recordings = document.getElementById('recordings');
function openLinkedSection() {
  if (location.hash === '#recordings') recordings.open = true;
  if (location.hash === '#competition-tasks') document.getElementById('competition-tasks').open = true;
}
document.querySelectorAll('a[href="#recordings"]').forEach(link =>
  link.addEventListener('click', () => { recordings.open = true; })
);
window.addEventListener('hashchange', openLinkedSection);
openLinkedSection();
document.getElementById('show-wechat').addEventListener('click', () => wechat.showModal());
document.getElementById('close-wechat').addEventListener('click', () => wechat.close());
wechat.addEventListener('click', event => { if (event.target === wechat) wechat.close(); });
const languageLink = document.querySelector(".language");
function syncLanguageLink() {
  languageLink.hash = window.location.hash;
}
window.addEventListener("hashchange", syncLanguageLink);
syncLanguageLink();
