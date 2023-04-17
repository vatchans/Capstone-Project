import React, { useEffect, useState,useContext} from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckIcon from '@mui/icons-material/Check';
import CachedIcon from '@mui/icons-material/Cached';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { SearchOutlined } from '@mui/icons-material'
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Check from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import { contextAPI } from '../Compontents/Context';
import { TableFooter } from '@mui/material';
import { CChart } from '@coreui/react-chartjs'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AdminSidebar from './AdminSidebar';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
function AdminDashboard() {
  const [page, setPage] = useState(0);
  const [Search, setsearch] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10);
  let [Orders,Setorders]=useState([])
  let [User, setUsers] = useState([])
  let [total,setTotal]=useState(0)
  let navigate=useNavigate()
  const data = useContext(contextAPI)
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let getOrders=async()=>{
       try{
        let res = await axios.get("https://milk-way-crm.onrender.com/Cart/Allorders")
        if(res.status===200){
          Setorders(res.data)
          let Total = res.data.reduce((a, b) => {
            return a + b.Products_Price;
          }, 0)
          setTotal(Total)
          console.log(Total)
        }
       }
       catch(error){
            console.log(error.response.data)
       }
  }
  useEffect(()=>{
    if (localStorage.getItem('Admin')) {
      let token = localStorage.getItem('Admin')
      let decoded = jwtDecode(token)
      setUsers(decoded)
      getOrders()
    }
      else{
        navigate('/Admin_signin')
      }
  },[])

  return <>
  <AdminSidebar/>
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
                <p className='mt-3'>No of Products</p>
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
                <p className='mt-3'>No of orders</p>
                <p className='mt-4 query_count'>{Orders.length}
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
                        data: [Orders.length, 100 - Orders.length],
                      },
                    ],
                  }}
                />

              </div>
            </div>
          </div>
          <div className='Query p-3'>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "blue", padding: "12px" }}>
              {/* <CachedIcon style={{ color: "white" }} /> */}
              <img src="revenue (1).png"style={{ color: "white" }}/>
            </div>
            <div className='Query-box'>
              <div className='Query-title'>
                <p className='mt-3'>Total revenue</p>
                <p className='mt-2 query_count'>₹ {total}
                </p>
                <p className='mt-8 query-fected-time'><AccessTimeIcon /> 24hrs ago</p>
              </div>
              <div>
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
               order id
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
                Product Name
              </TableCell>
              <TableCell className='Table-header'
                align={"center"}
                style={{ minWidth: "100px" }}

              >
                Payment mode
              </TableCell>
              <TableCell className='Table-header'
                align={"center"}
                style={{ minWidth: "100px" }}

              >
                Product Price
              </TableCell>
              <TableCell className='Table-header'
                align={"center"}
                style={{ minWidth: "100px" }}

              >
               Transcation id
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Orders
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
                      {row.User_id}
                    </TableCell>

                    <TableCell align={"center"}>
                      {row.Product_name}
                    </TableCell>
                    <TableCell align={"center"}>
                      {row.Payment_mode}
                    </TableCell>
                    <TableCell align={"center"}>
                    ₹ {row.Products_Price}
                    </TableCell>
                    <TableCell align={"center"}>
                      {row.transcation_id}
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
            count={Orders.length}

            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableFooter>
      </TableContainer>
    </div>
  </>

}

export default AdminDashboard
