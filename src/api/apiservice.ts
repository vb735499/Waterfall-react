import toast from 'react-hot-toast';

const _get = async () =>{
    return await fetch('/api/query')
    .then((response) => {
        return response.clone().json();
    })
    .then((data) => {
        console.log(data);
        return data;
    })
    .catch(console.error);
}

const _upload = async (username: string, imgPaths: FileList) => {
    const formData = new FormData();
    formData.append("memberId", username);
    for(var imgPath in imgPaths)
        formData.append("upload[]",imgPath);

    const requestPkg = {
        method: "POST",
        body: formData
    }
    console.log(requestPkg);
    await fetch('/api/upload', requestPkg)
    .then((response) => {
        (response.status === 200) ? (toast.success('上傳成功!')):( toast.error("error code:"+response.status+', 上傳失敗') )
        console.log(response.clone().json());
    })
    .catch((err) => {
        toast.error("error msg:"+err+", 上傳失敗, 請聯絡管理者!");
    });
}

const _test = (username: string, imgPaths: FileList) => {
    const formData = new FormData();
    formData.append("memberId", username);
    for(var imgPath in imgPaths)
        formData.append("upload[]",imgPath);
    console.log(formData.getAll("upload[]"));
}

const APIService = {
    _get,
    _upload,
    _test
}
export default APIService;