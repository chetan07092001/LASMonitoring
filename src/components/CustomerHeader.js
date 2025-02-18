
import React from 'react';
//import SearchBar from './SearchBar';
import SearchBar from './CustomerSearchBar'

const CustomerHeader = ({searchValue}) => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      marginBottom: '20px',
      marginTop: '20px',
      
    },
    arrowButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0', 
      border: 'none',
      cursor: 'pointer',
      padding: '10px',
      borderRadius: '50%', 
      marginRight: '10px',
      fontSize: '20px',
      width: '40px',
      height: '40px',
      marginTop: '-38px',
     
    },
    arrowIcon: {
      color: '#6e6e6e', 
    },
    detailsText: {
      flexGrow: 0.6,
      fontSize: '24px',
      fontWeight: 'bold',
      marginTop: '-38px', 
      fontFamily: 'Epilogue, sans-serif',
    },
    editButton: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#4285f4', 
      color: 'white',
      border: 'none',
      borderRadius: '44px',
      padding: '10px 14px',
      fontSize: '14px',
      cursor: 'pointer',
      marginTop: '6px', 
      marginRight:'-238px',
      marginLeft:'10px',
    },
    editIcon: {
      marginRight: '5px',
      fontSize: '14px',
    },
    newedit:{
      display: 'flex',
      // justifyContent:'space-around',
      marginTop:'-45px',
      width:'436px',
      marginRight:'-295px'
    }
  };

  return (
    <div style={styles.container}>
      
      <button style={styles.arrowButton}>
        <span style={styles.arrowIcon}>→</span>
      </button>
      <span style={styles.detailsText}>Customer details</span>
      <div style={styles.newedit}>
      <SearchBar searchValue={searchValue}/>
      <button style={styles.editButton}>
        <span style={styles.editIcon}>✎</span>
        Edit
      </button>
      
      </div>
    </div>
  );
};

export default CustomerHeader;
