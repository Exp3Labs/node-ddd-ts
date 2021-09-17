const _require: any = require;

const importAll = (paths: any) => {
  return paths
    .keys()
    .map(paths)
    .map((x: any) => x.default);
};

export const getRoutes = () =>
  importAll(_require.context('@/*', true, /^((?!router).)*router.ts$/));
