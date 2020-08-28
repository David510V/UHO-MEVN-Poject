const mutations={
    'logUser'(state,data){
        state.token_id=data.tokens[0]._id
        state.token=data.tokens[0].token
        state.nickname=data.nickname
        state.email=data.email
        state.userId=data._id
        state.token=data.tokens[0].token
    },
    'logOutUser'(state){
        state.token_id= null,
        state.token=null,
        state.userId= null,
        state.nickname=null,
        state.email= null
    },
    'autoLog'(state,data){
        console.log(data)
        state.token=data.token,
        state.userId=data.userId,
        state.nickname=data.nickname
    },

    'errorLog'(state,er){
        state.errorLog=er
    }
}

export default mutations