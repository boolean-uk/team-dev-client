import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const filterTypes = [
  'ADMIN',
  'ERROR',
  'USER',
  'COHORT'
];

function getStyles(name, types, theme) {
  return {
    fontWeight:
      types.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    backgroundColor:
      types.indexOf(name) === -1
        ? null
        : '#82b8ff5c',
  };
}

export default function EventFilter({formValues, setFormValues, handleSubmit, sortType}) {
  const theme = useTheme();
  const types = formValues.types

  useEffect(() => {
    handleSubmit()
    // eslint-disable-next-line
  }, [types, sortType]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormValues({
      ...formValues,
      types: typeof value === 'string' ? value.split(',') : value
    });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Filter by Type:</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={types}
          onChange={(e) => {
            handleChange(e)
          }}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip sx={{ backgroundColor: theme.palette.primary.main }} key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filterTypes.map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={getStyles(type, types, theme)}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
