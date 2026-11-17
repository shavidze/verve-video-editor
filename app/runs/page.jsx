import runs from '../../data/runs.json';

export default function Runs() {
  return (
    <>
      <h1>მოდელების შედარება</h1>
      <p className="muted">ერთი და იგივე კადრები, ერთი და იგივე ინსტრუქცია, სხვადასხვა მოდელი. აქ ჩანს რა დაწერა თითოეულმა და რა დაჯდა.</p>
      {runs.length === 0 && <div className="note">გაშვებები ჯერ არ არის.</div>}
      {runs.map((r, i) => (
        <section key={i}>
          <h2>{r.title || r.file}</h2>
          <p className="muted">{r.job} · {r.created}</p>
          {r.summary && <p>{r.summary}</p>}
          <div className="grid">
            {(r.results || []).map((x, k) => (
              <div className="card" key={k}>
                <h3>{x.model}</h3>
                <p className="muted">{x.cost ? `~$${x.cost}` : ''}</p>
                <p>{x.verdict}</p>
                {(x.captions || []).map((c, j) => <div key={j} style={{ fontSize: '.9rem' }}>· {c}</div>)}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
