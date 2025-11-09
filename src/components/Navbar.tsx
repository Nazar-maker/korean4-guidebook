import logo from '../assets/logo_nobg.png';

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const navItems = [
    { id: 'sick', label: '아플 때' },
    { id: 'health', label: '매일 건강' },
    { id: 'seasonal', label: '계절별 팁' },
    { id: 'summary', label: '핵심 요약' },
  ];

  return (
    <nav className="navbar-container">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          gap: '24px',
          flexWrap: 'wrap'
        }}
      >
        {/* Logo/Title Section -ClickableToHome */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => onSectionChange('intro')}
        >
          <img
            src={logo}
            alt="KAIST 로고"
            style={{ width: 36, height: 36, objectFit: 'contain' }}
          />
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>
              KAIST 건강 가이드
            </h1>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
              카이스트 학생 캠퍼스 건강 안내
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`navbar-tab ${activeSection === item.id ? 'navbar-tab-active' : 'navbar-tab-inactive'}`}
            >
              <span className="navbar-tab-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
