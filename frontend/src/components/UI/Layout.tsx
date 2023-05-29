import React from 'react';
import AppToolbar from "./AppToolbar";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="App">
      <header>
        <AppToolbar/>
      </header>
      <main style={{margin: '15px auto', padding: '10px'}}>
        {children}
      </main>
    </div>
  );
};

export default Layout;