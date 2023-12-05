
import axios from "axios";
const qs = require('qs');

const paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: 'brackets' })
};
const AxiosPost = (data, path) => {
    return axios({
        url: path,
        data: data,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        return res.data;
    }).catch(error => {
        throw error; // 抛出错误，以便调用方能够捕获
    });
};




const AxiosGet = async (path) => {
    var data;
    await axios.get(path).then(res => {
        //console.log(res.data)
        data = res.data
    })
    return data
}
export default { AxiosPost, AxiosGet }