const initialState = {
    province : [],
    districts : [],
    subDistrict : [],
    village : []
}

const regionTodo = (state = initialState, action)=> {
    switch (action.type) {
        case 'SET_PROVINCE' :
            return {...state,province : action.payload};
        case 'SET_DISTRICT':
            return {...state,districts: action.payload};
        case 'SET_SUB_DISTRICT':
            return {...state,subDistrict: action.payload};
        case 'SET_VILLAGE':
            return {...state,village: action.payload}
        default:
            return state
    }
}

export default regionTodo