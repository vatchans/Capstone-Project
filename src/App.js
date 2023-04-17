import './App.css';
import { useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Compontents/Dashboard';
import Queries from './Compontents/Queries';
import Resolved_queries from './Compontents/Resolved_queries';
import Customers from './Compontents/Customers';
import Resolve_query from './Compontents/Resolve_query';
import Landing_page from './ProductCompontents/Landing_page';
import Products from './ProductCompontents/Products';
import ProductView from './ProductCompontents/ProductView';
import Cart from './ProductCompontents/Cart';
import Accesstoken from './ProductCompontents/Access-token';
import Signup from './ProductCompontents/Signup';
import Login from './ProductCompontents/Login';
import Returntologin from './ProductCompontents/Returntologin';
import Resetpassword from './ProductCompontents/Reset-password';
import Newpassword from './ProductCompontents/Newpassword';
import OrderSuccesss from './ProductCompontents/OrderSuccesss';
import UserAccount from './ProductCompontents/UserAccount';
import UserOrders from './ProductCompontents/UserOrders';
import UserSupport from './ProductCompontents/UserSupport';
import Subscription from './ProductCompontents/Subscription';
import CustomerExecutive_Signin from './Compontents/CustomerExecutive_Signin';
import CustomerExecutive_Signup from './Compontents/CustomerExecutive_Signup';
import CustomerExecutive_Returntologin from './Compontents/CustomerExecutive_Returntologin';
import CustomerExecutive_resetPassword from './Compontents/CustomerExecutive_resetPassword';
import CustomerExecutive_accessCode from './Compontents/CustomerExecutive_accessCode';
import CustomerExcecutive_NewPassword from './Compontents/CustomerExcecutive_NewPassword';
import Admin_Sigin from './AdminCompontents/Admin_Sigin';
import AdminDashboard from './AdminCompontents/AdminDashboard';
import AddProduct from './AdminCompontents/AddProduct';
import EditProduct from './AdminCompontents/EditProduct';
import View_Products from './AdminCompontents/View_Products';
import Queryreceived from './ProductCompontents/Queryreceived';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  useEffect(() => {
    document.title = "Fresh Farm CRM"
 }, []);

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing_page/>}/>
        <Route path='/CRM' element={<Dashboard/>}/>
        <Route path='/Queries' element={<Queries/>}/>
        <Route path='/Resolved'element={<Resolved_queries/>}/>
        <Route path='/Customers'element={<Customers/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/resolve/:id' element={<Resolve_query/>}/>
        <Route path='/Products/:category' element={<Products/>}/>
        <Route path='/ProductView/:id' element={<ProductView/>}/>
        <Route path='/Signin' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Return' element={<Returntologin/>}/>
        <Route path='/Reset-Password' element={<Resetpassword/>}/>
        <Route path='/New-Password' element={<Newpassword/>}/>
        <Route path='/Access-token' element={<Accesstoken/>}/>
        <Route path='/ordersuccess' element={<OrderSuccesss/>}/>
        <Route path='/Useraccount' element={<UserAccount/>}/>
        <Route path='/Userorders' element={<UserOrders/>}/>
        <Route path='/Usersupport' element={<UserSupport/>}/>
        <Route path='/Subscription' element={<Subscription/>}/>
        <Route path='/CustomerExecutive_Signin' element={<CustomerExecutive_Signin/>}/>
        <Route path='/CustomerExecutive_Signup' element={<CustomerExecutive_Signup/>}/>
        <Route path='/CustomerExecutive_resetPassword' element={<CustomerExecutive_resetPassword/>}/>
        <Route path='/CustomerExecutive_Return' element={<CustomerExecutive_Returntologin/>}/>
        <Route path='/CustomerExecutive_aceessCode' element={<CustomerExecutive_accessCode/>}/>
        <Route path='/CustomerExecutive_NewPassword' element={<CustomerExcecutive_NewPassword/>}/>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='/Admin_signin' element={<Admin_Sigin/>}/>
        <Route path='/Add_Product' element={<AddProduct/>}/>
        <Route path='/view_Product' element={<View_Products/>}/>
        <Route path='/Queryreceived' element={<Queryreceived/>}/>
        <Route path='/Edit_Product/:id' element={<EditProduct/>}/>
       </Routes>
      <ToastContainer limit={1}/>
    </BrowserRouter>


  </>
}

export default App;
