
import axios from "axios";
const qs = require('qs');  

const paramsSerializer = (params) => {  
    return qs.stringify(params, { arrayFormat: 'brackets' })  
  };  
const AxiosPost = (data,path) => {
    axios({
        url: path,
        data: data,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        console.log(res.data)
        return res.data
    })
}

const AxiosGet = async (path) => {
    var data;
    await axios.get(path).then(res=>{
        //console.log(res.data)
        data = res.data
    })
    return data
}
export default  {AxiosPost, AxiosGet}