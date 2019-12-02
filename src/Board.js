import React from "react";

const Board = ({ board, boxClick, resetGame }) => {
  const showBoxes = () => {
    return board.map((box, index) => {
      return (
        <div
          key={index}
          id={`box${index}`}
          onClick={() => boxClick(index)}
          className="box"
        >
          {box}
        </div>
      );
    });
  };

  return (
    <>
      {showBoxes()} 
      

      
     
    </>
  );
};

export default Board;
