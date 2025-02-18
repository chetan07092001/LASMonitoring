import {configureStore} from '@reduxjs/toolkit'
import portfolioDetail from './reducer';

const store =configureStore({
    reducer:{
       portfolioSummary:portfolioDetail,
  }
});

export default store
