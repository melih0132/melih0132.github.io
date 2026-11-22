const stored = (() => {
  try {
    return localStorage.getItem('preferredLanguage');
  } catch (e) {
    return null;
  }
})();

const lang =
  stored === 'fr' || stored === 'en'
    ? stored
    : (navigator.language || navigator.userLanguage || 'en').startsWith('fr')
      ? 'fr'
      : 'en';

try {
  localStorage.setItem('preferredLanguage', lang);
} catch (e) {}

window.location.href = '/' + lang + '/';
