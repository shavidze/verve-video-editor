import brand from '../../data/brand.json';

const label = (k) => k.replaceAll('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function Brand() {
  const pal = brand.palette;
  const light = new Set(['cream_silk', 'tanned_leather', 'white']);
  return (
    <>
      <h1>ბრენდის პროფილი</h1>
      <p className="muted">წყარო: Verve Brand Identity (28 გვერდი). ვიდეოსთვის დამატებული წესები ცალკეა გამოყოფილი.</p>
      <h2>ფერები</h2>
      <div className="swatches">
        {Object.entries(pal).map(([k, v]) => (
          <div className="sw" key={k}>
            <div style={{ background: v.hex }} />
            <p><b>{label(k)}</b><br />{v.hex}</p>
          </div>
        ))}
      </div>
      <h2>დამტკიცებული წყვილები</h2>
      <div className="grid">
        {brand.approved_pairings.map((p, i) => (
          <div className="pair" key={i} style={{ background: pal[p.background].hex, color: pal[p.text].hex }}>
            <b style={{ fontFamily: "'Noto Serif Georgian',serif" }}>სილამაზე დეტალებშია</b>
            <div style={{ fontSize: '.85rem', marginTop: 6 }}>{p.contrast}:1 · {p.use}</div>
          </div>
        ))}
      </div>
      {brand.avoid_pairings.map((p, i) => (
        <div className="note warn" key={i}>არ გამოიყენო: {label(p.text)} ტექსტად {label(p.background)} ფონზე ({p.contrast}:1), {p.reason}.</div>
      ))}
      <h2>შრიფტები</h2>
      <table><tbody>
        <tr><th>სათაური (ქართ.)</th><td style={{ fontFamily: "'Noto Serif Georgian',serif", fontWeight: 700 }}>{brand.typography.header_ka.family} {brand.typography.header_ka.weight}</td></tr>
        <tr><th>ტექსტი</th><td>{brand.typography.body.family} {brand.typography.body.weight}</td></tr>
        <tr><th>სათაური (ლათ.)</th><td>{brand.typography.header_en.family} {brand.typography.header_en.weight} <span className="muted">· ფაილი არ არის ჩადებული, ჯერ ჩანაცვლებულია</span></td></tr>
      </tbody></table>
      <h2>ლოგო</h2>
      <p className="muted">დასაშვებია მხოლოდ დამტკიცებულ ფერებში, ეფექტების გარეშე. დაცვის ზონა: {brand.logo.clear_space}</p>
      <div className="grid">
        {brand.logo.approved_color_variations.slice(0, 6).map((v, i) => {
          const bg = pal[v.background]?.hex ?? '#111111';
          const fg = pal[v.logo]?.hex ?? '#FFFFFF';
          return (
            <div key={i} className="pair" style={{ background: bg, display: 'grid', placeItems: 'center', height: 110 }}>
              <span style={{ display: 'block', width: 160, aspectRatio: '1251/386', background: fg, WebkitMask: 'url(/logo/wordmark-latin.png) center/contain no-repeat', mask: 'url(/logo/wordmark-latin.png) center/contain no-repeat' }} />
            </div>
          );
        })}
      </div>
      <h2>ვიდეოს წესები (ბრენდბუქში არ წერია)</h2>
      <table><tbody>
        <tr><th>ტიტრი</th><td>{brand.derived_for_video.caption.font}, {brand.derived_for_video.caption.text} ტექსტი {brand.derived_for_video.caption.box} ფონზე, მაქს. {brand.derived_for_video.caption.max_words_per_caption} სიტყვა</td></tr>
        <tr><th>მოძრაობა</th><td>{brand.derived_for_video.motion}</td></tr>
        <tr><th>არ უნდა ითქვას</th><td>{brand.do_not_claim.join(' · ')}</td></tr>
      </tbody></table>
    </>
  );
}
