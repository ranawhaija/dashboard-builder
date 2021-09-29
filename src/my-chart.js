
/**
 * MyChart class to use the portal builder
 *
 * @class MyChart
 * @author Rana Abul-Haija
 */
class MyChart {
    // declare private attributes
    #portalChartsData;
    #portalContainerId;

    constructor(portalContainerId, portalChartsData) {
        // load the dependency Chart.js library
        dynamicallyLoadScript('../dependencies/chartjs.js').then(() => {
            this.#portalChartsData = portalChartsData;
            this.#portalContainerId = portalContainerId;
            this.#buildPortal();
        }).catch((e) => {
            console.log(e);
        });
    }

    /**
     * return passed portal data
     *
     * @readonly
     * @memberof MyChart
     */
    get portalChartsData() {
        return this.#portalChartsData;
    }

    /**
     * build the structure of the portal
     *
     * @private
     * @memberof MyChart
     */
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

        // sort the charts by order in case they are not,
        // then set its position in the grid
        this.#portalChartsData.sort((a, b) => {
            return a.order - b.order;
        }).forEach((chartData, index) => {
            let chartElement = document.createElement("div");
            // check  if the current row has a width capacity for new chart
            if (6 - col < chartData.width - 1) {
                col = 1;
            }
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
                        // set pririty charts array
                        priorityArray[chartData.priority - 1] = {
                            canvas: chartCanvas,
                            config: {
                                ...chartData, options: {
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
                // update the col value to place the next chart 
                col = col + chartData.width;
            }
        });
        // fetch and render the charts based on its priority
        this.#fetchChartData(priorityArray);
    }

    /**
     * fetch the data of the portal
     *
     * @private
     * @memberof MyChart
     */
    #fetchChartData(priorityArray) {
        console.info('This is an info log to check the fetching of charts per priority');
        priorityArray.forEach((chart) => {
            console.info(chart.config.title, 'priority', chart.config.priority);
            // check if the data is based as is or by url,
            // if it is a url then fetch the data using http request
            if (typeof (chart.config.data) == 'string') {
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = () => {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        // check if the json text is valid and can be parsed
                        try {
                            chart.config.data = JSON.parse(xmlHttp.responseText);
                            this.#buildChart(chart);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                xmlHttp.open("GET", chart.config.data, true); // async request
                xmlHttp.send(null);
            } else {
                this.#buildChart(chart);
            }
        });
    }

    /**
     * build the chart
     *
     * @private
     * @memberof MyChart
     */
    #buildChart(chart) {
        if (chart.config.type == 'html-content') {
            this.#buildHtmlContentChart(chart);
        } else {
            // using chart.js function
            new Chart(
                chart.canvas,
                chart.config
            );
        }
    }


    /**
     * build the widget of type html content
     *
     * @private
     * @memberof MyChart
     */
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

/**
 * load the script and resolve only if the dependency loaded
 * 
 * @param url String
 * @returns Promise
 *
 */
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

