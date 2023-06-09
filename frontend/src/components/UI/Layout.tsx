import React from 'react';
import AppToolbar from "./AppToolbar";
import Footer from "./Footer";
import {Container} from "@mui/material";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="App">
      <header>
        <AppToolbar/>
      </header>
      <main style={{margin: '15px auto', padding: '10px', minHeight: '100vh'}}>
        <Container>
        {children}
        </Container>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Layout;