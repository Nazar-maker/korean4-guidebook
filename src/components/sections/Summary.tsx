interface SummaryCardProps {
  number: string;
  text: string;
  highlight: string;
  borderColor: string;
}

function SummaryCard({ number, text, highlight, borderColor }: SummaryCardProps) {
  return (
    <div
      className="p-6 rounded-xl shadow-md"
      style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderLeft: `4px solid ${borderColor}`,
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{
          minWidth: '40px',
          height: '40px',
          borderRadius: '50%',
          background: borderColor,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1.25rem'
        }}>
          {number}
        </div>
        <p className="text-lg" style={{ color: '#475569', lineHeight: '1.6' }}>
          {text} <span style={{ fontWeight: '600', color: '#1e40af' }}>{highlight}</span>
        </p>
      </div>
    </div>
  );
}

export default function Summary() {
  return (
    <section className="space-y-6">
      {/* Header with gradient */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
          borderRadius: 16,
          padding: '32px 24px',
          color: 'white',
          boxShadow: '0 10px 25px rgba(30, 64, 175, 0.3)'
        }}
      >
        <h1 className="text-4xl font-bold" style={{ marginBottom: 12 }}>핵심 요약</h1>
        <p className="text-lg" style={{ opacity: 0.95 }}>
          여러분의 건강한 유학 생활을 응원합니다! 잊지 말아야 할 가장 중요한 4가지입니다.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="space-y-4">
        <SummaryCard
          number="1"
          text="아플 때는 "
          highlight="카이스트 클리닉 (E21)을 이용하세요. (웹사이트 예약!)"
          borderColor="#dc2626"
        />
        <SummaryCard
          number="2"
          text="큰 병원이나 응급실이 필요하면 "
          highlight="'진료의뢰서'를 받거나 119에 연락하세요."
          borderColor="#ea580c"
        />
        <SummaryCard
          number="3"
          text="바빠도 건강한 음식을 먹고, 헬스장에서 "
          highlight="운동하며 스트레스를 푸세요."
          borderColor="#16a34a"
        />
        <SummaryCard
          number="4"
          text=""
          highlight="계절에 맞는 옷을 입으세요. (봄: 마스크, 겨울: 따뜻한 옷)"
          borderColor="#1e40af"
        />
      </div>

      {/* Call to action */}
      <div
        style={{
          background: 'white',
          border: '2px solid #1e40af',
          borderRadius: 12,
          padding: 24,
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(30, 64, 175, 0.1)'
        }}
      >
        <p className="text-lg font-semibold" style={{ color: '#1e40af' }}>
          이 4가지만 기억하시면 카이스트에서 건강한 생활을 하실 수 있습니다!
        </p>
      </div>
    </section>
  );
}
