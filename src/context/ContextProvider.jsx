import { useState, useMemo, useEffect } from "react";
import { authContext } from "./authContext";
import PropTypes from "prop-types";

import { useLocation } from "react-router-dom";

export default function ContextProvider({ children }) {
  const [selectedSKU, setSelectedSKU] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (
      !location.pathname.includes("salesPerSKU") ||
      location.pathname.length < 20
    ) {
      setSelectedSKU("");
    }
  }, [location]);

  const providerValue = useMemo(() => {
    return { selectedSKU, setSelectedSKU };
  }, [selectedSKU]);

  return (
    <authContext.Provider value={providerValue}>
      {children}
    </authContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
