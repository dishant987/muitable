// DateRangeDrawer.js
import React, { useState } from 'react';
import { Box, Button, Drawer, Typography, Tooltip, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DateRangeIcon } from '@mui/x-date-pickers';

const DateRangeDrawer = ({ setDateRangeFilter }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const applyDateFilter = () => {
        setDateRangeFilter({ startDate, endDate });
        setDrawerOpen(false);
    };

    const clearDateFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setDateRangeFilter({ startDate: null, endDate: null });
    };

    return (
        <Box>
            <Tooltip title="Filter by Date Range">
                <IconButton onClick={() => setDrawerOpen(true)}>
                    <DateRangeIcon />
                </IconButton>
            </Tooltip>

            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 300, padding: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Filter by Date Range
                    </Typography>

                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newDate) => setStartDate(newDate)}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newDate) => setEndDate(newDate)}
                        renderInput={(params) => <TextField {...params} />}
                    />

                    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Tooltip title="Apply Date Range">
                            <Button variant="contained" onClick={applyDateFilter}>
                                Apply
                            </Button>
                        </Tooltip>
                        <Tooltip title="Clear Date Range">
                            <Button variant="contained" color="warning" onClick={clearDateFilter}>
                                Clear
                            </Button>
                        </Tooltip>
                    </Box>

                    <Tooltip title="Close Drawer">
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            onClick={() => setDrawerOpen(false)}
                        >
                            Close
                        </Button>
                    </Tooltip>
                </Box>
            </Drawer>
        </Box>
    );
};

export default DateRangeDrawer;
