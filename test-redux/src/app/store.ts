import { INCREMENT } from './actions';
import { IAppState } from './store';


export interface IAppState {
    counter: number;
    //to make property optional 
    messaging?: {
        newMessages: number
    }
}

export const INTIAL_STATE: IAppState = {
    counter: 0,
    messaging: {
        newMessages: 5
    }
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case INCREMENT: return { counter: state.counter + 1 }
    }

    return state;
}