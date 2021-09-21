declare const require: any;

const importAll = (paths: any) => {
  return paths
    .keys()
    .map(paths)
    .map((x: any) => x.default);
};

export const getRoutes = () =>
  importAll(require.context('@/*', true, /^((?!router).)*router.ts$/));
