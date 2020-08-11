export default function (state = {} ,action){
    switch(action.type){
        case "BOARDS_FETCH":
           
            return{
                ...state,
                boardsList:action.payload
            }

            default:
                return state
    }
}