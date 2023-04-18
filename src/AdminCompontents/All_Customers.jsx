import React from 'react'
import AdminSidebar from './AdminSidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material'
import { contextAPI } from '../Compontents/Context';
import { useState,useContext} from 'react';
function All_Customers() {
    const [Search, setsearch] = useState('')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const data =useContext(contextAPI)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return <>
        <AdminSidebar/>
        <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                <h1 className='Dashboard_title'>Customers</h1>
                <div className='Search-bar'>
                    <div className='search-box'>
                        <SearchOutlined />
                        <input type="text" placeholder="Search" onChange={(e) => { setsearch(e.target.value) }} />

                    </div>
                </div>
                <TableContainer sx={{ maxHeight: 440 }} className='Table mt-5' >
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>

                                <TableCell className='Table-header'
                                    style={{ minWidth: "100px" }}

                                >
                                    Customer id
                                </TableCell>
                                <TableCell className='Table-header'
                                    align={"center"}
                                    style={{ minWidth: "100px" }}>


                                    Customer Name
                                </TableCell>
                                <TableCell className='Table-header'
                                    align={"center"}
                                    style={{ minWidth: "100px" }}

                                >
                                    Customer Email
                                </TableCell>
                                <TableCell className='Table-header'
                                    align={"center"}
                                    style={{ minWidth: "100px" }}

                                >
                                    Customer Phone
                                </TableCell>
                                <TableCell className='Table-header'
                                    align={"center"}
                                    style={{ minWidth: "100px" }}

                                >
                                    Customer Address
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((s) => {
                                    if (Search === "") {
                                        return s;
                                    }
                                    else if (s.Username.toLowerCase().includes(Search.toLowerCase()) || s._id.toLowerCase().includes(Search.toLowerCase())) {
                                        return s;
                                    }
                                })
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>


                                            <TableCell key={row._id} >

                                                {row._id}
                                            </TableCell>

                                            <TableCell align={"center"}>
                                                {row.Username
}
                                            </TableCell>

                                            <TableCell align={"center"}>
                                                {row.Email}
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                <a href={`tel:+91${row.Mobile}`} >{row.Mobile}</a>
                                            </TableCell>
                                            <TableCell align={"center"}>
                                                {row.Address?<p>{row.Address}</p>:<>No Address found</>}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <TableFooter align="right">
                        <TablePagination

                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={data.users.length}

                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </TableContainer>
            </div>
        </div>
    </>
}

export default All_Customers