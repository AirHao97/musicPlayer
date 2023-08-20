const initValue = false

export default function changeLoginStatus(preState=initValue,action){
    const {type,data} = action
    switch(type){
        case 'changeLoginStatus':
            return data
        default:
            return preState
    }
}