export default function (state = {} ,action){
    switch(action.type){
        case "TODOS_FETCH":
            
            return{
                ...state,
                todosList:action.payload
            }

            default:
                return state
    }
}