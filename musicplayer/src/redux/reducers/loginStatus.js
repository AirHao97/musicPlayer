const initValue = {state:false,id:'',cookie:''}

export default function changeLoginStatus(preState=initValue,action){
    const {type,data} = action
    switch(type){
        case 'changeLoginStatus':
            return {...preState,...data}
        default:
            return preState
    }
}