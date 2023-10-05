import React, { useEffect, useMemo, useState } from "react";
import { BsStopwatchFill } from "react-icons/bs";

const Timer = ({ countdown }) => {
  let validDate = useMemo(() => countdown, [countdown]);
  const [timer, setTimer] = useState("");
  validDate = new Date(countdown);
  // console.log("valid", validDate.toLocaleString())

  validDate = validDate.getTime();

  useEffect(() => {
    let interval = setInterval(() => {
      let difference = new Date(validDate - Date.now());

      if (difference > 0) {
        setTimer(
          `${difference.getHours()}h : ${difference.getMinutes()}m : ${difference.getSeconds()}s `
        );
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown, validDate]);
  return (
    
      <p className="text-xs font-semibold w-fit flex gap-2 items-center sm:text-base text-red-700">
        Offer Ends in <BsStopwatchFill /> {timer}{" "}
      </p>
  
  );
};

export default Timer;
