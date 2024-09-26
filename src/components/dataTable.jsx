import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import data from '../assets/data'; // Importing sample data
import CustomNoRowsOverlay from './NoRow'; // Custom component to display when there are no rows

const DataTable = () => {
    // State to hold the table data and manage pagination
    const [tableData, setTableData] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 }); // State to manage pagination model

    // useEffect to set the table data when the component mounts
    useEffect(() => {
        setTableData(data); // Set the initial data for the table
    }, []);

    // Column definitions for the DataGrid
    const columns = [
        {
            field: 'sr', // Field name in the data
            headerName: 'Sr No', // Header title
            flex: 0.5, // Flex property to control width
            renderCell: (params) => ( // Custom rendering for cell content
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}
                >
                    {params.id} {/* Displaying the row ID as Sr No */}
                </Typography>
            ),
        },
        {
            field: 'name', // Field name in the data
            headerName: 'Name', // Header title
            flex: 1, // Width flexibility
        },
        {
            field: 'category', // Field name in the data
            headerName: 'Category', // Header title
            flex: 0.7,
        },
        {
            field: 'subcategory',
            headerName: 'SubCategory',
            flex: 0.7,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1.5,
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            flex: 1.5,
        },
        {
            field: 'price',
            headerName: 'Price',
            flex: 0.7,
        },
        {
            field: 'sale_price',
            headerName: 'Sale Price',
            flex: 0.7,
        },
    ];

    return (
        <Box sx={{ width: '100%', height: 'auto' }}>
            <DataGrid
                rows={tableData} // Data for the rows of the grid
                getRowId={(row) => row.id} // Function to get the unique ID of each row
                columns={columns} // Column definitions
                slots={{
                    toolbar: GridToolbar, // Toolbar component
                    noResultsOverlay: CustomNoRowsOverlay, // Component to display when there are no results
                }}
                pagination // Enable pagination
                paginationModel={paginationModel} // Set pagination model
                onPaginationModelChange={(model) => setPaginationModel(model)} // Update pagination model on change

                pageSizeOptions={[10, 20, 50, 100]} // Options for page size
                autoHeight // Automatically adjust height based on content
                disableSelectionOnClick // Disable row selection on click
                sx={{
                   
                    '--DataGrid-overlayHeight': '300px', // Set custom overlay height
                }}
            />
        </Box>
    );
};

export default DataTable; // Export the DataTable component
