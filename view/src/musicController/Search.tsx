import axios from "axios";
import { Guild } from "discord.js";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { YouTubeVideo } from "play-dl";
import * as icons from "iconsax-react";

const SearchResultItem = ({ result }: { result: YouTubeVideo }) => {
  return (
    <div className="search-result-item">
      <img className="search-result-item-picture" src={result.thumbnail.url} />
      <div className="search-result-item-info">
        <div className="search-result-item-title">{result.title}</div>
        <div className="search-result-item-author">{result.channel?.name}</div>
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

export const Search = ({ currentGuild }: { currentGuild: Guild }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [searchResults, setSearchResults] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    if (debouncedSearch === "") {
      setSearchResults([]);
      return;
    }
    axios.get(`/api/voices/yt-search?prompt=${debouncedSearch}`).then((res) => {
      setSearchResults(res.data);
    });
  }, [debouncedSearch]);
  return (
    <div className="search">
      <div className="search-bar">
        <input
          className="search-bar-input"
          placeholder="Search for a song on Youtube..."
          onChange={(e) => setSearch(e.target.value)}
          defaultValue={search}
        />
        <icons.SearchNormal1
          className="search-icon"
          size="28"
          color="#636363"
          variant="Outline"
        />
      </div>
      <div className="search-items">
        {searchResults.map((result) => (
          <SearchResultItem key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};
