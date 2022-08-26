import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { themeContext } from 'context/authContext';
import { useContext, useEffect, useState } from 'react';
import { Container } from './SelectTimeType.styled';

import { styled as styles } from '@mui/material';

export default function SelectTimeType({ onChange, addStyle, addFeat }) {
  const [selectedValue, setSelectedValue] = useState('');
  const { selectedTheme } = useContext(themeContext);

  function handleChange(e) {
    const { value } = e.target;
    setSelectedValue(value);
    onChange(value);
  }

  useEffect(() => {}, [selectedValue]);

  return (
    <Container>
      <FormControl style={addStyle}>
        <InputLabel id="demo-simple-select-label" sx={{ zIndex: 0 }}>
          Time Period
        </InputLabel>
        <CssTextField
          onChange={handleChange}
          label="Time Period"
          value={selectedValue}
          theme={selectedTheme}
          addFeat={addFeat}
        >
          <MenuItem value="days">Days</MenuItem>
          <MenuItem value="weeks">Weeks</MenuItem>
          <MenuItem value="months">Months</MenuItem>
        </CssTextField>
      </FormControl>
    </Container>
  );
}

const CssTextField = styles(Select)(({ theme, addFeat }) => ({
  '&.MuiOutlinedInput-root': {
    color: theme.checkBoxColor,
    border: `1px solid ${theme.checkBoxColor}`,
    ...addFeat,
  },

  '&.Mui-focused': {
    border: 'none',
  },
}));
