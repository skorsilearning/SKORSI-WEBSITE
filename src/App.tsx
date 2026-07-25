import React, { useState, useEffect } from 'react';
import Careers from './Careers';

interface Testimonial {
  id: number;
  stars: string;
  text: string;
  av: string;
  name: string;
  role: string;
  avClass: string;
}

function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [subjectError, setSubjectError] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Sync state with browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update homepage SEO title when on home route
  useEffect(() => {
    if (currentPath === '/') {
      document.title = 'Skorsi — Online classes for B.Tech students';
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute(
          'content',
          'Live classes with IIT & industry experts for B.Tech students. Clear your backlogs and pass your semesters with 1:1 or small-group live online tutoring.'
        );
      }
    }
  }, [currentPath]);

  // Intersection Observer for scroll-triggered entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [formSubmitted, currentPath]);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (target === '/careers') {
      navigate('/careers');
      return;
    }

    if (currentPath !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneChange = (value: string) => {
    if (/\D/.test(value)) {
      setPhoneError('Only numbers are allowed');
    } else {
      setPhoneError('');
    }
    setPhone(value.replace(/\D/g, ''));
  };

  const handleSubjectChange = (value: string) => {
    if (/[^a-zA-Z\s\-\&\.,]/.test(value)) {
      setSubjectError('Only text letters are allowed');
    } else {
      setSubjectError('');
    }
    setSubject(value.replace(/[^a-zA-Z\s\-\&\.,]/g, ''));
  };

  const handleContactFormSubmit = async (event?: React.SyntheticEvent) => {
    if (event) event.preventDefault();

    const trimmedPhone = phone.trim();
    const trimmedSubject = subject.trim();

    if (!trimmedPhone || !trimmedSubject) {
      alert('Please fill out both fields.');
      return;
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      alert('Please enter a valid phone number (10 to 15 digits).');
      return;
    }

    const subjectRegex = /^[a-zA-Z\s\-\&\.,]+$/;
    if (!subjectRegex.test(trimmedSubject)) {
      alert('Subject & university field should only contain text characters.');
      return;
    }

    const leadsUrl = import.meta.env.VITE_LEADS_SHEET_URL || '';
    const payload = {
      phone: trimmedPhone,
      subject: trimmedSubject,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch(leadsUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Error submitting lead to Sheets:', error);
    } finally {
      setFormSubmitted(true);
    }
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      stars: '★★★★★',
      text: 'I had 3 backlogs in Maths and DSA. My Skorsi tutor mapped exactly what topics would appear. Cleared all 3 in one shot.',
      av: 'AK',
      name: 'Arjun Kumar',
      role: '3rd Year CS — AKTU',
      avClass: 'av1'
    },
    {
      id: 2,
      stars: '★★★★★',
      text: 'Failed Thermodynamics twice. After 5 sessions on Skorsi I scored 68. The expert knew exactly how the AKTU paper is structured.',
      av: 'PV',
      name: 'Priya Verma',
      role: '4th Year Mech — VIT',
      avClass: 'av2'
    },
    {
      id: 3,
      stars: '★★★★★',
      text: 'The group batch was incredibly affordable and way more useful than any coaching centre. Everyone had the same paper, so focus was perfect.',
      av: 'RS',
      name: 'Rohan Singh',
      role: '2nd Year ECE — JIIT',
      avClass: 'av3'
    }
  ];

  return (
    <div className="app-container">
      {/* Header & Navigation */}
      <nav>
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Sk<span>o</span>rsi
        </div>
        <ul className={isMenuOpen ? 'open' : ''}>
          <li><a href="/#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')}>How it works</a></li>
          <li><a href="/#subjects-section" onClick={(e) => handleNavClick(e, '#subjects-section')}>Subjects</a></li>
          <li><a href="/#pricing-section" onClick={(e) => handleNavClick(e, '#pricing-section')}>Pricing</a></li>
          <li><a href="/#testimonials-section" onClick={(e) => handleNavClick(e, '#testimonials-section')}>Experts</a></li>
          <li><a href="/careers" className={currentPath === '/careers' ? 'active' : ''} onClick={(e) => handleNavClick(e, '/careers')}>Careers</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {currentPath === '/careers' ? (
            <a
              className="btn-primary animate-on-scroll"
              href="https://docs.google.com/forms/d/e/1FAIpQLSd2hzSsWVIavbln5210BNTtUjoLtAYrKfg3J3b-43lf70R77A/viewform"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              Apply Now ↗
            </a>
          ) : (
            <a
              className="btn-primary animate-on-scroll"
              href="#contact-section"
              onClick={(e) => handleNavClick(e, '#contact-section')}
            >
              Book free class ↗
            </a>
          )}
          <button className="menu-toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
            <i className={`ti ${isMenuOpen ? 'ti-x' : 'ti-menu-2'}`}></i>
          </button>
        </div>
      </nav>

      {/* Main Content Router */}
      {currentPath === '/careers' ? (
        <Careers navigate={navigate} />
      ) : (
        <>
          {/* Hero Section */}
          <div className="hero">
            <div>
              <div className="badge"><span className="badge-dot"></span> Live classes with IIT &amp; industry experts</div>
              <h1>Clear your <span className="accent">backlog.</span><br />Pass your<br />semester.</h1>
              <p className="hero-sub">Online live classes built for B.Tech students — 1:1 or group — with verified subject experts. Stop failing, start graduating.</p>
              <div className="hero-ctas">
                <a className="btn-primary animate-on-scroll" href="#contact-section" onClick={(e) => handleNavClick(e, '#contact-section')}>Book a free trial class ↗</a>
                <a className="btn-ghost animate-on-scroll" href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')}>See how it works</a>
              </div>
              <div className="trust-bar">
                <div className="trust-item"><i className="ti ti-check" aria-hidden="true"></i> No long-term contracts</div>
                <div className="trust-item"><i className="ti ti-check" aria-hidden="true"></i> Classes start today</div>
                <div className="trust-item"><i className="ti ti-check" aria-hidden="true"></i> Money-back guarantee</div>
              </div>
            </div>

            <div className="vsl-box">
              <div className="vsl-thumb" onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}>
                <div className="vsl-grid"></div>
                <img src="/online_study_placeholder.png" alt="B.Tech Online Tutoring and Coding Studies" />
                <div className="vsl-caption">Explore: How Arjun cleared 3 backlogs in 6 weeks</div>
              </div>
              <div className="vsl-info">
                <h3>Why 5,000+ B.Tech students chose Skorsi</h3>
                <p>Real experts. Real results. Live classes that go beyond YouTube.</p>
                <div className="vsl-stats">
                  <div className="vsl-stat"><div className="vsl-stat-n">92%</div><div className="vsl-stat-l">pass rate</div></div>
                  <div className="vsl-stat"><div className="vsl-stat-n">5,000+</div><div className="vsl-stat-l">students helped</div></div>
                  <div className="vsl-stat"><div className="vsl-stat-n">48h</div><div className="vsl-stat-l">to first class</div></div>
                  <div className="vsl-stat"><div className="vsl-stat-n">4.9★</div><div className="vsl-stat-l">avg rating</div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="proof-strip">
            <div className="proof-item"><div className="proof-num">5,000+</div><div className="proof-label">Students helped</div></div>
            <div className="proof-item"><div className="proof-num">200+</div><div className="proof-label">Verified experts</div></div>
            <div className="proof-item"><div className="proof-num">50+</div><div className="proof-label">Subjects covered</div></div>
            <div className="proof-item"><div className="proof-num">92%</div><div className="proof-label">Exam pass rate</div></div>
            <div className="proof-item"><div className="proof-num">AKTU · VIT · JIIT</div><div className="proof-label">Universities covered</div></div>
          </div>

          <div className="section" id="problem-section">
            <div className="eyebrow">The real problem</div>
            <div className="sec-title">B.Tech is hard.<br />Bad resources make it worse.</div>
            <div className="sec-sub">Most students fail not because they're not smart — but because they don't have access to the right help at the right time.</div>
            <div className="problem-grid">
              <div className="prob-card"><div className="prob-icon"><i className="ti ti-video-off" aria-hidden="true"></i></div><h4>YouTube isn't enough</h4><p>Generic videos don't follow your syllabus or paper pattern. You can't ask them questions.</p></div>
              <div className="prob-card"><div className="prob-icon"><i className="ti ti-calendar-x" aria-hidden="true"></i></div><h4>Backlogs pile up fast</h4><p>One missed exam turns into three — suddenly your entire graduation timeline is at risk.</p></div>
              <div className="prob-card"><div className="prob-icon"><i className="ti ti-users-minus" aria-hidden="true"></i></div><h4>College teachers are unavailable</h4><p>Office hours are rare. Classmates are equally lost. Getting 1:1 help feels impossible.</p></div>
              <div className="prob-card"><div className="prob-icon"><i className="ti ti-clock-x" aria-hidden="true"></i></div><h4>Exams sneak up on you</h4><p>Last-minute cramming without a strategy almost never works for technical papers.</p></div>
            </div>
          </div>

          <div className="how-wrap" id="how-it-works">
            <div className="how-inner">
              <div className="eyebrow">Simple process</div>
              <div className="sec-title">From panicking to passing<br />— in 4 steps</div>
              <div className="steps">
                <div className="step"><div className="step-n">01 <div className="step-line"></div></div><h3>Tell us your subject &amp; university</h3><p>We match you to an expert who knows your exact syllabus and paper pattern.</p></div>
                <div className="step"><div className="step-n">02 <div className="step-line"></div></div><h3>Choose 1:1 or a group class</h3><p>Need focused help? Go 1:1. Want affordable classes with peers? Join a batch.</p></div>
                <div className="step"><div className="step-n">03 <div className="step-line"></div></div><h3>Attend live online sessions</h3><p>Real-time classes on Zoom or Meet. Ask questions, get instant answers.</p></div>
                <div className="step"><div className="step-n">04 <div className="step-line"></div></div><h3>Walk in with confidence</h3><p>PYQ walkthroughs, mock tests, targeted revision — aligned to your paper.</p></div>
              </div>
            </div>
          </div>

          <div className="section" id="pricing-section">
            <div className="eyebrow">Choose your mode</div>
            <div className="sec-title">Two ways to learn,<br />both built to get you through.</div>
            <div className="offerings">
              <div className="off-card feat">
                <div className="off-tag tag-g">Group classes</div>
                <h3>Small-batch live classes</h3>
                <p>Learn with a focused group on the same paper. Structured schedule, topic-by-topic coverage, PYQ sessions.</p>
                <ul className="feat-list">
                  <li><i className="ti ti-check" aria-hidden="true"></i> Max 8 students per batch</li>
                  <li><i className="ti ti-check" aria-hidden="true"></i> University-specific syllabus</li>
                  <li><i className="ti ti-check" aria-hidden="true"></i> Past year paper walkthroughs</li>
                  <li><i className="ti ti-check" aria-hidden="true"></i> Dedicated doubt support</li>
                  <li><i className="ti ti-check" aria-hidden="true"></i> Recorded access (7 days)</li>
                </ul>
                <div style={{ marginTop: '16px' }}><a className="btn-primary animate-on-scroll" href="#contact-section" onClick={(e) => handleNavClick(e, '#contact-section')}>Explore batches ↗</a></div>
              </div>
              <div className="off-card">
                <div className="off-tag tag-p">1:1 private tutoring</div>
                <h3>Personal expert sessions</h3>
                <p>Your schedule, your pace. An expert focused entirely on your weak areas and exam gaps.</p>
                <ul className="feat-list">
                  <li><i className="ti ti-check" aria-hidden="true"></i> Fully personalized plan</li>
                  <li><i className="ti ti-check" aria-hidden="true"></i> Choose your expert</li>
                  <li><i className="ti ti-check" aria-hidden="true"></i> Flexible timing, book anytime</li>
                  <li><i className="ti ti-check" aria-hidden="true"></i> Targeted weak-topic focus</li>
                  <li><i className="ti ti-check" aria-hidden="true"></i> Dedicated doubt support</li>
                </ul>
                <div style={{ marginTop: '16px' }}><a className="btn-ghost animate-on-scroll" href="#contact-section" onClick={(e) => handleNavClick(e, '#contact-section')}>Book a session</a></div>
              </div>
            </div>
          </div>

          <div style={{ padding: '0 36px 72px', maxWidth: '1350px', margin: '0 auto' }} id="subjects-section">
            <div className="eyebrow">Subjects covered</div>
            <div className="sec-title">From first year to final year</div>
            <div className="sec-sub">Expert tutors across CS, Mechanical, Electrical, Civil — every B.Tech semester.</div>
            <div className="subjects-wrap">
              <div className="sub-pill"><i className="ti ti-math" aria-hidden="true"></i> Engineering Mathematics</div>
              <div className="sub-pill"><i className="ti ti-code" aria-hidden="true"></i> Data Structures &amp; Algorithms</div>
              <div className="sub-pill"><i className="ti ti-cpu" aria-hidden="true"></i> Digital Electronics</div>
              <div className="sub-pill"><i className="ti ti-atom" aria-hidden="true"></i> Engineering Physics</div>
              <div className="sub-pill"><i className="ti ti-database" aria-hidden="true"></i> Database Management</div>
              <div className="sub-pill"><i className="ti ti-network" aria-hidden="true"></i> Computer Networks</div>
              <div className="sub-pill"><i className="ti ti-engine" aria-hidden="true"></i> Thermodynamics</div>
              <div className="sub-pill"><i className="ti ti-lock" aria-hidden="true"></i> Cryptography</div>
              <div className="sub-pill"><i className="ti ti-wave-sine" aria-hidden="true"></i> Signals &amp; Systems</div>
              <div className="sub-pill"><i className="ti ti-settings" aria-hidden="true"></i> Compiler Design</div>
              <div className="sub-pill"><i className="ti ti-hierarchy" aria-hidden="true"></i> Operating Systems</div>
              <div className="sub-pill"><i className="ti ti-plus" aria-hidden="true"></i> 40+ more subjects</div>
            </div>
          </div>

          <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }} id="testimonials-section">
            <div className="section">
              <div className="eyebrow">Student stories</div>
              <div className="sec-title">They were stuck.<br />Now they're not.</div>
              <div className="carousel-container">
                <div className="carousel-track">
                  {[...testimonials, ...testimonials, ...testimonials].map((testi, index) => (
                    <div className="testi" key={`${testi.id}-${index}`}>
                      <div className="stars">{testi.stars}</div>
                      <q>{testi.text}</q>
                      <div className="tester">
                        <div className={`av ${testi.avClass}`}>{testi.av}</div>
                        <div>
                          <div className="t-name">{testi.name}</div>
                          <div className="t-role">{testi.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '72px 36px' }} id="contact-section">
            <div className="cta-wrap" style={{ padding: 0 }}>
              <div className="cta-block">
                {formSubmitted ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                    <i className="ti ti-circle-check" style={{ fontSize: '48px', color: 'var(--ac)', marginBottom: '16px', display: 'inline-block' }}></i>
                    <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', fontFamily: 'Montserrat', color: 'var(--text-main)' }}>Registered Successfully!</h3>
                    <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px' }}>
                      Thank you, our team will reach out to you for the next process.
                    </p>
                    <button className="btn-primary animate-on-scroll" onClick={() => { setPhone(''); setSubject(''); setPhoneError(''); setSubjectError(''); setFormSubmitted(false); }}>
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <h2>Your exam is closer than you think.<br />Start today.</h2>
                    <p>Book a free 30-minute trial class. No payment needed. Just show up.</p>
                    <div className="form-row">
                      <div className="input-group">
                        <input
                          type="tel"
                          placeholder="Your phone number"
                          value={phone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          required
                        />
                        {phoneError && <span className="input-error">{phoneError}</span>}
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Subject &amp; university"
                          value={subject}
                          onChange={(e) => handleSubjectChange(e.target.value)}
                          required
                        />
                        {subjectError && <span className="input-error">{subjectError}</span>}
                      </div>
                    </div>
                    <div className="cta-btns">
                      <a className="btn-primary animate-on-scroll" href="#" onClick={handleContactFormSubmit}>Claim free trial class ↗</a>
                    </div>
                    <div className="cta-note">No credit card. No obligation. Just results.</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Shared Footer */}
      <footer>
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Sk<span>o</span>rsi
        </div>
        <p>© 2025 Skorsi. Built for B.Tech students who refuse to give up.</p>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <a href="/careers" onClick={(e) => { e.preventDefault(); navigate('/careers'); }}>Careers</a>
          <a href="#">Privacy</a>
          <a href="#">Official Terms</a>
          <a href="/#contact-section" onClick={(e) => handleNavClick(e, '#contact-section')}>Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
