function QuickLinkCard({ title, description, color, onClick }: { title: string; description: string; color: string; onClick: () => void }) {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md"
      style={{
        borderLeft: `4px solid ${color}`,
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }}
    >
      <h3 className="text-xl font-bold mb-2" style={{ color }}>{title}</h3>
      <p className="text-stone-600">{description}</p>
    </div>
  );
}

export default function Intro({ onSectionChange }: { onSectionChange: (section: string) => void }) {
  return (
    <section className="space-y-6">
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 16,
          padding: '48px 32px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
        }}
      >
        <h1 className="text-4xl font-bold" style={{ marginBottom: 16 }}>건강한 한국 유학 생활 가이드</h1>
        <p className="text-lg" style={{ opacity: 0.95, maxWidth: 600, margin: '0 auto' }}>
          안녕하세요! 한국에 오신 것을 환영합니다. 이 가이드는 여러분이 카이스트에서 공부하는 동안 건강하고 안전하게 지낼 수 있도록 돕기 위해 만들어졌습니다.
        </p>
      </div>

      {/* Welcome Message */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-lg leading-relaxed text-stone-700">
          유학 생활은 새롭고 즐겁지만, 아프거나 스트레스를 받을 때도 있습니다. 이 앱은 그럴 때 필요한 정보들을 모아두었습니다. 아래 카드를 클릭하거나 위의 메뉴에서 원하는 섹션으로 이동할 수 있습니다.
        </p>
      </div>

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">빠른 안내</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickLinkCard
            title="아플 때"
            description="병원 이용법, 약국 정보, 응급 상황 대처"
            color="#dc2626"
            onClick={() => onSectionChange('sick')}
          />
          <QuickLinkCard
            title="매일 건강"
            description="건강한 식단, 운동, 스트레스 관리 팁"
            color="#16a34a"
            onClick={() => onSectionChange('health')}
          />
          <QuickLinkCard
            title="계절별 팁"
            description="봄, 여름, 가을, 겨울 건강 관리 방법"
            color="#ea580c"
            onClick={() => onSectionChange('seasonal')}
          />
          <QuickLinkCard
            title="핵심 요약"
            description="꼭 기억해야 할 4가지 핵심 정보"
            color="#2563eb"
            onClick={() => onSectionChange('summary')}
          />
        </div>
      </div>

      {/* Tip Box */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderLeft: '4px solid #f59e0b',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}
      >
        <p style={{ color: '#92400e', fontWeight: 600 }}>
          <span className="font-bold">팁:</span> 위의 메뉴를 클릭하여 원하는 정보로 바로 이동할 수 있습니다.
        </p>
      </div>
    </section>
  );
}
