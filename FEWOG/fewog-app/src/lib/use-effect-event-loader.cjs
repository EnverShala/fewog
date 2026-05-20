// Webpack loader: appends a useEffectEvent polyfill to Next.js's compiled React
// if the hook is absent. Required because Next.js 15.5.x ships React 19 canary
// (19.2.0-canary-0bdb9206) which omits useEffectEvent; Sanity 5.x needs it.
module.exports = function useEffectEventLoader(source) {
  if (source.includes('useEffectEvent')) return source
  return source + '\nexports.useEffectEvent = function(fn) { return fn; };'
}
