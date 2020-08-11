export default function (state = {} ,action){
    switch(action.type){
        case "DONES_FETCH":
            
            return{
                ...state,
                donesList:action.payload
            }

            default:
                return state
    }
}