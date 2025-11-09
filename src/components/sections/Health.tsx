import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Health() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [showGymPhotos, setShowGymPhotos] = useState(false);

  const foodImages: Record<string, string[]> = {
    '샐러드 및 닭가슴살': [
      '/salad_chicken.jpg',
      '/salad_chicken2.jpg',
      '/chicken.png',
      '/chicken2.png'
    ],
    '바나나 및 요거트': [
      '/banana.avif',
      '/banana1.jpg',
      '/yogurt.jpg',
      '/yogurt1.webp'
    ],
    '건강 음료': [
      '/vitamin.avif',
      '/vitamin1.jpg',
      '/vitamin2.jpg'
    ],
    '단백질 쉐이크': [
      '/protein.jpg',
      '/protein1.jpg',
      '/protein3.png',
      '/protein4.jpg'
    ]
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'radar',
      data: {
        labels: ['공부 (Study)', '수면 (Sleep)', '운동 (Exercise)', '친구 (Social)', '취미 (Hobby)'],
        datasets: [
          {
            label: '생활 밸런스',
            data: [4, 3, 3, 2, 2],
            fill: true,
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            borderColor: 'rgb(37, 99, 235)',
            pointBackgroundColor: 'rgb(37, 99, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(37, 99, 235)',
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
            },
          },
        },
      } as any,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

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
        <h1 className="text-4xl font-bold" style={{ marginBottom: 12 }}>매일 건강 관리</h1>
        <p className="text-lg" style={{ opacity: 0.95 }}>
          아프기 전에 예방하는 것이 가장 좋습니다. 바쁜 유학 생활 중에도 쉽게 실천할 수 있는 건강한 식단과 스트레스 관리법을 소개합니다.
        </p>
      </div>

      {/* Food Section */}
      <div
        className="p-6 rounded-xl shadow-md"
        style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderLeft: '4px solid #059669'
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-slate-800">건강한 편의점 음식</h2>
        <p className="text-slate-600 mb-6 font-medium">학생 식당이 가장 좋지만, 바쁠 때는 편의점에서 건강한 음식을 선택해 보세요.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { title: '샐러드 및 닭가슴살', desc: '신선한 야채와 단백질' },
            { title: '바나나 및 요거트', desc: '간편한 아침 식사' },
            { title: '건강 음료', desc: '비타500 비타민 음료' },
            { title: '단백질 쉐이크', desc: '닥터유 등 추천' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg"
              style={{
                background: '#f9fafb',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid #e5e7eb'
              }}
              onClick={() => {
                if (foodImages[item.title].length > 0) {
                  setSelectedFood(item.title);
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = '#059669';
                e.currentTarget.style.background = '#f0fdf4';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <p className="font-semibold text-slate-800">{item.title}</p>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying food images */}
      {selectedFood && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedFood(null)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 16,
              padding: '24px',
              maxWidth: '1200px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 className="text-2xl font-bold text-slate-800">{selectedFood}</h3>
              <button
                onClick={() => setSelectedFood(null)}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#dc2626'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#ef4444'}
              >
                ✕
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {foodImages[selectedFood].map((image, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    background: '#f9fafb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '200px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <img
                    src={image}
                    alt={`${selectedFood} ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '300px',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="p-6 rounded-xl shadow-md"
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderLeft: '4px solid #1e40af'
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-800">스트레스 및 운동</h2>
          <p className="text-slate-600 mb-4 font-medium">공부도 중요하지만, 스트레스 관리는 더 중요합니다.</p>
          <div className="space-y-3 text-slate-600 mb-4">
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#1e40af',
                minWidth: '60px',
                fontSize: '0.875rem'
              }}>산책</span>
              <span style={{ flex: 1 }}>날씨 좋을 때 캠퍼스를 걷는 것을 추천합니다.</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#1e40af',
                minWidth: '60px',
                fontSize: '0.875rem'
              }}>운동</span>
              <span style={{ flex: 1 }}>
                스포츠 컴플렉스(N3)나 기숙사{' '}
                <span
                  onClick={() => setShowGymPhotos(!showGymPhotos)}
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    color: '#1e40af',
                    fontWeight: '500'
                  }}
                >
                  헬스장
                </span>
                을 이용하세요.
              </span>
            </div>
            
            {showGymPhotos && (
              <div style={{ 
                marginTop: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '8px'
              }}>
                <img 
                  src="/fitness_center.jpg" 
                  alt="Fitness Center 1"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
                <img 
                  src="/fitness_center2.jpg" 
                  alt="Fitness Center 2"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#1e40af',
                minWidth: '60px',
                fontSize: '0.875rem'
              }}>상담</span>
              <span style={{ flex: 1 }}>E21 클리닉 상담센터에서 도움을 받을 수 있습니다.</span>
            </div>
          </div>
          <div className="chart-container mt-4" style={{ background: 'white', padding: 16, borderRadius: 12 }}>
            <canvas ref={chartRef} id="balanceChart"></canvas>
          </div>
          <p className="text-center text-sm text-stone-500 mt-2">건강한 생활 밸런스 (예시)</p>
        </div>

        <div
          className="p-6 rounded-xl shadow-md"
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderLeft: '4px solid #dc2626'
          }}
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-800">기숙사 안전</h2>
          <p className="text-slate-600 mb-4 font-medium">여러분의 방은 소중한 공간입니다. 안전 수칙을 지켜주세요.</p>
          <div className="space-y-3 text-slate-600">
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#dc2626',
                minWidth: '80px',
                fontSize: '0.875rem'
              }}>문 잠그기</span>
              <span style={{ flex: 1 }}>방을 나갈 때는 문을 꼭 잠가주세요.</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#dc2626',
                minWidth: '80px',
                fontSize: '0.875rem'
              }}>화재 조심</span>
              <span style={{ flex: 1 }}>비상구(Emergency Exit) 위치를 확인하세요.</span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ 
                fontWeight: 'bold', 
                color: '#dc2626',
                minWidth: '80px',
                fontSize: '0.875rem'
              }}>소음 주의</span>
              <span style={{ flex: 1 }}>기숙사 안에서는 조용히 하는 것이 좋습니다.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
