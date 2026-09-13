const modules = import.meta.glob('./*.json', { eager: true });

const messages: Record<string, { translation: Record<string, any> }> = {};

Object.keys(modules).forEach((path) => {
  const match = path.match(/\.\/([^/]+)\.json$/);
  if (match) {
    const [, lang] = match;
    const module = modules[path] as { default?: Record<string, any> };
    if (module) {
      messages[lang] = { translation: module.default || module };
    }
  }
});

export default messages;
