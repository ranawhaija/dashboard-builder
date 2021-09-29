# dashboard-builder
custom portal builder using chartjs library

### Demo
- There is a folder called a demo contains a sample test for the **portal builder**
- A sample-data file is added in case the **mocki** test APIs is no more avilable
- The portal builder can be called using `new MyChart(CONTAINER_ID, PORTAL_DATA);` 

##### CONTAINER_ID
The Id for the portal container which will include all the widgets.

##### PORTAL_DATA
It is an array of widget objects has the following structure:
```
[{
    type: STRING ,
    order: INTEGER,
    width: INTEGER,
    priority: INTEGER,
    title: STRING,
    data: STRING || chart.js* DATA_OBJECT,
    description: STRING,
    secondaryText: STRING,
    },
    {...
    }
]
```
- **type:** 
    - `'html-content'` if it is simple card widget
    - `'line','bar','radar',...` one of chart.js chart type. 
- **order:** the widget/chart order.
- **width:** the width of the chart in the unit of col `max =6`
- **priority:** the most important chart to fetch and render has priority `1` and so on.
- **title:** the main title for the chart.
- **data:** accept API urls or data object same to chart.js.
- **description:** **`only for 'html-content type`** description for the card
- **secondaryText:** **`only for 'html-content type`** secondary text for the card
--------------------------------------------------------------------

                    
 *"chart.js", [Link](https://www.chartjs.org/)。
