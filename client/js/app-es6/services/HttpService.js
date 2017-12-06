export class HttpService{

    _hadleErrors(res){
        if (res.ok){
            return res;
        }else {
            throw new Error(res.statusText);
        }
    }

    get(url){

        return fetch(url)
            .then(res => this._hadleErrors(res))
            .then(res => res.json());

       /* return new Promise((resolve, reject) =>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4){
                    if (xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log(xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send();
        })*/
    }

    post(url, dado) {

        return fetch(url,{
            headers: {'content-type' : 'application/json'},
            method: 'post',
            body: JSON.stringify(dado)
        })
            .then(res => this._hadleErrors(res));
        /*return new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = () => {

                if (xhr.readyState == 4) {

                    if (xhr.status == 200) {

                        resolve(JSON.parse(xhr.responseText));
                    } else {

                        reject(xhr.responseText);
                    }
                }
            };
            xhr.send(JSON.stringify(dado));
        });*/
    }
}