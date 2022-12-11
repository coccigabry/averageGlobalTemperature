makeChart()


async function makeChart() {

    const data = await getData()

    const ctx = document.getElementById('myChart')
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xYears,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
                data: data.yTemps,
                borderWidth: 1
            }]
        },
    });



async function getData() {
    const xYears = []
    const yTemps = []

    const response = await fetch('ZonAnn.Ts+dSST.csv')
    const data = await response.text()
    const table = data.split('\n').splice(1)
    table.forEach(row => {
        const columns = row.split(',')
        const year = columns[0]
        xYears.push(year)
        const temp = columns[1]
        yTemps.push(parseFloat(temp) + 14)
        console.log(year, temp);
    })
    return {xYears, yTemps }
}
