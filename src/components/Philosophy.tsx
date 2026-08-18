import ScrollExpand from './ScrollExpand'

export default function Philosophy() {
  return (
    <section className="relative">
      <ScrollExpand title="Philosophy" scrollHint="Scroll" useWindowScroll overlayScrim={0}>
        <p className="font-display font-medium leading-[1.15] text-[clamp(1.5rem,4vw,3rem)] text-white text-balance max-w-3xl">
          I build interfaces people can trust <span className="text-gray-400">—</span> fast, accessible, and secure by default.
        </p>
      </ScrollExpand>
    </section>
  )
}
