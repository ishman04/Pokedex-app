import './Search.css';
import { useState } from 'react';

function Search({ setInput }) {

    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        // setSearchValue(inputValue);
        setInput(inputValue);
    };

    return (
        <div className="search-wrapper">
            <input
                id="pokemon-name-search"
                type="text"
                placeholder="Search..."
                onChange={handleInputChange}
            />
        </div>
    );
}

export default Search;
