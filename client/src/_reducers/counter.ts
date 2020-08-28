
const counterReducer = (state:number = 0, action:any) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - action.payload;
        default:
            return state;
    };
};

export default counterReducer;