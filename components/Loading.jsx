import { ClipLoader } from "react-spinners";


function Loading({loading}) {

  return (
    loading && (
      <div className="fixed top-0 left-0 w-screen bg-black/40 h-screen flex items-center justify-center z-50" onClick={(e) => {e.stopPropagation()}}>
        <ClipLoader color="#ff6536" size={100} />
      </div>
    )
  );
}

export default Loading;
