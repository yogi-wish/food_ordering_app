
const initialState = {
    
};

export const GetDataReducer = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case "GET_ALL_DATA":
            return [...action.payload]
        default:
            return state;
    }
}

