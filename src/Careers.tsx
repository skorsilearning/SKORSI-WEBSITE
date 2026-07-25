import React, { useEffect } from 'react';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd2hzSsWVIavbln5210BNTtUjoLtAYrKfg3J3b-43lf70R77A/viewform';
const PDF_JD_URL = '/assets/Skorsi_College_Ambassador_JD.pdf';

interface CareersProps {
  navigate?: (path: string) => void;
}

const Careers: React.FC<CareersProps> = () => {
  useEffect(() => {
    document.title = 'Careers — College Ambassador Program | Skorsi';

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Become a Skorsi College Ambassador. Earn 10% commission for every student you enroll — work flexibly right from your campus.'
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <div className="careers-hero">
        <div className="careers-hero-content">
          <div className="badge">
            <span className="badge-dot"></span> Campus Growth &amp; Student Outreach
          </div>
          <h1>
            Become a Skorsi <br />
            <span className="accent">College Ambassador</span>
          </h1>
          <p className="hero-sub">
            Earn 10% commission for every student you enroll — work flexibly, right from your campus.
          </p>
          <div className="hero-ctas">
            <a
              className="btn-primary animate-on-scroll"
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Now ↗
            </a>
            <a
              className="btn-ghost animate-on-scroll"
              href={PDF_JD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Job Description (PDF) ↗
            </a>
          </div>

          {/* Quick Specs Strip */}
          <div className="ambassador-specs">
            <div className="spec-item">
              <i className="ti ti-clock" aria-hidden="true"></i>
              <div>
                <span className="spec-label">Role Type</span>
                <strong className="spec-val">Part-time / Flexible</strong>
              </div>
            </div>
            <div className="spec-item">
              <i className="ti ti-building-community" aria-hidden="true"></i>
              <div>
                <span className="spec-label">Work Mode</span>
                <strong className="spec-val">Remote + On-campus</strong>
              </div>
            </div>
            <div className="spec-item">
              <i className="ti ti-cash" aria-hidden="true"></i>
              <div>
                <span className="spec-label">Compensation</span>
                <strong className="spec-val">10% Commission</strong>
              </div>
            </div>
            <div className="spec-item">
              <i className="ti ti-school" aria-hidden="true"></i>
              <div>
                <span className="spec-label">Who Can Apply</span>
                <strong className="spec-val">Current Students</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="section" id="program-about">
        <div className="eyebrow">Program Overview</div>
        <div className="sec-title">
          Help your peers pass.<br />Earn while you learn.
        </div>
        <div className="sec-sub" style={{ maxWidth: '820px' }}>
          As a College Ambassador, you reach out to fellow students, introduce them to Skorsi's programs, and help those struggling with backlogs or tough semesters. You earn 10% of the course fee for every student you successfully enroll, with no cap.
        </div>

        {/* Highlight Incentive Block */}
        <div className="incentive-card">
          <div className="incentive-header">
            <div className="off-tag tag-p" style={{ fontSize: '13px', padding: '6px 14px' }}>
              <i className="ti ti-sparkles" aria-hidden="true"></i> Generous Rewards
            </div>
            <h2>
              <span className="incentive-big">10% Commission</span> of every course fee
            </h2>
            <p>
              For every student you refer who enrolls in a Skorsi program, you receive 10% of the course fee they pay. There is no cap — your earnings grow directly with the number of students you enroll.
            </p>
          </div>
          <div className="incentive-example">
            <div className="example-badge"><i className="ti ti-bulb" aria-hidden="true"></i> Example</div>
            <p>
              If a student enrolls in a course worth <strong>₹10,000</strong>, you earn <strong>₹1,000</strong>. Enroll 10 students in a month and that's <strong>₹10,000</strong> in commission — alongside your studies.
            </p>
          </div>
        </div>
      </div>

      {/* Responsibilities, Requirements & Benefits Grid */}
      <div className="section" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="eyebrow">Role Details</div>
        <div className="sec-title">What you'll do &amp; what you'll get</div>

        <div className="ambassador-grid">
          {/* Card 1: Key Responsibilities */}
          <div className="amb-card">
            <div className="amb-card-icon"><i className="ti ti-target" aria-hidden="true"></i></div>
            <h3>Key Responsibilities</h3>
            <ul className="amb-list">
              <li><i className="ti ti-check" aria-hidden="true"></i> Reach out to students across your college — classmates, juniors, seniors, and campus groups.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Identify students needing help with backlogs, difficult subjects, or semester exams.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Explain how Skorsi's live classes with IIT &amp; industry experts work.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Guide interested students through the enrollment process and registration.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Promote Skorsi through campus channels — WhatsApp groups, class groups, and notice boards.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Share honest student feedback and campus insights with the Skorsi team.</li>
            </ul>
          </div>

          {/* Card 2: Who We're Looking For */}
          <div className="amb-card">
            <div className="amb-card-icon"><i className="ti ti-user-check" aria-hidden="true"></i></div>
            <h3>Who We're Looking For</h3>
            <ul className="amb-list">
              <li><i className="ti ti-check" aria-hidden="true"></i> Currently enrolled college student (B.Tech students strongly preferred).</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Well-connected and active within your campus community.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Confident communicator, comfortable talking to peers.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Self-motivated and target-driven — you set your own pace.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Trustworthy and honest in how you represent Skorsi.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Active on social media and student groups is a plus.</li>
            </ul>
          </div>

          {/* Card 3: What You Gain */}
          <div className="amb-card">
            <div className="amb-card-icon"><i className="ti ti-trophy" aria-hidden="true"></i></div>
            <h3>What You Gain</h3>
            <ul className="amb-list">
              <li><i className="ti ti-check" aria-hidden="true"></i> <strong>Uncapped 10% commission</strong> on every enrollment.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> <strong>Fully flexible hours</strong> that fit around your classes.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Real experience in sales, marketing, and communication.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Official Skorsi Ambassador certificate for your resume.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Letter of recommendation for top performers.</li>
              <li><i className="ti ti-check" aria-hidden="true"></i> Direct mentorship from the Skorsi team.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Clean Bottom Action Section */}
      <div className="section" style={{ padding: '80px 36px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <div className="eyebrow" style={{ display: 'inline-flex', marginBottom: '12px' }}>
            Ready to join us?
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
            Start your journey as a Skorsi Ambassador
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
            Review the official job description or complete the application form directly in a new tab. We review applications on a rolling basis.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              className="btn-primary animate-on-scroll"
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '14px 32px', fontSize: '15px' }}
            >
              Apply Now ↗
            </a>
            <a
              className="btn-ghost animate-on-scroll"
              href={PDF_JD_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: '14px 28px', fontSize: '15px' }}
            >
              View Job Description (PDF) ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
