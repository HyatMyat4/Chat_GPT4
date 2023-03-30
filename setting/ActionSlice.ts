import { createSlice } from '@reduxjs/toolkit'


const initialState = { 
    Examples : "",
    ChatBox : [],
    OpenClose : false,
}
export const Actionslice = createSlice({
    name: 'actionslice',
    initialState,
    reducers:{      
        ExamplesEngin : (state , action) => {
            state.Examples = action.payload
        },
        OpencloseEngin : (state , action) => {
            state.OpenClose = action.payload
        }
     
    } 
})

export const  {    
    ExamplesEngin,  
    OpencloseEngin
} = Actionslice.actions

export const  ExamplesC = (state : any) => state.actionslice.Examples
export const  OpencloseC = (state : any) => state.actionslice.OpenClose


export default Actionslice.reducer;