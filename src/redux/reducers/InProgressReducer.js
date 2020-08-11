export default function (state = {} ,action){
    switch(action.type){
        case "INPROGRESS_FETCH":
            
            return{
                ...state,
                InProgressList:action.payload
            }

            default:
                return state
    }
}