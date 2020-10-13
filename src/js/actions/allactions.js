
import data from './data.json'

export const getData=()=>
{

    return (dispatch)=>{
        return getJsonData()
        .then((res)=>{
           
            dispatch({type:'getData',data:res.data})
        }).catch((err)=>{

        })
    }
}

async function getJsonData(){
    let response = await fetch('/src/js/actions/data.json');
  let user = await response.json();
 
return user;
      
}


export const chartData=(dataval)=>{
   
    return (dispatch)=>{
        dispatch({type:'setData',data:dataval})
    }
}