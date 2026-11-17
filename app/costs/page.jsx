'use client';
import { useState } from 'react';

// USD per million tokens (input, output). Third-party price trackers, read 2026-11-17; confirm on Anthropic's pricing page.
const MODELS = { haiku: { name: 'Haiku 5.5', i: 0.1, o: 0.5 }, sonnet: { name: 'Sonnet 5.5', i: 2, o: 10 }, opus: { name: 'Opus 5.5', i: 4, o: 20 }, fable: { name: 'Fable 5.2', i: 8, o: 40 } };
// Token counts are estimates (about 9 clips, one draft and one revision), not measurements. Output includes thinking.
const STAGES = [
  { key: 'analyst', label: 'კადრების გარჩევა', i: 20000, o: 3000, model: 'sonnet' },
  { key: 'director', label: 'დირექტორი: პირველი გეგმა', i: 20000, o: 17000, model: 'fable' },
  { key: 'revision', label: 'შესწორება', i: 25000, o: 6000, model: 'sonnet' },
  { key: 'reviewer', label: 'შემმოწმებელი', i: 15000, o: 2000, model: 'sonnet' },
  { key: 'editor', label: 'გაშვება და აღწერა', i: 8000, o: 1000, model: 'haiku' },
];
const PRESETS = {
  'ბიუჯეტური': { analyst: 'haiku', director: 'sonnet', revision: 'sonnet', reviewer: 'sonnet', editor: 'haiku' },
  'Opus დირექტორი': { analyst: 'sonnet', director: 'opus', revision: 'sonnet', reviewer: 'sonnet', editor: 'haiku' },
  'რეკომენდებული': { analyst: 'sonnet', director: 'fable', revision: 'sonnet', reviewer: 'sonnet', editor: 'haiku' },
  'ყველაფერი Fable': { analyst: 'fable', director: 'fable', revision: 'fable', reviewer: 'fable', editor: 'fable' },
};
const cost = (s, m) => (s.i * MODELS[m].i + s.o * MODELS[m].o) / 1e6;

export default function Costs() {
  const [pick, setPick] = useState(Object.fromEntries(STAGES.map((s) => [s.key, s.model])));
  const [n, setN] = useState(30);
  const per = STAGES.reduce((a, s) => a + cost(s, pick[s.key]), 0);
  return (
    <>
      <h1>ხარჯების კალკულატორი</h1>
      <p className="muted">მხოლოდ მოდელების ხარჯი. სკრიპტები (ჭრა, რენდერი) მოდელს არ იყენებენ. ტოკენების რაოდენობა შეფასებაა და არა გაზომილი.</p>
      <p>
        {Object.entries(PRESETS).map(([k, v]) => (
          <button key={k} onClick={() => setPick(v)} style={{ marginRight: 8, marginBottom: 8, padding: '6px 12px', borderRadius: 99, border: '1px solid #DCC7AA', background: '#fff', font: 'inherit', cursor: 'pointer' }}>{k}</button>
        ))}
      </p>
      <table>
        <thead><tr><th>ეტაპი</th><th>მოდელი</th><th>ტოკენები (შემ./გამ.)</th><th>ფასი</th></tr></thead>
        <tbody>
          {STAGES.map((s) => (
            <tr key={s.key}>
              <td>{s.label}</td>
              <td><select value={pick[s.key]} onChange={(e) => setPick({ ...pick, [s.key]: e.target.value })}>{Object.entries(MODELS).map(([k, m]) => <option key={k} value={k}>{m.name}</option>)}</select></td>
              <td>{(s.i / 1000)}k / {(s.o / 1000)}k</td>
              <td>${cost(s, pick[s.key]).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>ერთი ვიდეო: <span className="big">${per.toFixed(2)}</span></p>
      <p>ვიდეო თვეში: <input type="number" min="1" value={n} onChange={(e) => setN(Math.max(1, +e.target.value || 1))} /> → <span className="big">${(per * n).toFixed(0)}</span> თვეში</p>
      <div className="note">არ შედის: ქართული ტრანსკრიფცია, ჰოსტინგი, ფაილების შენახვა, რენდერის სერვერი, მუსიკის ლიცენზია. ფასები: Haiku $0.10/$0.50, Sonnet $2/$10, Opus $4/$20, Fable $8/$40 მილიონ ტოკენზე.</div>
    </>
  );
}
