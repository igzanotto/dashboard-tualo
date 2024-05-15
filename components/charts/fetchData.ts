export const fetchBitcoin = async ({value}:any) => {
    const url = `https://api.coingecko.com/api/v3/coins/${value}/market_chart`;
    const params = {
        vs_currency: "usd",
        days: "30",
        interval: "daily"  // Intervalo de 1 minuto para obtener datos de cada minuto en las últimas 24 horas
    };
    try {
        const res = await fetch(url + "?" + new URLSearchParams(params))
        .then((res) => res.json())
        console.log(res);
        return res.prices;
        
    } catch (error) {
        console.log(error);
    }
}