const rawModules = import.meta.glob('../../../docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function normalizeKey(key) {
  const match = key.match(/docs\/(.+\.md)$/);
  return match ? match[1] : null;
}

const contentByFile = Object.fromEntries(
  Object.entries(rawModules)
    .map(([key, value]) => [normalizeKey(key), value])
    .filter(([file]) => file)
);

export function getDocContent(file) {
  return contentByFile[file] ?? null;
}

export function getLoadedDocFiles() {
  return Object.keys(contentByFile);
}
