
export const addword = async (params,data) => {
    console.log(params)
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
            "token": params.token,
            "userid": params.userid,
            "word": params.word,
            "language": params.language,
            "part_of_speech": params.part_of_speech,
            "gender": params.gender,
            "conjugates": params.conjugates,
            "usage_example": params.usage_example,
            "synonyms": params.synonyms,
            "antonyms": params.antonyms,
            "region": params.region,
            "uploaded_zip_code": params.uploaded_zip_code,
            "def": params.def,
            "anonCheck": params.anonCheck
        })
    };
    try {
        const response = await fetch('https://desidictionary.app/postword', requestOptions);
        const data = await response.json();
        return data;
    }
    catch (e) {
        console.log(e)
    }

}