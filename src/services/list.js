
export const getList = async () => {

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            "token": "",
            "userid": "",
            "limit": "5",
            "pageno": "1",
            "searchstring": ""
        })
    };
    try {
        const response = await fetch('https://desidictionary.app/', requestOptions);
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e)
    }

}