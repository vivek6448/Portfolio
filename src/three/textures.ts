// Real photographic art for the scroll world — a moonlit shrine pathway.
// Bundled through Vite's asset pipeline (hashed, relative paths), same as
// any other project image.
import kageApproach from '../secret-pathways-assets/generated/kage-approach.webp'
import kageSanmon from '../secret-pathways-assets/generated/kage-sanmon-preview.webp'
import kageLanternCourt from '../secret-pathways-assets/generated/kage-lantern-court.webp'
import kageMoonwater from '../secret-pathways-assets/generated/kage-moonwater.webp'
import kageAfterlight from '../secret-pathways-assets/generated/kage-afterlight.webp'

import mapleLeaves from '../secret-pathways-assets/foreground/png/maple-leaves.webp'

// width / height from the source files — lets every plane keep its true
// aspect ratio without an extra texture-load round trip just to measure it.
export const BACKDROPS = {
  approach: { src: kageApproach, aspect: 1536 / 1024 },
  sanmon: { src: kageSanmon, aspect: 1586 / 992 },
  lanternCourt: { src: kageLanternCourt, aspect: 1024 / 1536 },
  moonwater: { src: kageMoonwater, aspect: 1536 / 1024 },
  afterlight: { src: kageAfterlight, aspect: 1264 / 843 },
} as const

export const CUTOUTS = {
  mapleLeaves: { src: mapleLeaves, aspect: 1536 / 1024 },
} as const
