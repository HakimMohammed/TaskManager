import { useState } from "react";


export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const submitHandeler = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="search-bar">
        <form
          onSubmit={submitHandeler}
          className="search-form d-flex align-items-center"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div>
    </>
  );
}
