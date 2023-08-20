const initObj = {
    nickname:'未命名',
    avatarUrl:process.env.PUBLIC_URL+'/pic.jpg',
    backgroundUrl:'',
    birthday:'',
    followeds:0,
    follows:0,
    playlistCount:0,
    signature:'',
    id:''
}

export default function userMsg(preState=initObj,action) {
    const {type,data} = action
    switch(type){
        case 'changeMsg':
            return data
        default:
            return preState        
    }
}