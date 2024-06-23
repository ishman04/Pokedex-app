import './Search.css';

function Search({ set, func }) {
    const handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        set(inputValue);
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
