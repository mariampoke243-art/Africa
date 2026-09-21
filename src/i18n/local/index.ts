const modules = import.meta.glob('./*.json', { eager: true });

const messages: Record<
  string,
  {
    translation: Record<string, any>;
  }
> = {};

Object.entries(modules).forEach(([path, module]) => {
  const match = path.match(/\.\/([^/]+)\.json$/);

  if (!match) return;

  const [, lang] = match;

  const translationModule = module as {
    default?: Record<string, any>;
  };

  messages[lang] = {
    translation: translationModule.default || translationModule,
  };
});

export default messages;
