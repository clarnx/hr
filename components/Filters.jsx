import { BsChevronRight } from "react-icons/bs";

const Filters = ({ toggleIsOpen }) => {
  return (
    <p
      onClick={toggleIsOpen}
      className="cursor-pointer text-base flex gap-2 items-center sm:text-lg font-bold"
    >
      Filters <BsChevronRight />
    </p>
  );
};

export default Filters;
