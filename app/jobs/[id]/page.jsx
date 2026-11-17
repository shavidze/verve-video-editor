import { notFound } from 'next/navigation';
import jobs from '../../../data/jobs.json';

export function generateStaticParams() { return jobs.map((j) => ({ id: j.id })); }
const t = (s) => `${Math.floor(s / 60)}:${(s % 60).toFixed(1).padStart(4, '0')}`;

export default async function Job({ params }) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) notFound();
  const body = job.segments.reduce((a, s) => a + (s.end - s.start), 0);
  const total = body + (job.end_card?.duration ?? 0);
  return (
    <>
      <h1>{job.id}</h1>
      <p>
        <span className={`badge ${job.status === 'approved' ? 'ok' : ''}`}>{job.status === 'approved' ? 'დამტკიცებულია' : 'მონახაზი'}</span>{' '}
        <span className="muted">{job.segments.length} კადრი · დაახლოებით {total.toFixed(1)} წმ</span>
      </p>
      {job.approval_note && <div className="note warn">{job.approval_note}</div>}
      <h2>ტიტრები</h2>
      <p className="muted">დრო ფინალურ ვიდეოში. ტექსტი გადასამოწმებელია, სანამ პროექტი არ დამტკიცდება.</p>
      {job.captions.map((c, i) => (
        <div className="cap" key={i}><time>{t(c.start)}–{t(c.end)}</time><span>{c.text.replaceAll('*', '')}</span></div>
      ))}
      <h2>კადრები</h2>
      <table>
        <thead><tr><th>#</th><th>წყარო</th><th>ჭრა</th><th>მასშტაბი</th></tr></thead>
        <tbody>
          {job.segments.map((s, i) => (
            <tr key={i}><td>{i + 1}</td><td>{(s.source || job.source || '').split('/').pop()}</td><td>{s.start.toFixed(2)}–{s.end.toFixed(2)} წმ</td><td>{s.zoom ? `${Math.round((s.zoom - 1) * 100)}%` : '–'}</td></tr>
          ))}
        </tbody>
      </table>
      {job.overlays?.length > 0 && <><h2>ბეიჯები</h2>{job.overlays.map((o, i) => <p key={i}>„{o.text}“ · {t(o.start)}–{t(o.end)}</p>)}</>}
      {job.end_card && <><h2>დასასრულის ბარათი</h2><p>{job.end_card.duration} წმ · {(job.end_card.lines || []).join(' · ')}</p></>}
      {job.unused_sources?.length > 0 && <p className="muted">გამოუყენებელი: {job.unused_sources.map((u) => u.split('/').pop()).join(', ')}</p>}
      {job.notes && <><h2>შენიშვნები</h2><p>{job.notes}</p></>}
    </>
  );
}
