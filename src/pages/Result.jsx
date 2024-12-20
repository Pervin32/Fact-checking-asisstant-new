import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '@/assets/img/logo_dashboard.svg';
import pen from '@/assets/img/pen.svg';
import enter from '@/assets/img/enter.svg';

// Scor rəngini müəyyən edən funksiya
const getScoreColor = (score) => {
  if (score === 0) return '#000000'; // Qara rəng 0 bal üçün
  if (score >= 80) return '#22c55e'; // 80 və daha yüksək bal üçün yaşıl
  if (score >= 60) return '#eab308'; // 60-80 arasında sarı
  return '#ef4444'; // Digər hallarda qırmızı
};

// Scorun üstündəki div-in background rəngini müəyyən edən funksiya
const getBackgroundColor = (score) => {
  if (score === 0) return '#e5e5e5'; // Boz rəng 0 bal üçün
  if (score >= 80) return '#d1fae5'; // Yaşıl fon
  if (score >= 60) return '#fef3c7'; // Sarı fon
  return '#fee2e2'; // Qırmızı fon
};

// Tarix kateqoriyasını müəyyən edən funksiya
const getDateCategory = (date) => {
  const today = new Date();
  const searchDate = new Date(date);
  const daysDiff = (today - searchDate) / (1000 * 60 * 60 * 24);

  if (daysDiff < 0) return 'Gələcək tarix';
  if (daysDiff <= 7) return 'Son 7 gün';
  if (daysDiff <= 30) return 'Son 30 gün';

  return `${searchDate.toLocaleString('default', { month: 'long' })} ${searchDate.getFullYear()}`;
};

const Result = ({ searchHistory = [] }) => {
  const location = useLocation();
  const [groupedHistory, setGroupedHistory] = useState({});
  const [latestSearch, setLatestSearch] = useState({ text: null, url: null });
  const [score, setScore] = useState(location.state?.score || 0);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchFactCheck = async () => {
      try {
        const searchText = location.state?.searchText || '';

        const response = await fetch('https://fact-checking-assistant.onrender.com/factcheck', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fact: searchText }),
        });

        if (!response.ok) {
          console.error('API Status:', response.status, response.statusText);
          throw new Error('API sorğusu uğursuz oldu');
        }

        const data = await response.json();
        setApiResponse(data);
        setScore(data.score || 0);
      } catch (error) {
        console.error('Tam səhv detalları:', error);
        setScore(60);
      }
    };

    if (Array.isArray(searchHistory) && searchHistory.length > 0) {
      const grouped = searchHistory.reduce((acc, item) => {
        const category = getDateCategory(item.date);
        acc[category] = acc[category] || [];
        acc[category].push(item);
        return acc;
      }, {});
      setGroupedHistory(grouped);

      const allSearches = Object.values(grouped).flat();
      const latest = allSearches[allSearches.length - 1];
      setLatestSearch({ text: latest?.text, url: latest?.url });
    }

    fetchFactCheck();
  }, [searchHistory, location.state]);

  return (
    <div className="md:grid md:grid-cols-[268px_1fr] h-screen">
      {/* Sol panel */}
      <aside className="p-4 md:p-9 border md:border-r border-[#C8C8C8] md:h-screen">
        <div className="flex items-center justify-between mb-6 md:mb-12">
          <Link to="/">
            <img src={logo} alt="logo" className="w-[100px] md:w-[129px] h-[35px] md:h-[45px]" />
          </Link>
          <Link to="/textinput">
            <img src={pen} alt="pen" className="w-5 h-5 md:w-6 md:h-6" />
          </Link>
        </div>
        <div className="pr-2 md:pr-[23px] overflow-hidden">
          {Object.keys(groupedHistory).length ? (
            Object.keys(groupedHistory).map((category, index) => (
              <div key={index}>
                <h3 className="font-bold mb-2 text-sm">{category}</h3>
                <ul className="space-y-2 mb-4 md:mb-6">
                  {groupedHistory[category].map((item, idx) => (
                    <li 
                      key={idx} 
                      className="p-2 rounded-md cursor-pointer"
                      onClick={() => setLatestSearch({ text: item.text, url: item.url })}
                    >
                      <p 
                        className="text-xs md:text-sm text-ellipsis overflow-hidden whitespace-nowrap w-[200px]" 
                        title={item.text} // Hover ilə tam mətni göstərmək üçün
                      >
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-xs md:text-sm">{location.state?.searchText || 'Hələ axtarış yoxdur.'}</p>
          )}
        </div>
      </aside>

      {/* Sağ panel */}
      <div className="grid grid-rows">
        <section className="flex justify-end gap-4 pt-4 pr-4 md:pt-10 md:pr-8 bg-white">
          <Link to="/result" className="bg-blue w-[80px] md:w-[100px] lg:w-[168px] h-8 md:h-9 text-white rounded-full text-center text-xs md:text-sm lg:text-base flex items-center justify-center">
            A
          </Link>
          <Link to="/registration">
            <img src={enter} alt="enter" className="size-8 md:size-9" />
          </Link>
        </section>

        <div className="flex flex-col text-center min-h-screen p-6">
          <div
            className="mt-[74px] text-center w-[246px] h-[27px] rounded-[17px] mx-auto"
            style={{ backgroundColor: getBackgroundColor(score) }}
          ></div>

          <div className="mb-12 mt-[53px] flex flex-col justify-center items-center text-center">
            <div
              className="font-semibold border-t border-black w-[234px] text-5xl leading-[72px] mx-auto pt-[19px]"
              style={{ color: getScoreColor(score) }}
            >
              {score}
            </div>
            <h2 className="text-xl font-semibold mb-2">Ümumi bal</h2>
            <div className="mt-4 p-2 rounded-md text-center">
              <p className="text-sm font-normal text-[15px] leading-6 w-[576px]">
                {location.state?.searchText ||
                  latestSearch.text ||
                  'Axtarış nəticəsi tapılmadı.'}
              </p>
              {latestSearch.url && (
                <a href={latestSearch.url} className="text-blue-500 text-xs md:text-sm mt-1 block">
                  {latestSearch.url}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
