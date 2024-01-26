import  { useState, useEffect } from 'react';
import countryData from './resources/countryData.json'; // Adjust the path based on your project structure

const SearchBox = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (inputText.trim() === '') {
      setSuggestions([]);
      setIsDropdownVisible(false);
      return;
    }

    const filteredSuggestions = countryData.filter(entry =>
      entry.name.toLowerCase().includes(inputText.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setIsDropdownVisible(true);
  }, [inputText]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <input className='input'
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type here..."
      />
      {isDropdownVisible && (
        <ul>
          {suggestions.map((entry, index) => (
            <li key={index}>{entry.name} - {entry.code}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
