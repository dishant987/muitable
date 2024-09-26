import React from 'react';
import { Typography } from '@mui/material';
import moment from 'moment'; // You can use moment.js or JavaScript's native Date object for formatting

// Custom component to render dates in the desired format
const DateCellRenderer = ({ value }) => {
    // Convert the date to DD-MMM-YYYY HH:MM format
    const formattedDate = moment(value).format('DD-MMM-YYYY HH:mm');

    return (
        <Typography variant="body2" sx={{ fontWeight: 600 }} color="textSecondary">
            {formattedDate}
        </Typography>
    );
};

export default DateCellRenderer;
