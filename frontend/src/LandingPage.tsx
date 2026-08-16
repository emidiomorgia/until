import './App.css'

type Deadline = {
  name: string
  date: string
  status: string
  accent: string
}

const deadlines: Deadline[] = [
  { name: 'Launch the new website', date: 'Aug 24, 2026', status: 'In progress', accent: 'violet' },
  { name: 'Quarterly planning', date: 'Sep 12, 2026', status: 'Upcoming', accent: 'blue' },
  { name: 'Read 12 books', date: 'Dec 31, 2026', status: 'In progress', accent: 'orange' },
]

function LandingPage() {
  return (
    <main className="landing-page">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="until home">
          <img src="/assets/logo.png" alt="until" />
        </a>
        <span className="nav-note">A clearer way to move forward</span>
        <a className="nav-link" href="#preview">See the preview <span aria-hidden="true">↘</span></a>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">A place for what comes next</p>
          <h1 id="hero-title">Make time<br /><em>count.</em></h1>
          <p className="abstract">until turns the space between now and a deadline into something you can see, understand, and make progress through.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#preview">Explore until <span aria-hidden="true">↗</span></a>
            <a className="secondary-button" href="/app">Open app <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit-dot dot-one" />
          <div className="orbit-dot dot-two" />
          <div className="hero-icon"><img src="/assets/icon.png" alt="" /></div>
        </div>
      </section>

      <section className="preview-section" id="preview" aria-labelledby="preview-title">
        <div className="section-heading">
          <p className="eyebrow">The shape of until</p>
          <h2 id="preview-title">One view for every<br /><em>kind of progress.</em></h2>
        </div>
        <div className="mockups">
          <article className="mockup mockup-list">
            <div className="mockup-label"><span>01</span> Your deadlines</div>
            <div className="mockup-window">
              <div className="window-header"><span className="window-logo">until</span><span className="window-avatar">EM</span></div>
              <div className="window-content">
                <p className="window-kicker">Tuesday, August 11</p>
                <h3>Keep moving.</h3>
                <div className="deadline-list">
                  {deadlines.map((deadline) => <div className="deadline-row" key={deadline.name}><span className={`deadline-mark ${deadline.accent}`} /><span><strong>{deadline.name}</strong><small>{deadline.date}</small></span><span className="deadline-status">{deadline.status}</span></div>)}
                </div>
              </div>
            </div>
          </article>

          <article className="mockup mockup-create">
            <div className="mockup-label"><span>02</span> Add something new</div>
            <div className="mockup-window">
              <div className="window-header"><span className="window-back">← Back</span><span className="window-avatar">EM</span></div>
              <div className="window-content create-content">
                <p className="window-kicker">New deadline</p>
                <h3>What are you<br />working toward?</h3>
                <div className="fake-field"><small>Name</small><strong>Plan a trip to Japan</strong></div>
                <div className="fake-fields"><div className="fake-field"><small>Starts</small><strong>Aug 11, 2026</strong></div><div className="fake-field"><small>Ends</small><strong>Oct 01, 2026</strong></div></div>
                <button className="fake-submit" type="button">Create deadline <span aria-hidden="true">↗</span></button>
              </div>
            </div>
          </article>

          <article className="mockup mockup-detail">
            <div className="mockup-label"><span>03</span> See the distance</div>
            <div className="mockup-window">
              <div className="window-header"><span className="window-back">← All deadlines</span><span className="window-avatar">EM</span></div>
              <div className="window-content detail-content">
                <p className="window-kicker">In progress · 51 days left</p>
                <h3>Launch the<br />new website</h3>
                <div className="progress-label"><span>Progress</span><strong>64%</strong></div><div className="progress-track"><span /></div>
                <dl className="detail-stats"><div><dt>Start date</dt><dd>Jul 01, 2026</dd></div><div><dt>End date</dt><dd>Aug 24, 2026</dd></div><div><dt>Remaining</dt><dd>51 days</dd></div></dl>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer><img src="/assets/icon.png" alt="" /><p>until — make time count.</p><span>© 2026</span></footer>
    </main>
  )
}

export default LandingPage;
