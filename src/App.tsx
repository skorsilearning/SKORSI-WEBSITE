import React, { useState, useEffect } from 'react';

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
  const [theme, setTheme] = useState<'blue' | 'red'>('blue');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('skorsi-theme');
    if (savedTheme === 'blue' || savedTheme === 'red') {
      setTheme(savedTheme);
    }
  }, []);

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
  }, [formSubmitted]); // Re-run when formSubmitted changes to bind state buttons

  const toggleTheme = (newTheme: 'blue' | 'red') => {
    setTheme(newTheme);
    localStorage.setItem('skorsi-theme', newTheme);
  };

  const handleContactFormSubmit = async (event?: React.SyntheticEvent) => {
    if (event) event.preventDefault();

    const trimmedPhone = phone.trim();
    const trimmedSubject = subject.trim();

    if (!trimmedPhone || !trimmedSubject) {
      alert('Please fill out both fields.');
      return;
    }

    const leadsUrl = import.meta.env.VITE_LEADS_SHEET_URL || '';
    const payload = {
      phone: trimmedPhone,
      subject: trimmedSubject,
      timestamp: new Date().toISOString()
    };

    try {
      // Send POST request using fetch with Content-Type: text/plain to avoid CORS preflight issues
      await fetch(leadsUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      // Log the error but do not block the WhatsApp redirect
      console.error('Error submitting lead to Sheets:', error);
    } finally {
      // Show confirmation screen
      setFormSubmitted(true);
    }

    // Direct redirection to WhatsApp
    const message = `Hello Skorsi! I would like to book a free trial class. My WhatsApp number is ${trimmedPhone} and my subject & university is ${trimmedSubject}.`;
    const encodedText = encodeURIComponent(message);
    const url = `https://wa.me/91XXXXXXXXXX?text=${encodedText}`;
    window.open(url, '_blank');
  };

  const openWhatsAppDirect = (event?: React.SyntheticEvent) => {
    if (event) event.preventDefault();

    const trimmedPhone = phone.trim();
    const trimmedSubject = subject.trim();

    let message = "Hi Skorsi, I'd like to ask some questions about your classes.";
    if (trimmedPhone || trimmedSubject) {
      message += ` My details are: Phone: ${trimmedPhone || 'N/A'}, Subject/University: ${trimmedSubject || 'N/A'}`;
    }
    const encodedText = encodeURIComponent(message);
    const url = `https://wa.me/91XXXXXXXXXX?text=${encodedText}`;
    window.open(url, '_blank');
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
    <div className={`theme-${theme}`}>
      <nav>
        <div className="logo">Sk<span>o</span>rsi</div>
        <ul className={isMenuOpen ? 'open' : ''}>
          <li><a href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How it works</a></li>
          <li><a href="#subjects-section" onClick={() => setIsMenuOpen(false)}>Subjects</a></li>
          <li><a href="#pricing-section" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
          <li><a href="#testimonials-section" onClick={() => setIsMenuOpen(false)}>Experts</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <div className="theme-toggle">
            <button
              className={`t-btn ${theme === 'blue' ? 'active' : ''}`}
              onClick={() => toggleTheme('blue')}
            >
              Blue
            </button>
            <button
              className={`t-btn ${theme === 'red' ? 'active' : ''}`}
              onClick={() => toggleTheme('red')}
            >
              Red
            </button>
          </div>
          <a className="btn-primary animate-on-scroll" href="#contact-section">Book free class ↗</a>
          <button className="menu-toggle-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation">
            <i className={`ti ${isMenuOpen ? 'ti-x' : 'ti-menu-2'}`}></i>
          </button>
        </div>
      </nav>

      <div className="hero">
        <div>
          <div className="badge"><span className="badge-dot"></span> Live classes with IIT &amp; industry experts</div>
          <h1>Clear your <span className="accent">backlog.</span><br />Pass your<br />semester.</h1>
          <p className="hero-sub">Online live classes built for B.Tech students — 1:1 or group — with verified subject experts. Stop failing, start graduating.</p>
          <div className="hero-ctas">
            <a className="btn-primary animate-on-scroll" href="#contact-section">Book a free trial class ↗</a>
            <a className="btn-ghost animate-on-scroll" href="#how-it-works">See how it works</a>
          </div>
          <div className="trust-bar">
            <div className="trust-item"><i className="ti ti-check" aria-hidden="true"></i> No long-term contracts</div>
            <div className="trust-item"><i className="ti ti-check" aria-hidden="true"></i> Classes start today</div>
            <div className="trust-item"><i className="ti ti-check" aria-hidden="true"></i> Money-back guarantee</div>
          </div>
        </div>

        {/* Hero Video Player replaced with Static study banner image */}
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
              <li><i className="ti ti-check" aria-hidden="true"></i> WhatsApp doubt support</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Recorded access (7 days)</li>
            </ul>
            <div className="price-line">Starting at <strong>₹999</strong> / subject</div>
            <div style={{ marginTop: '16px' }}><a className="btn-primary animate-on-scroll" href="#contact-section">Explore batches ↗</a></div>
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
              <li><i className="ti ti-check" aria-hidden="true"></i> Dedicated WhatsApp support</li>
            </ul>
            <div className="price-line">Starting at <strong>₹299</strong> / session</div>
            <div style={{ marginTop: '16px' }}><a className="btn-ghost animate-on-scroll" href="#contact-section">Book a session</a></div>
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

      {/* Testimonials Static Grid converted to Infinite Auto-Scroll Carousel */}
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
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px', fontFamily: 'Montserrat', color: 'var(--text-main)' }}>Lead Registered Successfully!</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px' }}>
                  Thank you, our team will reach out to you for the next process.
                </p>
                <button className="btn-primary animate-on-scroll" onClick={() => { setPhone(''); setSubject(''); setFormSubmitted(false); }}>
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <h2>Your exam is closer than you think.<br />Start today.</h2>
                <p>Book a free 30-minute trial class. No payment needed. Just show up.</p>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Your WhatsApp number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Subject &amp; university"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
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

      <footer>
        <div className="logo">Sk<span>o</span>rsi</div>
        <p>© 2025 Skorsi. Built for B.Tech students who refuse to give up.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#contact-section">Contact</a>
          <a href="#" className="animate-on-scroll" onClick={openWhatsAppDirect}>WhatsApp</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
