import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <footer style={{background: '#0E8388', padding: '18px'}}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center" color='#fff'>
          JS17 Biktimirov Edil
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;

