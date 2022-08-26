import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FormPieChart({ onChange, options, label }) {
  const [state, setState] = useState('');

  const handleChange = event => {
    setState(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div
      style={{
        zIndex: '0',
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120, zIndex: 0 }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={state}
          label={label}
          onChange={handleChange}
          sx={{ minWidth: '200px' }}
        >
          {options.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
