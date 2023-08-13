//initialize
//function init() 

// Use D3 library to read in JSON
const bellyb = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

  // Fetch the JSON data and console log it
  d3.json(bellyb).then(function(data) {
    getData(data.names);
    console.log(data);

  });


// // On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes to select person
function getData(names) {
  // Select dropdown
  let dropdownMenu = d3.select("#selDataset");
  // For loop to go through all names
  for (let i = 0; i < names.length; i++) {
    let selIndiv = dropdownMenu.append("choice");
    selIndiv.text(`${names[i]}`);
    console.log(dropdownMenu);
  };
};

//   };
//   // Initialize an empty array and x and y for the individual's data
//   // let data = [];
//   // let x = [];
//   // let y = [];
  
// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// }
// // init();
// }
// Create array of just one id sample for test
// let test = {object.names[0]}
//   // metadata: {
//   //   "ethnicity": "Caucasian", 
//   //   "gender": "F", 
//   //   "age": 24.0, 
//   //   "location": "Beaufort/NC", 
//   //   "bbtype": "I", 
//   //   "wfreq": 2.0,
//   // samples: {
//   //   id1: id[0],
//   //   otu_ids: otu_ids[0],
//   //   otu_labels: otu_labels[0],
//   // },


// console.log(test);

// // Sort the OTU data
// let sortOTUdata = samples.sort((a,b) => b.sample_values - a.sample_values),
// //Slice the top 10 OTUs
// slicedData = sortOTUdata.slice(0,10),
// // Reverse the array to accommodate Plotly's defaults
// reversedData = slicedData.reverse(),
// // Trace1 for one plot
// let trace1 = {
//   x: reversedData.map(object => object.sample_values),
//   y: reversedData.map(object => object.otu_ids),
//   text: reversedData.map(object => object.otu_labels),
//   name: "OTUs",
//   type: "bar",
//   orientation: "h"
// };

// // Data array
// let traceData = [trace1];

// // Apply a title to the layout
// let layout = {
//   title: "Top 10 OTUs found for individual selected",
//   margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//   }
// };

// // Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", traceData, layout);

// Call function to update the chart
updatePlotly(data);

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("plot", "values", [newdata]);
}

init();
