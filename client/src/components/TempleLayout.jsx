import roofImg from '../assets/temple-roof.png';
import bustImg from '../assets/alexander-bust.png';
import './components.css';
import './pillar.css';

function Pillar() {
  return (
    <div className="pillar">
      <div className="pillar__cap" />
      <div className="pillar__shaft" />
      <div className="pillar__base" />
    </div>
  );
}

// Three pillars on desktop; CSS hides the outer two on tablet and all on phone.
function Colonnade() {
  return (
    <div className="colonnade" aria-hidden="true">
      <Pillar />
      <Pillar />
      <Pillar />
    </div>
  );
}

/** Page frame: temple roof, pillars either side, steps below, bust behind the content. */
export default function TempleLayout({ children }) {
  return (
    <div className="temple">
      <header className="temple__roof" aria-hidden="true">
        <img className="temple__pediment" src={roofImg} alt="" />
        <div className="temple__beam" />
        <div className="temple__frieze" />
      </header>

      <div className="temple__body">
        <Colonnade />
        <main className="temple__content">
          <img className="temple__bust" src={bustImg} alt="" />
          {children}
        </main>
        <Colonnade />
      </div>

      <footer className="temple__steps" aria-hidden="true">
        <div className="temple__step temple__step--top" />
        <div className="temple__step temple__step--middle" />
        <div className="temple__step temple__step--bottom" />
      </footer>
    </div>
  );
}
