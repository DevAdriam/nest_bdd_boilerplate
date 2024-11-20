export function extractFeatureFromPath(path: string): string | null {
  const pathSegments = path.split('/');
  return pathSegments[3] ?? undefined;
}
