// Use D3 library to read in JSON
const bellyb = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(bellyb).then(function (data) {
  console.log(data)
  getData(data.names);
  buildCharts(data.names[0]);
  buildMetaData(data.names[0]);
});

function buildMetaData(value) {
  d3.json(bellyb).then(function (data) {

    // Set variables
    let metadata = data.metadata;
    let resultArray = metadata.filter(sampleObj => sampleObj.id == value);
    let result = resultArray[0];
    console.log(result)
    let box = d3.select("#sample-metadata");
    box.html("");

    Object.entries(result).forEach(([key, value]) => {
      box.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  })
}




// Function called by DOM changes to select person
function getData(names) {

  // Select dropdown
  let dropdownMenu = d3.select("#selDataset");
  // For loop to go through all names
  for (let i = 0; i < names.length; i++) {
    dropdownMenu.append("option")
      .text(names[i])
      .property("value", names[i]);

  };
};

// Function called when dropdown number is changed to switch data
function optionChanged(id) {
  buildCharts(id)
  buildMetaData(id)
}

function buildCharts(value) {
  d3.json(bellyb).then(function (data) {


    // Set variables
    let samples = data.samples;
    let resultArray = samples.filter(sampleObj => sampleObj.id == value);
    let result = resultArray[0];
    console.log(result)

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;


    // Trace1 for one plot
    let trace1 = [{
      y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    }];

    let layout1 = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", trace1, layout1);

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };

    let bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
        }
      }
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  })
};