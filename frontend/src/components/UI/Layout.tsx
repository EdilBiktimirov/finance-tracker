import React from 'react';
import AppToolbar from "./AppToolbar";
import Footer from "./Footer";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="App">
      <header>
        <AppToolbar/>
      </header>
      <main style={{margin: '15px auto', padding: '10px', minHeight: '100vh'}}>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default Layout;