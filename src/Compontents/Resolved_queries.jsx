import React, { useEffect } from 'react'
import Sidebar from './Sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify'
import axios from 'axios';

function Resolved_queries() {
  const [Search, setsearch] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let [user, setuser] = useState([])
  const [data, setdata] = useState([])

  let navigate = useNavigate()
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let Resolved = async (user) => {
    try {
      let token = localStorage.getItem('CustomerExcecutive')
      let decoded = jwtDecode(token)
      let res = await axios.get(`https://milk-way-crm.onrender.com/Query/Resolved_Queries_admin/${decoded.id}`)
      if (res.status === 200) {
        setdata(res.data)
      }
    } catch (error) {
      toast.error(error.response.data)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('CustomerExcecutive')) {
      Resolved(user)
    } else {
      navigate('/CustomerExecutive_Signin')
    }
  }, [])


  return <>
    <Sidebar />
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
        <h1 className='Dashboard_title'>Resolved Queries</h1>
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
                  Query id
                </TableCell>
                <TableCell className='Table-header'
                  align={"center"}
                  style={{ minWidth: "100px" }}>


                  User Name
                </TableCell>
                <TableCell className='Table-header'
                  align={"center"}
                  style={{ minWidth: "100px" }}

                >
                  Title
                </TableCell>
                <TableCell className='Table-header'
                  align={"center"}
                  style={{ minWidth: "100px" }}

                >
                  Status
                </TableCell>
                <TableCell className='Table-header'
                  align={"center"}
                  style={{ minWidth: "100px" }}

                >
                  Resolved on
                </TableCell>
                <TableCell className='Table-header'
                  align={"center"}
                  style={{ minWidth: "100px" }}

                >
                  Reason
                </TableCell>
                <TableCell className='Table-header'
                  align={"center"}
                  style={{ minWidth: "100px" }}

                >
                  Solution
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((s) => {
                  if (Search === "") {
                    return s;
                  }
                  else if (s.User_name.toLowerCase().includes(Search.toLowerCase()) || s._id.toLowerCase().includes(Search.toLowerCase())) {
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
                        {row.User_name}
                      </TableCell>

                      <TableCell align={"center"}>
                        {row.title}
                      </TableCell>
                      <TableCell align={"center"} style={{ color: "green" }}>
                        {row.Status}
                      </TableCell>
                      <TableCell align={"center"}>
                        {row.resolved_on.split(' ').splice(0, 5).join(" ")}
                      </TableCell>
                      <TableCell align={"center"}>
                        {row.Reason}
                      </TableCell>
                      <TableCell>
                        {

                          row.Solution
                        }
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
              count={data.length}

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

export default Resolved_queries
