interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  menuOpen: boolean;
  onMenuClose: () => void;
}

export default function Sidebar({ activeSection, onSectionChange, menuOpen, onMenuClose }: SidebarProps) {
  const navItems = [
    { id: 'intro', label: '🏠  소개', target: 'content-intro' },
    { id: 'sick', label: '🏥  아플 때', target: 'content-sick' },
    { id: 'health', label: '💪  매일 건강', target: 'content-health' },
    { id: 'seasonal', label: '☀️  계절별 팁', target: 'content-seasonal' },
    { id: 'summary', label: '📋  핵심 요약', target: 'content-summary' },
  ];

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onMenuClose();
  };

  return (
    <>
      {/* Mobile backdrop - closes menu when clicked */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-5"
          onClick={onMenuClose}
          style={{ zIndex: 9 }}
        />
      )}
      
      <nav
        id="sidebar"
        className={`w-64 bg-white shadow-lg fixed md:static inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Close button for mobile */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            onClick={onMenuClose}
            className="text-stone-800 font-bold text-2xl leading-none hover:text-stone-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700">생활 가이드</h2>
          <p className="text-sm text-stone-500">카이스트 학생용</p>
        </div>
        <ul className="mt-6 space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`nav-link block w-full text-left rounded-lg px-6 py-3 transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
