import ReactApexChart from "react-apexcharts";

const BarChart = () => {
    const barSeries = [{
        name: 'Calorie Intake',
        data: [450, 700, 600, 800, 500, 650, 400]
    }, {
        name: 'Calories Lost',
        data: [300, 400, 350, 450, 300, 400, 500]
    }];

    const barOptions = {
        chart: {
            type: 'bar',
            stacked: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
        title: {
            text: 'Weekly Calorie Intake vs Calorie Lost'
        },
    };

    return(
        <ReactApexChart options={barOptions} series={barSeries} type="bar" height={350} />
    );
};

export default BarChart;