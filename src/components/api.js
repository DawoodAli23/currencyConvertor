const APIKEY="aa93239002b8ae347ec129ba6be35436";

const fetchCountry=async()=>{
    return await fetch(`http://data.fixer.io/api/symbols?access_key=${APIKEY}`).then(
        resp=>resp.json()
    ).then(
        data=>{
            return data;
        }
    );
}

const convertor=async(fromCode,toCode,FromVal)=>{
    return await fetch(`http://data.fixer.io/api/latest?access_key=${APIKEY}`).then(
        resp=>resp.json()
    ).then(
        data=>{
            const obj=data.rates;
            const fromPRICE=obj[fromCode],toPRICE=obj[toCode];

            const result = (1/fromPRICE)*toPRICE;
            return (result*FromVal);
        }
    )
}

module.exports = { fetchCountry, convertor };