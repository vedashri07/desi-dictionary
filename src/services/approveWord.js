
export const approveWord = async (params, data) => {
    console.log(params, data)
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            "token": params.token,
            "userid": params.userid,
            "action": params.action,
            "wordid": params.wordid

        })
    };
    try {
        console.log(requestOptions)
        const response = await fetch('https://desidictionary.app/adminAction', requestOptions);
        console.log(response,"response")
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e)
    }

}