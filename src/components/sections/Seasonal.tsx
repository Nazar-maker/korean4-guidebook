import { useState, useEffect } from 'react';

export default function Seasonal() {
  const [activeSeason, setActiveSeason] = useState('spring-summer');
  const [weather, setWeather] = useState<any>(null);
  const [airQuality, setAirQuality] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch weather and air quality data for Daejeon (KAIST location)
    const fetchWeatherData = async () => {
      try {
        const API_KEY = '6f93b06c52575e5ca749fc59b0273c3c';
        const lat = 36.3714; // KAIST latitude
        const lon = 127.3619; // KAIST longitude
        
        // Fetch real weather data
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        
        if (!weatherRes.ok) {
          throw new Error(`Weather API error: ${weatherRes.status}`);
        }
        
        const weatherData = await weatherRes.json();
        
        // Fetch real air quality data
        const airRes = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        
        if (!airRes.ok) {
          throw new Error(`Air quality API error: ${airRes.status}`);
        }
        
        const airData = await airRes.json();
        
        setWeather(weatherData);
        setAirQuality(airData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // Fallback to mock data if API fails
        const mockWeatherData = {
          main: { temp: 15, humidity: 65 },
          weather: [{ main: 'Clear', description: 'clear sky' }],
          wind: { speed: 3.5 },
          clouds: { all: 20 }
        };
        
        const mockAirData = {
          list: [{
            main: { aqi: 2 },
            components: {
              pm2_5: 15.5,
              pm10: 25.3
            }
          }]
        };
        
        setWeather(mockWeatherData);
        setAirQuality(mockAirData);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getAirQualityLabel = (aqi: number) => {
    const labels = ['', '좋음 (Good)', '보통 (Fair)', '나쁨 (Moderate)', '매우 나쁨 (Poor)', '최악 (Very Poor)'];
    return labels[aqi] || '알 수 없음';
  };


  const getDustLevel = (pm: number, type: string) => {
    if (type === 'pm2.5') {
      if (pm <= 15) return { label: '좋음', color: '#10b981' };
      if (pm <= 35) return { label: '보통', color: '#84cc16' };
      if (pm <= 75) return { label: '나쁨', color: '#f59e0b' };
      return { label: '매우 나쁨', color: '#ef4444' };
    } else { // pm10
      if (pm <= 30) return { label: '좋음', color: '#10b981' };
      if (pm <= 80) return { label: '보통', color: '#84cc16' };
      if (pm <= 150) return { label: '나쁨', color: '#f59e0b' };
      return { label: '매우 나쁨', color: '#ef4444' };
    }
  };

  const seasonalContent = {
    'spring-summer': {
      title: '봄 & 여름 팁',
      tips: [
        <li key="1"><span className="font-semibold">봄 (Spring):</span> 미세먼지와 황사가 심할 수 있습니다. 날씨 앱에서 공기 질을 확인하고, 나쁘면 마스크를 쓰세요.</li>,
        <li key="2"><span className="font-semibold">여름 (Summer):</span> 덥고 습합니다. 물을 많이 마시고 탈수를 조심하세요.</li>,
        <li key="3"><span className="font-semibold">장마 (Rainy Season):</span> 여름에 비가 아주 많이 오는 기간입니다. 우산을 항상 준비하는 것이 좋습니다.</li>,
      ],
    },
    'autumn-winter': {
      title: '가을 & 겨울 팁',
      tips: [
        <li key="1"><span className="font-semibold">가을 (Autumn):</span> 날씨가 정말 좋습니다. 춥지도 덥지도 않아서 산책하거나 운동하기 가장 좋습니다.</li>,
        <li key="2"><span className="font-semibold">겨울 (Winter):</span> 아주 춥고 눈이 올 때도 있습니다. 따뜻한 옷, 목도리, 장갑이 꼭 필요합니다.</li>,
        <li key="3"><span className="font-semibold">보온 팁:</span> 기숙사도 추울 수 있으니, 따뜻한 잠옷이나 '내복'을 입는 것이 좋습니다. 외출할 때는 옷을 여러 겹 겹쳐 입고, '핫팩'을 사용하는 것도 좋은 방법입니다.</li>,
        <li key="4"><span className="font-semibold">감기 예방:</span> 춥고 건조해서 감기에 걸리기 쉽습니다. 독감 예방주사를 맞고, 따뜻한 차를 마시는 것이 좋습니다.</li>,
      ],
    },
  };

  const current = seasonalContent[activeSeason as keyof typeof seasonalContent];

  return (
    <section className="space-y-6">
      {/* Header with gradient */}
      <div
        style={{
          background: activeSeason === 'spring-summer'
            ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
          borderRadius: 16,
          padding: '32px 24px',
          color: 'white',
          boxShadow: activeSeason === 'spring-summer'
            ? '0 10px 25px rgba(234, 88, 12, 0.3)'
            : '0 10px 25px rgba(59, 130, 246, 0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        <h1 className="text-4xl font-bold" style={{ marginBottom: 12 }}>계절별 건강 팁</h1>
        <p className="text-lg" style={{ opacity: 0.95 }}>
          한국은 사계절이 뚜렷합니다. 계절이 바뀔 때마다 건강을 지키기 위한 팁이 필요합니다. 아래 버튼을 클릭해서 계절별 팁을 확인하세요.
        </p>
      </div>

      {/* Current Weather & Air Quality Widget */}
      {!loading && weather && airQuality && (
        <div
          className="p-6 rounded-xl shadow-md"
          style={{
            background: 'white',
            border: '2px solid #e5e7eb'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <h2 className="text-2xl font-bold text-slate-800">현재 날씨 및 대기질</h2>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: '#dcfce7',
              color: '#16a34a',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#16a34a',
                animation: 'pulse 2s ease-in-out infinite'
              }}></span>
              LIVE
            </span>
          </div>
          
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}</style>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {/* Temperature */}
            <div style={{ 
              padding: '16px', 
              background: activeSeason === 'spring-summer' ? '#fff7ed' : '#f0f9ff', 
              borderRadius: '12px',
              border: activeSeason === 'spring-summer' ? '1px solid #fed7aa' : '1px solid #bfdbfe',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '4px' }}>온도 (Temperature)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: activeSeason === 'spring-summer' ? '#ea580c' : '#1e40af' }}>
                {Math.round(weather.main.temp)}°C
              </div>
            </div>

            {/* Weather Condition */}
            <div style={{ 
              padding: '16px', 
              background: activeSeason === 'spring-summer' ? '#fff7ed' : '#f0f9ff', 
              borderRadius: '12px',
              border: activeSeason === 'spring-summer' ? '1px solid #fed7aa' : '1px solid #bfdbfe',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '4px' }}>날씨 (Condition)</div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: activeSeason === 'spring-summer' ? '#ea580c' : '#1e40af' }}>
                {weather.weather[0].description}
              </div>
            </div>

            {/* Humidity */}
            <div style={{ 
              padding: '16px', 
              background: activeSeason === 'spring-summer' ? '#fff7ed' : '#f0f9ff', 
              borderRadius: '12px',
              border: activeSeason === 'spring-summer' ? '1px solid #fed7aa' : '1px solid #bfdbfe',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '4px' }}>습도 (Humidity)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: activeSeason === 'spring-summer' ? '#ea580c' : '#1e40af' }}>
                {weather.main.humidity}%
              </div>
            </div>

            {/* Rain Chance */}
            <div style={{ 
              padding: '16px', 
              background: activeSeason === 'spring-summer' ? '#fff7ed' : '#f0f9ff', 
              borderRadius: '12px',
              border: activeSeason === 'spring-summer' ? '1px solid #fed7aa' : '1px solid #bfdbfe',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '4px' }}>구름 (Clouds)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: activeSeason === 'spring-summer' ? '#ea580c' : '#1e40af' }}>
                {weather.clouds?.all || 0}%
              </div>
            </div>

            {/* Air Quality Index */}
            <div style={{ 
              padding: '16px', 
              background: activeSeason === 'spring-summer' ? '#fff7ed' : '#f0f9ff', 
              borderRadius: '12px',
              border: activeSeason === 'spring-summer' ? '1px solid #fed7aa' : '1px solid #bfdbfe',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '4px' }}>대기질 (AQI)</div>
              <div style={{ 
                fontSize: '1.125rem', 
                fontWeight: 'bold', 
                color: activeSeason === 'spring-summer' ? '#ea580c' : '#1e40af'
              }}>
                {getAirQualityLabel(airQuality.list[0].main.aqi)}
              </div>
            </div>

            {/* PM2.5 Dust */}
            <div style={{ 
              padding: '16px', 
              background: activeSeason === 'spring-summer' ? '#fff7ed' : '#f0f9ff', 
              borderRadius: '12px',
              border: activeSeason === 'spring-summer' ? '1px solid #fed7aa' : '1px solid #bfdbfe',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '4px' }}>미세먼지 (PM2.5)</div>
              <div style={{ 
                fontSize: '1.125rem', 
                fontWeight: 'bold', 
                color: activeSeason === 'spring-summer' ? '#ea580c' : '#1e40af'
              }}>
                {Math.round(airQuality.list[0].components.pm2_5)} µg/m³
                <span style={{ fontSize: '0.875rem', marginLeft: '8px', color: '#64748b' }}>
                  ({getDustLevel(airQuality.list[0].components.pm2_5, 'pm2.5').label})
                </span>
              </div>
            </div>

            {/* PM10 Dust */}
            <div style={{ 
              padding: '16px', 
              background: activeSeason === 'spring-summer' ? '#fff7ed' : '#f0f9ff', 
              borderRadius: '12px',
              border: activeSeason === 'spring-summer' ? '1px solid #fed7aa' : '1px solid #bfdbfe',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '4px' }}>황사 (PM10)</div>
              <div style={{ 
                fontSize: '1.125rem', 
                fontWeight: 'bold', 
                color: activeSeason === 'spring-summer' ? '#ea580c' : '#1e40af'
              }}>
                {Math.round(airQuality.list[0].components.pm10)} µg/m³
                <span style={{ fontSize: '0.875rem', marginLeft: '8px', color: '#64748b' }}>
                  ({getDustLevel(airQuality.list[0].components.pm10, 'pm10').label})
                </span>
              </div>
            </div>
          </div>
          
          <p style={{ 
            marginTop: '16px', 
            fontSize: '0.875rem', 
            color: '#64748b',
            fontStyle: 'italic' 
          }}>
            위치: KAIST 대전 캠퍼스 | 마지막 업데이트: {new Date().toLocaleTimeString('ko-KR')}
          </p>
        </div>
      )}

      {/* Season toggle buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveSeason('spring-summer')}
          style={{
            padding: '12px 28px',
            borderRadius: 12,
            fontWeight: 600,
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            background: activeSeason === 'spring-summer' 
              ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              : '#f3f4f6',
            color: activeSeason === 'spring-summer' ? 'white' : '#4b5563',
            boxShadow: activeSeason === 'spring-summer' 
              ? '0 8px 16px rgba(245, 158, 11, 0.4)' 
              : '0 2px 4px rgba(0,0,0,0.1)',
            transform: activeSeason === 'spring-summer' ? 'translateY(-2px)' : 'translateY(0)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            if (activeSeason !== 'spring-summer') {
              e.currentTarget.style.borderColor = '#f59e0b';
              e.currentTarget.style.background = '#fef3c7';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSeason !== 'spring-summer') {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
        >
          봄 & 여름
        </button>
        <button
          onClick={() => setActiveSeason('autumn-winter')}
          style={{
            padding: '12px 28px',
            borderRadius: 12,
            fontWeight: 600,
            fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            background: activeSeason === 'autumn-winter' 
              ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
              : '#f3f4f6',
            color: activeSeason === 'autumn-winter' ? 'white' : '#4b5563',
            boxShadow: activeSeason === 'autumn-winter' 
              ? '0 8px 16px rgba(59, 130, 246, 0.4)' 
              : '0 2px 4px rgba(0,0,0,0.1)',
            transform: activeSeason === 'autumn-winter' ? 'translateY(-2px)' : 'translateY(0)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            if (activeSeason !== 'autumn-winter') {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.background = '#dbeafe';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSeason !== 'autumn-winter') {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.background = '#f3f4f6';
            }
          }}
        >
          가을 & 겨울
        </button>
      </div>

      {/* Content box */}
      <div
        className="p-6 rounded-xl shadow-md min-h-[200px]"
        style={{
          background: activeSeason === 'spring-summer'
            ? 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)'
            : 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          border: activeSeason === 'spring-summer'
            ? '2px solid #f59e0b'
            : '2px solid #3b82f6',
          transition: 'all 0.3s ease'
        }}
      >
        <h3 className="text-2xl font-bold mb-4" style={{ 
          color: activeSeason === 'spring-summer' ? '#92400e' : '#1e3a8a' 
        }}>
          {current.title}
        </h3>
        <ul className="space-y-3 list-disc list-inside text-stone-700">
          {current.tips}
        </ul>
      </div>
    </section>
  );
}
