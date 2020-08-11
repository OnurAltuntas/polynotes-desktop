export default function (state = {} ,action){
    switch(action.type){
        case "NOTES_FETCH":
            
            return{
                ...state,
                notesList:action.payload
            }

            default:
                return state
    }
}