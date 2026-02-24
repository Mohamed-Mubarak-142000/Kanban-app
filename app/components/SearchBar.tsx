import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (key: string) => void;
}) {
  return (
    <TextField
      label="Search tasks"
      variant="outlined"
      fullWidth
      size="small"
      onChange={(e) => onSearch(e.target.value)}
      sx={{
        mb: 3,
        '& .MuiInputBase-input': { color: '#FFFFFF' },
        '& .MuiInputLabel-root': { color: '#B0C4A0' },
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: '#B0C4A0' },
          '&:hover fieldset': { borderColor: '#2ec56a' },
          '&.Mui-focused fieldset': { borderColor: '#2ec56a' }
        },
        '& .MuiInputAdornment-root svg': { color: '#B0C4A0' }
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
