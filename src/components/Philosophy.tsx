import ScrollExpand from './ScrollExpand'
import biohazard from '../assets/biohazard.png'

export default function Philosophy() {
  return (
    <section className="relative">
      <ScrollExpand src={biohazard} alt="" title="Philosophy" scrollHint="Scroll" useWindowScroll mediaZoom={1.35}>
        <p className="mt-[18vh] sm:mt-[20vh] font-display font-medium leading-[1.15] text-[clamp(1.5rem,4vw,3rem)] text-white text-balance max-w-3xl">
          I build interfaces people can trust <span className="text-gray-400">—</span> fast, accessible, and secure by default.
        </p>
      </ScrollExpand>
    </section>
  )
}
