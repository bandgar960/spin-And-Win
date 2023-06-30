// Select the DOM elements
const wheel = document.querySelector('#wheel');
const spinBtn = document.querySelector('#spin-btn');
const finalValue = document.querySelector('#final-value');

// Object store min and max angles for the charts
const rotationValue = [
    { minDegree: 0, maxDegree: 30, value: "Copoun: Congratulations, You Have Won the coupon! WIN30 " },
    { minDegree: 31, maxDegree: 90, value: "Copoun: Congratulations, You Have Won the coupon! WIN20" },
    { minDegree: 91, maxDegree: 150, value: "Good luck" },
    { minDegree: 151, maxDegree: 210, value: "Copoun: Congratulations, You Have Won the coupon! WIN11" },
    { minDegree: 211, maxDegree: 270, value: "Copoun:Congratulations, You Have Won the coupon!  WIN17" },
    { minDegree: 271, maxDegree: 360, value: "Copoun: Congratulations, You Have Won the coupon! WIN40" },
    {minDegree:300, maxDegree:400,value:"coupoun: Congratulations, You Have Won the coupon! WIN50"}
];
// Size of each piece
const data = [16, 16, 16, 16, 16, 16];
// Background color for each piece
const pieColors = ['#7AC425', '#3F6613', '#8FE62C', '#1ac425', '#7FCC27', '#4f4f4f'];

// Create chart
let myChart = new Chart(wheel, {
    // Plugin display name
    plugins: [ChartDataLabels],
    // Chart type: pie
    type: 'pie',
    data: {
        labels: [`30%`, `20%`, `11%`, `17%`, `40%`, `50%`],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        //Responsive chart
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            //hide tooltip and legend
            tooltip: false,
            legend: {
                display: false,
            },
            //display labels inside pie chart
            datalabels: {
                color: "#fff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 25 },
            }
        },
    },
});
//display value based on randonm angle value

const valueGenerator = (angleVale) => {
    for (let i of rotationValue) {
        if (angleVale >= i.minDegree && angleVale <= i.maxDegree) {
            console.log(angleVale, i.value);
            finalValue.innerHTML = `<p> ${i.value}</p>`;
            spinBtn.disabled = false
        }
    }
}

//making the spinner spin 
let count = 0;  //this is counter for set interval when we need to spin after 360
let resultValue = 101; // this to be added to the rotaion to move fast then decrease by one 

spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true // displed when spining 
    finalValue.innerHTML = `<p> Spining </p> `
    //making random degrees to spin and send it to function of results 
    let randomDegree = Math.floor(Math.random() * (360 - 0 + 1) - 0);
    console.log(randomDegree);

    //rotate the pie using set interval 
    let rotationInterval = window.setInterval(() => {
        // making the rotation spin fast by reuslt value = 101
        myChart.options.rotation = myChart.options.rotation + resultValue;
        //must update the chartjs using update 
        myChart.update();
        //if rotaion > 360 back to 0
        if (myChart.options.rotation >= 360) {
            myChart.options.rotation = 0;
            count += 1;
            resultValue -= 5;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            console.log(randomDegree, 'here is stop ');
            clearInterval(rotationInterval)
            valueGenerator(randomDegree)
            spinBtn.disabled = false
            count = 0;
            resultValue = 101
        }

    }, 10)
})
