
const initObj = {ended:false,songId:'',random:false}

export default function PlayerState (preState=initObj,action) {
    const {type,data} = action
    switch (type) {
        case 'changePlayerState':
            return data
    
        default:
            return preState
    }
}