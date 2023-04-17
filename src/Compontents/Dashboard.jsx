import React, { useState, useContext } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckIcon from '@mui/icons-material/Check';
import CachedIcon from '@mui/icons-material/Cached';
import { CChart } from '@coreui/react-chartjs'
import Check from '@mui/icons-material/Check';
import { useEffect } from 'react';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { SearchOutlined } from '@mui/icons-material'
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { format } from 'timeago.js'
import { TableFooter } from '@mui/material';
import { contextAPI } from './Context';
import Sidebar from './Sidebar';
import jwtDecode from 'jwt-decode';

function Dashboard() {
  const [page, setPage] = useState(0);
  const [Search, setsearch] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [opendialogbox, setdialogbox] = useState(false);
  const [Reason, setreason] = useState("")
  let[user,setuser]=useState([])
  let navigate=useNavigate()
  const data = useContext(contextAPI)


  const handleClickdialogbox = (id) => {
    setreason(id)
    setdialogbox(true);
  };

  const handleClosedialogbox = () => {
    setdialogbox(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let AcceptQuery = async(id) => {
    try {
      let token=localStorage.getItem('CustomerExcecutive')
      let decoded=jwtDecode(token)
      let res = await axios.post(`https://milk-way-crm.onrender.com/Query/Accept_query/${id}`, {
        Assigned_to: decoded.Username
      })
      if(res.status==200){
        setdialogbox(false)
      }
    }
    catch (error) {
      alert(error.response.data)
    }
  }

  useEffect(()=>{
    if(!localStorage.getItem('CustomerExcecutive')){
      navigate('/CustomerExecutive_Signin')
    }
    else{
      let token=localStorage.getItem('CustomerExcecutive')
      let decoded=jwtDecode(token)
      setuser(decoded)
    }
  },[])

  return <>
    <Sidebar />
    <div className="p-4 sm:ml-64">
      <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
        <h1 className='Dashboard_title'>Dashboard</h1>
        <div className='Query_Statics mt-5'>
          <div className='Query p-3'>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "yellow", padding: "10px" }}>
              <PendingActionsIcon />
            </div>
            <div className='Query-box'>
              <div className='Query-title'>
                <p className='mt-3'>Pending Queries</p>
                <p className='mt-4 query_count'>{data.Pending_queries.length}</p>
                <p className='mt-8 query-fected-time'><AccessTimeIcon /> 24hrs ago</p>
              </div>
              <div>
                <CChart style={{ width: "160px" }}
                  type="doughnut"
                  data={{
                    datasets: [
                      {
                        backgroundColor: ['yellow', 'grey'],
                        data: [data.Pending_queries.length, 100 - data.Pending_queries.length],
                      },
                    ],
                  }}
                />

              </div>
            </div>
          </div>
          <div className='Query p-3'>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#00b219", padding: "10px" }}>
              <Check style={{ color: "white" }} />
            </div>
            <div className='Query-box'>
              <div className='Query-title'>
                <p className='mt-3'>Resovled Queries</p>
                <p className='mt-4 query_count'>{data.resolved.length}
                </p>
                <p className='mt-8 query-fected-time'><AccessTimeIcon /> 24hrs ago</p>
              </div>
              <div>
                <CChart style={{ width: "160px" }}
                  type="doughnut"
                  data={{
                    datasets: [
                      {
                        backgroundColor: ['yellow', 'grey'],
                        data: [data.resolved.length, 100 - data.resolved.length],
                      },
                    ],
                  }}
                />

              </div>
            </div>
          </div>
          <div className='Query p-3'>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "blue", padding: "12px" }}>
              <CachedIcon style={{ color: "white" }} />
            </div>
            <div className='Query-box'>
              <div className='Query-title'>
                <p className='mt-3'>Queries Under Process</p>
                <p className='mt-2 query_count'>{data.Query.length}
                </p>
                <p className='mt-8 query-fected-time'><AccessTimeIcon /> 24hrs ago</p>
              </div>
              <div>
                <CChart style={{ width: "160px" }}
                  type="doughnut"
                  data={{
                    datasets: [
                      {
                        backgroundColor: ['yellow', 'grey'],
                        data: [data.Query.length, 100 - data.Query.length],
                      },
                    ],
                  }}
                />

              </div>
            </div>
          </div>

        </div>
      </div>
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
                Department
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
                Raised on
              </TableCell>
              <TableCell className='Table-header'
                align={"center"}
                style={{ minWidth: "100px" }}

              >
                Reason
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Pending_queries
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
                    <TableCell align={"center"}>
                      {row.department}
                    </TableCell>
                    <TableCell align={"center"} style={{ color: "red" }}>
                      {row.Status}
                    </TableCell>
                    <TableCell align={"center"}>
                      {row.raised_on.split(' ').splice(0, 5).join(" ")}
                    </TableCell>
                    <TableCell align={"center"}>
                      <div style={{ padding: "2px", color: "white", backgroundColor: "black", borderRadius: "6px", cursor: "pointer" }} onClick={() => { handleClickdialogbox(row._id) }}>View</div>
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

      {data.Pending_queries.filter((e) => {
        if (e._id.includes(Reason)) {
          return e
        }
      })
        .map((e) => {

          return <><Dialog
            open={opendialogbox}
            // TransitionComponent={Transition}
            keepMounted
            onClose={handleClosedialogbox}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="scroll-dialog-title" className='dialogtitle'><p>Reason</p></DialogTitle>
            <DialogContent >

              <DialogContentText id="scroll-dialog-title" className='mt-3' tabIndex={-1}
              ><p>Query id : {e._id}</p>
                {e.Image ? <img src={e.Image}></img> : <></>}
                {e.Reason}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosedialogbox}>close</Button>
              <Button onClick={() => AcceptQuery(e._id)}>Accept</Button>
            </DialogActions>
          </Dialog>  </>
        })}


    </div>
  </>
}

export default Dashboard
