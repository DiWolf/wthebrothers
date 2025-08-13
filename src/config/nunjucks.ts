// ...
export function configureNunjucks(app: any, viewsPath: string) {
  const env = nunjucks.configure(viewsPath, {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV !== 'production',
    watch: process.env.NODE_ENV !== 'production'
  });

  env.addGlobal('site', {
    name: 'The Brothers Logistic',
    phone1: '753 130 8284',
    phone2: '753 104 2916',
    email1: 'thebrotherslogistic@gmail.com',
    email2: 'rauul-1@hotmail.com'
  });

  // ✅ año disponible en todas las vistas
  env.addGlobal('year', new Date().getFullYear());

  // filtros, etc.
  // registerFilters(env);
  app.set('view engine', 'njk');
  return env;
}
