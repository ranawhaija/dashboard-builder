# dashboard-builder
custom portal builder using chartjs library

### Demo
- There is a folder called a demo contains a sample test for the **portal builder**
- A sample-data file is added in case the **mocki** test APIs is no more avilable
- The portal builder can be called using `new MyChart(CONTAINER_ID, DATA);` 

##### CONTAINER_ID
The Id for the portal container which will include all the widgets.

##### DATA
It is an array of widget objects has the following structure:
```javascript
[{
    type: string ,
    order: integer,
    width: integer,
    priority: integer,
    title: string,
    data: string || chart.js* data object
    },
    {...
    }
]

----

                    
> *"chart.js", [Link](https://www.chartjs.org/)。
