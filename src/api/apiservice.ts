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

const _upload = async (username: string, imgPaths: FileList | string[]) => {
    console.log(imgPaths);

    const formData = new FormData();
    formData.append("memberId", username);
    for(var key in imgPaths)
        formData.append("upload[]", imgPaths[key]);

    const requestPkg = {
        method: "POST",
        body: formData
    }

    console.log(formData);
    await toast.promise(
        fetch('/api/upload', requestPkg),{
            loading: "上傳中...",
            success: "上傳成功!",
            error:  "上傳失敗!"
        }
    );
}

const _test = async (username: string, imgPaths: FileList) => {
    console.log(imgPaths);

    const formData = new FormData();
    formData.append("memberId", username);
    for(var key in imgPaths)
        formData.append("upload[]", imgPaths[key]);

    const requestPkg = {
        method: "POST",
        body: formData
    }
    console.log(formData);
    await fetch('/api/upload', requestPkg)
    .then((response) => {
        (response.status === 200) ? (toast.success('上傳成功!')):( toast.error("error code:"+response.status+', 上傳失敗') )
    })
    .catch((err) => {
        toast.error("error msg:"+err+", 上傳失敗, 請聯絡管理者!");
    });
}

const APIService = {
    _get,
    _upload,
    _test
}
export default APIService;