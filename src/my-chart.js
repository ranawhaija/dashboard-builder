
class MyChart {
    #portalChartsData;
    #portalContainerId;

    constructor(portalContainerId, portalChartsData) {
        dynamicallyLoadScript('../dependencies/chartjs.js').then(() => {
            this.#portalChartsData = portalChartsData;
            this.#portalContainerId = portalContainerId;
            this.#buildPortal();
        }).catch((e) => {
            console.log(e);
        });
    }

    get portalChartsData() {
        return this.#portalChartsData;
    }

    #buildPortal() {
        let priorityArray = new Array(this.#portalChartsData.length);
        let col = 1;
        const parentNode = document.querySelector(`#${this.#portalContainerId}`);

        parentNode.setAttribute('style', `
        display: grid;
        grid-template-columns: 15% 15% 15% 15% 15% 15%;
        grid-gap: 16px;
        width:100%;
        background-color: rgba(0,0,0,0.1);
        padding: 10px;`);

        this.#portalChartsData.sort((a, b) => {
            return a.order - b.order;
        }).forEach((chartData, index) => {
            if (6 - col < chartData.width - 1) {
                col = 1;
            }
            let chartElement = document.createElement("div");
            parentNode.appendChild(chartElement);
            if (chartElement.isConnected) {
                if (chartData.type == 'html-content') {
                    priorityArray[chartData.priority - 1] = {
                        canvas: chartElement,
                        config: { ...chartData, position: col }
                    }
                } else {
                    let chartCanvas = document.createElement("canvas");
                    chartCanvas.setAttribute('id', `chart-${chartData.type}-${index}`);
                    chartElement.setAttribute('style', `
                    grid-column: ${col} /span ${chartData.width};
                    background-color: #fff;`);

                    chartElement.appendChild(chartCanvas);

                    if (chartCanvas.isConnected) {
                        priorityArray[chartData.priority - 1] = {
                            canvas: chartCanvas,
                            config: {
                                type: chartData.type,
                                data: chartData.data,
                                options: {
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: `${chartData.title}- priority ${chartData.priority}` || ''
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                col = col + chartData.width;
            }
        });
        this.#fetchChartData(priorityArray);
    }

    #fetchChartData(priorityArray) {
        priorityArray.forEach((chart) => {

            if (typeof (chart.config.data) == 'string') {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = () => {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        try {
                            chart.config.data = JSON.parse(xmlHttp.responseText);
                            this.#buildChart(chart);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                xmlHttp.open("GET", chart.config.data, true);
                xmlHttp.send(null);
            } else {
                this.#buildChart(chart);
            }
        });
    }

    #buildChart(chart) {
        if (chart.config.type == 'html-content') {
            this.#buildHtmlContentChart(chart);
        } else {
            new Chart(
                chart.canvas,
                chart.config
            );
        }
    }

    #buildHtmlContentChart(chart) {
        chart.canvas.setAttribute('style', `
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 6px 12px;
        background-color: #fff;
        grid-column: ${chart.config.position} / span ${chart.config.width};
        `);

        let title = document.createElement('div');
        let description = document.createElement('div');
        let secDesc = document.createElement('div');

        title.innerHTML = chart.config.title;
        title.setAttribute('style', `
        min-width: 80%;
        border-bottom: 2px solid #c7c7c7;
        font-weight: 600;
        `)

        description.innerHTML = chart.config.description;
        description.setAttribute('style', `
        margin-bottom: 12px;
        margin-top: 3px;
        height: 100%;
        `);

        secDesc.innerHTML = chart.config.secondaryText;
        secDesc.setAttribute('style', `
        font-size: smaller;
        `);

        chart.canvas.appendChild(title);
        chart.canvas.appendChild(description);
        chart.canvas.appendChild(secDesc);

    }
}


function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL
    return new Promise((resolve, reject) => {
        script.addEventListener('load', () => {
            console.log('Dependencies loaded successfully');
            resolve();
        });
        script.addEventListener('error', () => {
            reject();
        });
        document.head.appendChild(script)
    });
}

