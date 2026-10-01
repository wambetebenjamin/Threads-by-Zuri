/**
 * All photography is royalty-free from Pexels (pexels.com/license), shot by
 * African photographers and featuring real African models — no AI imagery.
 * The Pexels CDN supports on-the-fly cropping via query params, which we use
 * to keep aspect ratios consistent across the store.
 */
export const pexels = (id: number, w = 900, h = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const pexelsFree = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
