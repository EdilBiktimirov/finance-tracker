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
import EditAccountTypes from "./features/accountTypes/EditAccountTypes";
import AccountTypes from "./features/accountTypes/AccountTypes";
import EditCategory from "./features/categories/EditCategory";
import Categories from "./features/categories/Categories";
import {selectUser} from "./features/users/usersSlice";
import {useAppSelector} from "./app/hooks";
import ProtectedRoute from "./components/UI/ProtectedRoute";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Layout>
        <Routes>
          <Route path={'/'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <Accounts/>
            </ProtectedRoute>}/>
          <Route path={'/accounts/:id'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <Transactions/>
            </ProtectedRoute>}/>
          <Route path={'/add-new-account-type'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <AccountTypesForm/>
            </ProtectedRoute>}/>
          <Route path={'/add-new-account'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <AddAccount/>
            </ProtectedRoute>}/>
          <Route path={'/add-new-category'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <CategoriesForm/>
            </ProtectedRoute>}/>
          <Route path={'/add-new-transaction'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <AddTransaction/>
            </ProtectedRoute>}/>
          <Route path={'/statistics/:id'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <Statistics/>
            </ProtectedRoute>}/>
          <Route path={'/cabinet/account-types/'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <AccountTypes/>
            </ProtectedRoute>}/>
          <Route path={'/cabinet/edit-account-type/:id'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <EditAccountTypes/>
            </ProtectedRoute>}/>
          <Route path={'/cabinet/categories'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <Categories/>
            </ProtectedRoute>}/>
          <Route path={'/cabinet/edit-category/:id'} element={
            <ProtectedRoute isAllowed={user !== null}>
              <EditCategory/>
            </ProtectedRoute>}/>
          <Route path={'/register'} element={<Register/>}/>
          <Route path={'/login'} element={<Login/>}/>
          <Route path={'*'} element={<h2>Not found</h2>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
