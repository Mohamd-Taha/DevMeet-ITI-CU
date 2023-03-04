export function profileReducer(state, action){
 switch (action.type){
  case 'setPosts':
   return state.posts=action.payload.posts
  case 'friends':
   return state.friends=action.payload.friends
  case 'mode':
   return state.mode=state.mode==='light'?'dark':'light'
 }
}