import logo from '../assets/logo_nobg.png';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        borderTop: '1px solid #bfdbfe',
        marginTop: '1rem',
        boxShadow: '0 -2px 12px rgba(30, 64, 175, 0.08)',
        paddingTop: '12px',
        paddingBottom: '12px'
      }}
      className="text-stone-800"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Brand and summary centered */}
        <div className="flex flex-col items-center gap-2 mb-2 text-center">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={logo}
              alt="KAIST Health Guide Logo"
              style={{
                width: 32,
                height: 32,
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))'
              }}
            />
            <div>
              <h3 className="text-lg font-bold" style={{ margin: 0 }}>KAIST 건강 가이드</h3>
              <p className="text-sm" style={{ color: '#6b7280', margin: 0 }}>건강한 캠퍼스 라이프를 위한 실용 안내</p>
            </div>
          </div>
        </div>

        {/* Subtle divider */}
        <div style={{ height: 1, background: '#eceff3', margin: '6px 0 8px' }} />

        {/* Bottom meta centered */}
        <div className="text-center text-xs" style={{ color: '#6b7280' }}>
          <p>&copy; 2025 KAIST Health Guide • 학생 안내 페이지</p>
        </div>
      </div>
    </footer>
  );
}
