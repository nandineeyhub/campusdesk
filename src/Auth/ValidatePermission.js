
const ValidatePermission = (access) => {

    const roles = JSON.parse(localStorage.getItem("permissions"))
  
    if( (roles.filter((permission)=>{
        return permission == access})).length > 0) return true
    else return false
    
}

 export default ValidatePermission