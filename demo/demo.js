const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];
const sampleData = [{
    title: 'Revenues',
    description: '$27,605',
    secondaryText: 'increased',
    type: 'html-content',
    order: 1,
    width: 2,
    priority: 6,
},
{
    title: 'Salaries',
    description: '$12,500',
    secondaryText: 'fixed',
    type: 'html-content',
    order: 2,
    width: 2,
    priority: 7,
},
{
    title: 'Total Sales',
    description: '$100,000',
    secondaryText: 'decreased',
    type: 'html-content',
    order: 3,
    width: 2,
    priority: 8,
},
{
    type: 'line',
    order: 4,
    width: 3,
    size: { width: 3, height: 2 },
    priority: 2,
    title: 'chart 4',
    data: {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
},
{
    type: 'bar',
    order: 5,
    width: 3,
    size: { width: 2, height: 3 },
    priority: 1,
    title: 'chart 5',
    data: 'https://mocki.io/v1/2e42c8bb-5156-4a94-88ba-891b6067c14c'
},
{
    type: 'radar',
    order: 6,
    width: 2,
    size: { width: 3, height: 2 },
    priority: 3,
    title: 'chart 6',
    data: {
        labels: [
            'Eating',
            'Drinking',
            'Sleeping',
            'Designing',
            'Coding',
            'Cycling',
            'Running'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: 'My Second Dataset',
            data: [28, 48, 40, 19, 96, 27, 100],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    },
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        }
    }
},
{
    type: 'doughnut',
    order: 7,
    width: 2,
    size: { width: 2, height: 3 },
    priority: 4,
    title: 'chart 7',
    data: {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }
},
{
    type: 'line',
    order: 8,
    width: 2,
    size: { width: 3, height: 2 },
    priority: 5,
    title: 'chart 8',
    data: "https://mocki.io/v1/2e42c8bb-5156-4a94-88ba-891b6067c14c"
}];
new MyChart('portal-container', sampleData);

