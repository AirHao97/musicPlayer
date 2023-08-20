const initObj = {
    data:[{id:123456,url:'',time:'0:00',willPlayedList:{}}]
}

export default function changeSongsMsg(preData=initObj,action){
    const {type,data} = action
    switch (type) {
        case 'changeSongsMsg':
            return {...preData,...data}
    
        default:
            return preData
    }
}