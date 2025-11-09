import { useState } from 'react';

export default function Sick() {
  const [showMap, setShowMap] = useState(false);
  
  const dialogues = [
    {
      title: "감기 증상 (Cold/Flu)",
      korean: "머리가 아프고 열이 나요. 기침도 해요.",
      english: "I have a headache and fever. I'm also coughing."
    },
    {
      title: "배탈/소화불량 (Stomach ache)",
      korean: "배가 아파요. 설사를 해요.",
      english: "I have a stomach ache. I have diarrhea."
    },
    {
      title: "부상 (Injury)",
      korean: "발목을 삐었어요. 걸을 때 아파요.",
      english: "I sprained my ankle. It hurts when I walk."
    },
    {
      title: "피부 문제 (Skin issue)",
      korean: "피부에 발진이 생겼어요. 가려워요.",
      english: "I have a rash on my skin. It's itchy."
    },
    {
      title: "스트레스/불안 (Stress/Anxiety)",
      korean: "요즘 잠을 잘 못 자요. 스트레스가 심해요.",
      english: "I can't sleep well these days. I'm very stressed."
    },
    {
      title: "치통 (Toothache)",
      korean: "이가 아파요. 잇몸이 붓고 있어요.",
      english: "I have a toothache. My gums are swollen."
    },
    {
      title: "알레르기 (Allergy)",
      korean: "재채기가 계속 나와요. 눈도 가려워요.",
      english: "I keep sneezing. My eyes are itchy too."
    },
    {
      title: "근육통 (Muscle pain)",
      korean: "어깨가 너무 아파요. 목도 뻐근해요.",
      english: "My shoulder hurts so much. My neck is stiff too."
    }
  ];

  const [currentDialogue, setCurrentDialogue] = useState(dialogues[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewDialogue = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * dialogues.length);
      setCurrentDialogue(dialogues[randomIndex]);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <section className="space-y-6">
      {/* Header with gradient */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)', 
          borderRadius: 16,
          padding: '32px 24px',
          color: 'white',
          boxShadow: '0 4px 12px rgba(30, 64, 175, 0.15)'
        }}
      >
        <h1 className="text-4xl font-bold" style={{ marginBottom: 12 }}>아플 때: 병원 및 약국 이용</h1>
        <p className="text-lg" style={{ opacity: 0.95 }}>
          몸이 아플 때는 당황하지 말고 이 정보를 확인하세요. 카이스트 교내 클리닉부터 응급 상황 시 이용할 수 있는 학교 밖 병원 정보까지 정리했습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="p-6 rounded-xl shadow-md"
          style={{
            background: 'white',
            border: '1px solid #e5e7eb'
          }}
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-4">카이스트 클리닉 (파팔라도 센터)</h2>
          <p className="text-slate-600 mb-4 font-medium">가장 빠르고 편리하게 이용할 수 있는 교내 병원입니다.</p>
          
          <div className="space-y-3 mb-4">
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#1e40af',
                minWidth: '90px',
                fontSize: '0.875rem'
              }}>위치</span>
              <button
                onClick={() => setShowMap(!showMap)}
                style={{
                  color: '#1e40af',
                  textDecoration: 'none',
                  fontWeight: 'inherit',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                  font: 'inherit',
                  flex: 1
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                E21 건물 1층
              </button>
            </div>
          
          {showMap && (
            <div className="mt-2 mb-4" style={{ 
              borderRadius: 12, 
              overflow: 'hidden',
              border: '1px solid #d1d5db',
              background: 'white'
            }}>
              <img 
                src="/campus_map.png" 
                alt="KAIST Campus Map - E21 Building Location" 
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block'
                }}
              />
              <p style={{
                padding: '8px 12px',
                fontSize: '0.875rem',
                color: '#6b7280',
                textAlign: 'center',
                background: '#f3f4f6'
              }}>
                E21 건물 위치를 확인하세요
              </p>
            </div>
          )}
          </div>
          
          <div className="space-y-3 mb-4">
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#1e40af',
                minWidth: '90px',
                fontSize: '0.875rem'
              }}>진료 과목</span>
              <span style={{ color: '#475569', flex: 1 }}>내과, 정신건강의학과, 치과</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#1e40af',
                minWidth: '90px',
                fontSize: '0.875rem'
              }}>운영 시간</span>
              <span style={{ color: '#475569', flex: 1 }}>평일 9:00 - 17:30 (점심시간 12:00 - 13:00)</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#1e40af',
                minWidth: '90px',
                fontSize: '0.875rem'
              }}>셔틀 버스</span>
              <span style={{ color: '#475569', flex: 1 }}>북측 기숙사 '카이마루' 앞에서 탑승 후 '카이스트 클리닉 (E21)' 하차</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#1e40af',
                minWidth: '90px',
                fontSize: '0.875rem'
              }}>준비물</span>
              <span style={{ color: '#475569', flex: 1 }}>외국인 등록증, 학생증</span>
            </div>
          </div>
          
          <a
            href="https://clinic.kaist.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#1e40af',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1e3a8a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1e40af';
            }}
          >
            웹사이트에서 예약하기
          </a>
        </div>

        <div className="space-y-4">
          <div
            className="p-6 rounded-xl shadow-md"
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderLeft: '4px solid #dc2626'
            }}
          >
            <h3 className="text-xl font-bold text-slate-800 mb-4">병원 (학교 밖) & 응급실</h3>
            <div className="space-y-3 text-slate-600">
              <div>
                <span className="font-semibold text-slate-800">언제 가나요?</span>
                <p>카이스트 클리닉에 필요한 진료가 없거나 (예: 정형외과), 문을 닫았을 때 갑니다.</p>
              </div>
              <div>
                <span className="font-semibold text-slate-800">응급실:</span>
                <p>밤이나 주말에 아주 아프면 24시간 운영하는 '응급실'에 가야 합니다. (예: 충남대학교병원)</p>
              </div>
              <div>
                <span className="font-semibold text-slate-800">진료의뢰서:</span>
                <p>어디로 가야 할지 모를 때, 카이스트 클리닉에서 받을 수 있습니다.</p>
              </div>
            </div>
          </div>

          <div
            className="p-6 rounded-xl shadow-md"
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderLeft: '4px solid #059669'
            }}
          >
            <h3 className="text-xl font-bold text-slate-800 mb-4">약국 (Pharmacy)</h3>
            <div className="space-y-3 text-slate-600">
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: '#059669',
                  minWidth: '80px',
                  fontSize: '0.875rem'
                }}>찾는 법</span>
                <span style={{ flex: 1 }}>초록색 십자가 (✚) 사인</span>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: '#059669',
                  minWidth: '80px',
                  fontSize: '0.875rem'
                }}>운영 시간</span>
                <span style={{ flex: 1 }}>보통 평일 9:00 - 18:00 (약국마다 다름)</span>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: '#059669',
                  minWidth: '80px',
                  fontSize: '0.875rem'
                }}>약 종류</span>
                <span style={{ flex: 1 }}>처방전이 필요한 약, 감기약/소화제/밴드 등 처방전 없이 사는 약</span>
              </div>
            </div>
          </div>

          <div
            className="p-6 rounded-xl shadow-md"
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderLeft: '4px solid #f59e0b'
            }}
          >
            <h3 className="text-xl font-bold text-slate-800 mb-4">증상 설명 예시 (Sample Dialogues)</h3>
            <p className="text-slate-600 mb-3 font-medium">병원이나 클리닉에서 이렇게 말해보세요:</p>
            
            <div style={{
              background: '#f9fafb',
              padding: '16px 20px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              minHeight: '100px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              opacity: isGenerating ? 0.5 : 1,
              transition: 'opacity 0.3s ease'
            }}>
              <p className="font-semibold text-slate-800 mb-2">{currentDialogue.title}:</p>
              <p className="text-slate-600 text-sm mb-1">
                "{currentDialogue.korean}"<br/>
                <span className="italic">"{currentDialogue.english}"</span>
              </p>
            </div>

            <button
              onClick={generateNewDialogue}
              disabled={isGenerating}
              style={{
                marginTop: '16px',
                width: '100%',
                background: isGenerating ? '#9ca3af' : '#1e40af',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                fontWeight: 600,
                border: 'none',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isGenerating) {
                  e.currentTarget.style.background = '#1e3a8a';
                }
              }}
              onMouseLeave={(e) => {
                if (!isGenerating) {
                  e.currentTarget.style.background = '#1e40af';
                }
              }}
            >
              {isGenerating ? '생성 중...' : '새로운 대화 생성'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
