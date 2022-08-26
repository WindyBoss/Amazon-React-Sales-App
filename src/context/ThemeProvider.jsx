import { useState, useMemo, useEffect } from "react";
import { themeContext } from "./authContext";
import PropTypes from "prop-types";

import { themes } from "../styles/colors";

export default function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(themes.light);

  const provideTheme = useMemo(() => {
    console.log(selectedTheme);
    console.log(themes);
    const changeTheme = () => {
      if (selectedTheme.id === "dark") {
        setSelectedTheme(themes.light);
      }
      if (selectedTheme.id === "light") {
        setSelectedTheme(themes.dark);
      }
    };
    return { selectedTheme, changeTheme };
  }, [selectedTheme]);

  return (
    <themeContext.Provider value={provideTheme}>
      {children}
    </themeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
