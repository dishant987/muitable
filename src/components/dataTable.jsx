import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, TextField, Button, Drawer, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import data from '../assets/data'; // Importing sample data
import CustomNoRowsOverlay from './NoRow'; // Custom component to display when there are no rows
import { PriceRangeSlider, SalePriceSlider } from './RangeSlider.jsx';
import DateCellRenderer from './DateCellRenderer.jsx';
import DateRangeDrawer from './DateRangeFilter.jsx';

const DataTable = () => {
    const [tableData, setTableData] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [salePriceRange, setSalePriceRange] = useState([0, 100]);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: null, endDate: null });

    useEffect(() => {
        setTableData(data);
    }, []);

    const filteredData = tableData.filter((row) => {
        return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const setRangeFilterData = () => {
        const fildata = data.filter((row) => {
            return (
                row.price >= priceRange[0] &&
                row.price <= priceRange[1] &&
                row.sale_price >= salePriceRange[0] &&
                row.sale_price <= salePriceRange[1]
            );
        });
        setTableData(fildata);
        setDrawerOpen(false);
    };
    const setDateRangeFilterData = (dateRange) => {
        const { startDate, endDate } = dateRange;

        const filteredData = data.filter((row) => {
            const createdAt = new Date(row.createdAt);
            const updatedAt = new Date(row.updatedAt);

            // Check if the startDate and endDate are both provided
            if (startDate && endDate) {
                return (
                    createdAt >= new Date(startDate) &&
                    createdAt <= new Date(endDate) &&
                    updatedAt >= new Date(startDate) &&
                    updatedAt <= new Date(endDate)
                );
            }
            // If only startDate is provided
            else if (startDate) {
                return createdAt >= new Date(startDate) && updatedAt >= new Date(startDate);
            }
            // If only endDate is provided
            else if (endDate) {
                return createdAt <= new Date(endDate) && updatedAt <= new Date(endDate);
            }
            // If no date range is selected, return all rows
            return true;
        });

        setTableData(filteredData);
        setDrawerOpen(false);

    };


    const clearRangeFilters = () => {
        setPriceRange([0, 100]);
        setSalePriceRange([0, 100]);
    };

    const columns = [
        { field: 'sr', headerName: 'Sr No', flex: 0.5, renderCell: (params) => (<Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>{params.id}</Typography>) },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 0.7 },
        { field: 'subcategory', headerName: 'SubCategory', flex: 0.7 },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
            renderCell: (params) => (
                <Typography variant='subtitle2' color="textSecondary" sx={{ marginTop: '15px' }}>
                    <DateCellRenderer value={params.value} />
                </Typography>
            )
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            flex: 1,
            renderCell: (params) => (
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '15px' }}>
                    <DateCellRenderer value={params.value} />
                </Typography>
            )
        },
        { field: 'price', headerName: 'Price', flex: 0.7 },
        { field: 'sale_price', headerName: 'Sale Price', flex: 0.7 },
    ];

    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            {/* Search input for filtering rows */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: '300px', marginRight: 2 }}

                />

                <Tooltip title="Set Price & Sale Price Range">
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
                <DateRangeDrawer setDateRangeFilter={setDateRangeFilterData} />
            </Box>



            <DataGrid
                rows={filteredData}
                getRowId={(row) => row.id}
                columns={columns}
                slots={{
                    toolbar: GridToolbar,
                    noResultsOverlay: CustomNoRowsOverlay,
                }}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={(model) => setPaginationModel(model)}
                pageSizeOptions={[10, 20, 50, 100]}
                autoHeight
                disableSelectionOnClick
                sx={{ '--DataGrid-overlayHeight': '300px' }}
            />

            {/* Drawer for range filters */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ width: '200px' }}
            >
                <Box sx={{ width: '300px', p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Set Price Range
                    </Typography>
                    <PriceRangeSlider priceRange={priceRange} setPriceRange={setPriceRange} />

                    <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                        Set Sale Price Range
                    </Typography>
                    <SalePriceSlider salePriceRange={salePriceRange} setSalePriceRange={setSalePriceRange} />

                    {/* Apply Button */}
                    <Tooltip title="Apply Filters">
                        <Button
                            variant="contained"
                            fullWidth

                            onClick={() => setRangeFilterData()}
                            sx={{ mt: 4 }}
                        >
                            Apply
                        </Button>
                    </Tooltip>

                    {/* Clear Range Button */}
                    <Tooltip title="Clear Filters">
                        <Button
                            variant="contained"
                            color="warning"
                            fullWidth

                            onClick={clearRangeFilters}
                            sx={{ mt: 2 }}
                        >
                            Clear Range
                        </Button>
                    </Tooltip>

                    {/* Close Button */}
                    <Tooltip title="Close Filter">
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth

                            onClick={() => setDrawerOpen(false)}
                            sx={{ mt: 2 }}
                        >
                            Close
                        </Button>
                    </Tooltip>
                </Box>
            </Drawer>
        </Box>
    );
};

export default DataTable;
