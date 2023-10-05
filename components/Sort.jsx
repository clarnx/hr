import { BsChevronDown } from "react-icons/bs";

const Sort = ({ sortMode, openSortModal, toggleSortModal, sortProducts }) => {

    const handleToggleSortModal = () => {
        toggleSortModal(); // Call the toggleSortModal function passed as a prop
      };


  return (
    <div
      onClick={toggleSortModal}
      className="cursor-pointer relative text-sm sm:text-base md:text-lg flex items-center gap-2 font-bold"
    >
        <p
      onClick={handleToggleSortModal}
      className="cursor-pointer relative text-sm sm:text-base md:text-lg flex items-center gap-2 font-bold"
        />
      Sort by {sortMode} <BsChevronDown />
      {openSortModal && (
        <span className="absolute rounded-lg top-full right-0 z-[1000] flex flex-col gap-0  bg-transparent shadow-xl min-w-[160px] sm:min-w-[200px] text-center">
          <span
            onClick={() => sortProducts("relevance")}
            className="w-full bg-white border-[1px] py-2 border-gray-200 text-xs sm:text-sm md:text-base px-2 hover:bg-gray-200 transition"
          >
            Relevance
          </span>
          <span
            onClick={() => sortProducts("price:high-to-low")}
            className="w-full bg-white border-[1px] py-2 border-gray-200 text-xs sm:text-sm md:text-base px-2 hover:bg-gray-200 transition"
          >{`Price: High to Low`}</span>
          <span
            onClick={() => sortProducts("price:low-to-high")}
            className="w-full bg-white border-[1px] py-2 border-gray-200 text-xs sm:text-sm md:text-base px-2 hover:bg-gray-200 transition"
          >{`Price: Low to High`}</span>
          <span
            onClick={() => sortProducts("rating")}
            className="w-full bg-white border-[1px] py-2 border-gray-200 text-xs sm:text-sm md:text-base px-2 hover:bg-gray-200 transition"
          >{`Rating`}</span>
        </span>
      )}
    </div>
  );
};

export default Sort;
