import {createReducer,createAction} from '@reduxjs/toolkit'

const fundAction = createAction('fundAction');
const collateralAction = createAction('collateralAction');
const partialSellAction = createAction('partialSellAction');
const completedSellAction = createAction('completedSellAction');
const portfolioHealthAction = createAction('portfolioHealthAction');
const firstNotice = createAction('firstNotice');
const secondNotice = createAction('secondNotice');
const marginUnderReview = createAction('marginUnderReview');

const portfolioDetail = createReducer(
    {
        fund:[],
        collateral:[],
        partialSell:[],
        completedSell:[],
        portfolioHealth:[],
        firstNotice:[],
        secondNotice:[],
        marginUnderReview:[],
    },(builder)=>{
        builder
            .addCase(fundAction,(state,action)=>{
                state.fund=action.payload
            })
            .addCase(collateralAction,(state,action)=>{
                state.collateral=action.payload
            })
            .addCase(partialSellAction,(state,action)=>{
                state.partialSell=action.payload
            })
            .addCase(completedSellAction,(state,action)=>{
               state.completedSell=action.payload
            })
            .addCase(portfolioHealthAction,(state,action)=>{
               state.portfolioHealth=action.payload
            })
            .addCase(firstNotice,(state,action)=>{
               state.firstNotice=action.payload
            })
            .addCase(secondNotice,(state,action)=>{
               state.secondNotice=action.payload
            })
            .addCase(marginUnderReview,(state,action)=>{
               state.marginUnderReview=action.payload
            })
    })

export default portfolioDetail
