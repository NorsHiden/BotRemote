import * as icons from "iconsax-react";
import { useEffect, useRef } from "react";

const SearchResultItem = () => {
  return (
    <div className="search-result-item">
      <div className="search-result-item-picture"></div>
      <div className="search-result-item-info">
        <div className="search-result-item-title">Title of the song</div>
        <div className="search-result-item-author">Author of the song</div>
      </div>
      <icons.Add
        className="search-result-item-add"
        size="32"
        color="#636363"
        variant="Outline"
      />
    </div>
  );
};

export const Search = () => {
  return (
    <div className="search">
      <div className="search-bar">
        <input
          className="search-bar-input"
          placeholder="Search for a song on Youtube..."
        />
        <icons.SearchNormal1
          className="search-icon"
          size="32"
          color="#636363"
          variant="Outline"
        />
      </div>
      <div className="search-items">
        <SearchResultItem />
        <SearchResultItem />
        <SearchResultItem />
      </div>
    </div>
  );
};
