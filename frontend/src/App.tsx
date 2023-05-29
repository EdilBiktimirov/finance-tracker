import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/UI/Layout";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import Accounts from "./features/accounts/Accounts";
import Transactions from "./features/transactions/Transactions";
import CategoriesForm from "./features/categories/components/CategoriesForm";
import AddTransaction from "./features/transactions/AddTransaction";
import Statistics from "./features/transactions/Statistics";
import AddAccount from "./features/accounts/AddAccount";
import AccountTypesForm from "./features/accountTypes/components/AccountTypesForm";

//добавить протектед роут
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path={'/'} element={<Accounts/>}/>
          <Route path={'/accounts/:id'} element={<Transactions/>}/>
          <Route path={'/add-new-account-type'} element={<AccountTypesForm/>}/>
          <Route path={'/add-new-account'} element={<AddAccount/>}/>
          <Route path={'/add-new-category'} element={<CategoriesForm/>}/>
          <Route path={'/add-new-transaction'} element={<AddTransaction/>}/>
          <Route path={'/statistics/:id'} element={<Statistics/>}/>
          <Route path={'/register'} element={<Register/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'*'} element={<h2>Not found</h2>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
