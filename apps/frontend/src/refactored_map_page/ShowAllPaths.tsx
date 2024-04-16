import React, { useState } from "react";
import { Button } from "@mui/material";
import { useMapContext } from "./MapContext";
import { EditorMode } from "common/src/types/map_page_types";

function ShowPathsButton() {
  const { showPaths, setShowPaths, editorMode } = useMapContext();

  const [hoverActive, setHoverActive] = useState(false);

  const handleMouseEnter = () => {
    setHoverActive(true);
  };

  const handleMouseLeave = () => {
    setHoverActive(false);
  };

  const handleOnClick = () => {
    setShowPaths(!showPaths);
    setHoverActive(false);
  };

  if (editorMode !== EditorMode.disabled) {
    return null;
  }

  return (
    <Button
      onClick={handleOnClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "absolute",
        width: "6vw",
        backgroundColor: showPaths ? "#2196F3" : "#012D5A",
        color: "white",
        fontWeight: "bold",
        fontFamily: "inter",
        textTransform: "capitalize",
        boxShadow: 8,
        zIndex: 4,
        marginLeft: "9vw",
        marginTop: "34vh",
        fontSize: "0.8rem",
        ":hover": {
          backgroundColor: hoverActive
            ? showPaths
              ? "#012D5A!important"
              : "#2196F3!important"
            : showPaths
              ? "#2196F3!important"
              : "#012D5A!important",
        },
      }}
    >
      Show Paths
    </Button>
  );
}

export default ShowPathsButton;
