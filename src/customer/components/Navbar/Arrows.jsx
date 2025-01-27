import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function Arrows({ direction, onClick, where }) {
  const isNext = direction === "next";
  return (
    <IconButton
      className="p-4 transition-transform transform hover:scale-110"
      onClick={onClick}
      style={{
        position: "absolute",
        [isNext ? "right" : "left"]: "-25px",
        zIndex: 100,
        top: "40%",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginLeft: !where ? "50px" : "-25px",
        marginRight: !where ? "50px" : "-25px",
        borderRadius: "50%",
      }}
    >
      {isNext ? <ArrowForwardIos /> : <ArrowBackIos />}
    </IconButton>
  );
}

export default Arrows;
