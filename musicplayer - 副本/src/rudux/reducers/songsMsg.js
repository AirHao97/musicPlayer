const initObj = {
    data:[{id:123456,url:'',time:'0:00'}]
}

export default function changeSongsMsg(preData=initObj,action){
    const {type,data} = action
    switch (type) {
        case 'changeSongsMsg':
            return data
    
        default:
            return preData
    }
}