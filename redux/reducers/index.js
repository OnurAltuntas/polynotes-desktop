import {combineReducers} from 'redux';
import NoteReducer from './NotesScreenReducer';
import BoardReducer from './BoardsReducer';
import TodosReducer from './TodosReducer';
import InProgressRecucer from './InProgressReducer';
import DoneReducer from './DoneScreenReducer';






const rootReducer = combineReducers({
    notesList:NoteReducer,
    boardsList:BoardReducer,
    todosList:TodosReducer,
    InProgressList:InProgressRecucer,
    donesList:DoneReducer
})

export default rootReducer;
