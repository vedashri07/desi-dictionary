
export const undoFlag = async (params) => {
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
            "wordid": params.wordid,
            "token": params.token,
            "userid": params.userid,

        })
    };
    try {
        const response = await fetch('https://desidictionary.app/undoFlag', requestOptions);
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e)
    }

}