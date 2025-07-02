import { Tooltip } from "@mui/material";

// Truncate long text by characters (default: 50)
const truncateTextWithTooltip = (text = "", charLimit = 5) => {
  const shouldTruncate = text.length > charLimit;
  const display = shouldTruncate ? text.slice(0, charLimit) + "..." : text;

  return (
    <Tooltip title={text}>
      <span
        style={{
          cursor: "pointer",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {display}
      </span>
    </Tooltip>
  );
};
export default truncateTextWithTooltip;
