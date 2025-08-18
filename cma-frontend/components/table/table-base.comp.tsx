'use client'
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Paper } from '@mui/material';
import { ButtonIcon } from '../button/button-icon.comp';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { DataGridProps } from '@mui/x-data-grid';


export default function TableBase(props: DataGridProps) {
  return (
   <Paper sx={{ height: 400, width: '100%', marginLeft:1 }}>
      <DataGrid
        // rows={rows}
        // columns={columns}
        disableColumnMenu
        disableAutosize
        disableColumnResize
        // initialState={{
        //   pagination: {
        //     paginationModel: {
        //       pageSize: 5,
        //     },
        //   },
        // }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        {...props}
      />
    </Paper>
  );
}