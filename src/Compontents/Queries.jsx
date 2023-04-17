import React from 'react'
import Sidebar from './Sidebar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material'
import { contextAPI } from './Context';
import { useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
function Queries() {
    const [Search, setsearch] = useState('')
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] =useState(10);
    const navigate=useNavigate()
    const data=useContext(contextAPI)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    return <>
        <Sidebar />
        <div className="p-4 sm:ml-64">
            <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
                <h1 className='Dashboard_title'>Queries</h1>
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
                  style={{ minWidth:"100px"}}

                >
                  Query id
                </TableCell>
                <TableCell  className='Table-header'
                  align={"center"}
                  style={{ minWidth:"100px"}}>

                
                  User Name
                </TableCell>
                <TableCell  className='Table-header'
                  align={"center"}
                  style={{ minWidth:"100px"}}

                >
                 Title
                </TableCell>
                <TableCell  className='Table-header'
                  align={"center"}
                  style={{ minWidth:"100px"}}

                >
                Status
                </TableCell>
                <TableCell  className='Table-header'
                  align={"center"}
                  style={{ minWidth:"100px"}}

                >
                Raised on
                </TableCell>
                <TableCell  className='Table-header'
                  align={"center"}
                  style={{ minWidth:"100px"}}

                >
                 Close Query
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Query
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((s)=>{
                if(Search===""){
                 return s;
                }
                else if(s.User_name.toLowerCase().includes(Search.toLowerCase())||s._id.toLowerCase().includes(Search.toLowerCase())){
                 return s;
                }})
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    
                  
                        <TableCell key={row._id} >
                        
                        {row._id}
                        </TableCell>
                        
                        <TableCell  align={"center"}>
                          {row.User_name}
                        </TableCell>

                        <TableCell  align={"center"}>
                          {row.title}
                        </TableCell>
                        <TableCell  align={"center"} style={{color:"blue"}}>
                          {row.Status}
                        </TableCell>
                        <TableCell  align={"center"}>
                            {row.raised_on.split(' ').splice(0,5).join(" ")}
                        </TableCell>
                        <TableCell  align={"center"}>
                          <div style={{padding:"3px",color:"white",backgroundColor:"black",borderRadius:"6px",cursor:"pointer"}} onClick={()=>navigate(`/resolve/${row._id}`)}>Resolve</div>
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TableFooter  align="right">
        <TablePagination
        
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.Query.length}
 
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

export default Queries
