import { motion } from 'framer-motion';

const FRAMES = [
  { label: 'Spot', tag: 'see what is left behind' },
  { label: 'Sort', tag: 'read the condition' },
  { label: 'Route', tag: 'find a nearby need' },
  { label: 'Return', tag: 'keep value in motion' },
];

export function FilmStrip() {
  return (
    <section className="film" aria-label="CampusCycle process">
      <div className="film__track">
        {FRAMES.map((frame, index) => (
          <motion.div
            key={frame.label}
            className="film__frame"
            initial={{ opacity: 0.35, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <div className="film__frame-glyph" aria-hidden="true">
              <span />
              <span />
            </div>
            <span className="film__frame-label">{frame.label}</span>
            <span className="film__frame-tag">{frame.tag}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
