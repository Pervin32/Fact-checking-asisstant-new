import React, { useState } from 'react';
import enter from '@/assets/img/enter.svg';
import search from '@/assets/img/search.svg';
import { Link, useNavigate } from 'react-router-dom';

const Text_Input = ({ addSearchToHistory, username }) => {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchText.trim() === '') return;

    try {
      setIsLoading(true);

      // Real API request
      const response = await fetch('https://your-api-endpoint.com/api/fact-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchText }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const apiData = await response.json();

      const loadingData = {
        searchText,
        score: apiData.score || 0,
        sources: apiData.sources || [],
        recommendations: apiData.recommendations || [],
      };

      addSearchToHistory(searchText);
      navigate('/result', { state: loadingData });
    } catch (error) {
      console.error('Error in API request:', error);

      const fallbackData = {
        searchText,
        score: 0,
        sources: [
          { title: 'Error', score: 0, description: 'Unable to verify fact' },
        ],
        recommendations: [
          'Check your internet connection',
          'Try again later',
          'Verify information manually',
        ],
      };

      navigate('/result', { state: fallbackData });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate('/loading');
      handleSearch();
    }
  };

  return (
    <div>
      <div className="flex justify-end gap-6 pt-10 pr-8">
        {username ? (
          <div className="bg-blue w-[100px] sm:w-[168px] h-9 text-white rounded-full text-center text-sm sm:text-base leading-[30px] flex items-center justify-center">
            {username}
          </div>
        ) : (
          <Link
            to="/loading"
            className="bg-blue w-[100px] sm:w-[168px] h-9 text-white rounded-full text-center text-sm sm:text-base leading-[30px] flex items-center justify-center"
          >
            A
          </Link>
        )}
        <Link to="/registration">
          <img src={enter} alt="enter" className="size-8 md:size-9" />
        </Link>
      </div>

      <div className="max-w-[744px] w-full h-12 sm:h-[52px] flex items-center justify-between mx-auto mt-[150px] sm:mt-[375px] border px-4 sm:px-6 rounded-lg sm:rounded-[16px] text-[#8D8D8D]">
        <input
          type="text"
          placeholder="İnformasiya və ya keçid linkini bura daxil edin!"
          className="w-full text-sm sm:text-lg leading-6 outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
        />
        <div
          className={`bg-[#959595] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
          onClick={!isLoading ? handleSearch : undefined}
        >
          {isLoading ? (
            <div className="animate-spin">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <img src={search} alt="search" className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Text_Input;
