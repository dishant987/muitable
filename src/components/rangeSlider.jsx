import { Box, Slider, Typography } from "@mui/material";


const PriceRangeSlider = ({ priceRange, setPriceRange }) => (
    <Box sx={{ width: '300px' }}>
        <Typography gutterBottom>Price Range: {priceRange[0]} - {priceRange[1]}</Typography>
        <Slider
            size='small'
            value={priceRange}
            onChange={(event, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100}
        />
    </Box>
);

const SalePriceSlider = ({ salePriceRange, setSalePriceRange }) => (
    <Box sx={{ width: '300px' }}>
        <Typography gutterBottom>Sale Price Range: {salePriceRange[0]} - {salePriceRange[1]}</Typography>
        <Slider
            size='small'
            value={salePriceRange}
            onChange={(event, newValue) => setSalePriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100}
        />
    </Box>
);

export { PriceRangeSlider, SalePriceSlider }