//둘러보기 - 탐색 page
import { CiSearch } from 'react-icons/ci';

const Search = () => {
  return (
    <>
      <div>
        <header>
          <div
            className="flex gap-2 items-center border-zinc-300 bg-gray-100 rounded-2xl
          m-2 p-2"
          >
            <CiSearch />
            <input type="search" placeholder="검색" />
          </div>
        </header>
        <div>탐색</div>
      </div>
    </>
  );
};

export default Search;
