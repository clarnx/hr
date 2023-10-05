const CategoryTitle = ({ title, removePadding }) => {

  let words = title.split(" ")

  return (
    <h3 className={`categoryTitle lg:text-3xl md:text-2xl text-xl ${removePadding ? "" : "px-6 md:px-16 lg:px-24"} flex items-center max-h-min capitalize`}>
    <span className="categoryTitleBefore "></span>
      <span className="px-4 font-extralight"> 
      {
        words.map((word, i) => {
          if(i === 0) return word;
          else return <span key={i} className="text-[#ff6536]"> {word} </span>
        })
      }
      </span>
      <span className="categoryTitleAfter"></span>
    </h3>
  );
};

export default CategoryTitle;
