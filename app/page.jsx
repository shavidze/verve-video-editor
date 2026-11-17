import Link from 'next/link';
import jobs from '../data/jobs.json';
import runs from '../data/runs.json';

export default function Home() {
  return (
    <>
      <h1>Verve Content Studio</h1>
      <p className="muted">ვიდეოების წარმოების სისტემა: გეგმა, დამტკიცება, ხარჯები. ეს არის პირველი ეტაპი, გვერდი ახლა მხოლოდ გიჩვენებს რა არის პროექტში; ატვირთვა და რედაქტირება შემდეგი ეტაპია.</p>
      <h2>პროექტები</h2>
      <div className="grid">
        {jobs.map((j) => (
          <Link key={j.id} href={`/jobs/${j.id}`} className="card">
            <h3>{j.id}</h3>
            <span className={`badge ${j.status === 'approved' ? 'ok' : ''}`}>{j.status === 'approved' ? 'დამტკიცებულია' : 'მონახაზი'}</span>
            <p className="muted">{j.segments.length} კადრი · {j.captions.length} ტიტრი</p>
          </Link>
        ))}
        {jobs.length === 0 && <div className="card muted">პროექტები ჯერ არ არის.</div>}
      </div>
      <h2>ინსტრუმენტები</h2>
      <div className="grid">
        <Link href="/runs" className="card"><h3>მოდელების შედარება</h3><p className="muted">{runs.length ? `${runs.length} გაშვება` : 'გაშვებები ჯერ არ არის'}</p></Link>
        <Link href="/costs" className="card"><h3>ხარჯების კალკულატორი</h3><p className="muted">რომელი აგენტი რომელ მოდელზე და რა ჯდება ერთი ვიდეო.</p></Link>
        <Link href="/brand" className="card"><h3>ბრენდის პროფილი</h3><p className="muted">ფერები, შრიფტები, ლოგოს წესები ბრენდბუქიდან.</p></Link>
      </div>
    </>
  );
}
