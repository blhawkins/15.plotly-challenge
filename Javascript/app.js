//----------Initialization of Webpage----------
//---------------------------------------------

//This function runs when the page first loads (https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)
window.onload = function patientListFun() {
    //Select the 'Select dataset' dropdown
    var patientDropDown = d3.select('#selDataset');
    //Append a dropdown element for each patient; It also assigns the cooresponding index value to the element's 'value' tag
    d3.json('Data/samples.json').then((importedData) => {
        importedData['names'].forEach((element, index) => {
                var patient = patientDropDown.append('option');
                patient.text(`Patient ${element}`);
                patient.property('value', index);
        });
    });
    //Initialize the webpage's graphics with a random patient
    createGraphicsFun(Math.floor(Math.random() * 152));
};

//----------Creation of Visualizations----------
//----------------------------------------------

//This function creates the graphics shown on the webpage
function createGraphicsFun(index) {
    //Read the samples.json file and save it as the importedData object
    d3.json('Data/samples.json').then((importedData) => {

    //----------Top 10 OTUs Table Creation----------
    //----------------------------------------------

    //Create a new sampleData object to hold the samples portion from the importedData object, for a requested index value
    var sampleData = importedData['samples'][index];
    //Slice the first ten entries of the 'Samples', 'Sample Values' and 'OTU Labels' from the sampleData
    topTenIDs = sampleData['otu_ids'].slice(0,10).reverse();
        for (var i = 0; i <= topTenIDs.length -1; i++){
            topTenIDs[i] = 'OTU ' + topTenIDs[i];
        };
    topTenSampleValues = sampleData['sample_values'].slice(0,10).reverse();
    topTenLabels = sampleData['otu_labels'].slice(0,10).reverse();

    //Create a trace for the figure
    var otuTrace = {
        x: topTenSampleValues,
        y: topTenIDs,
        text: topTenLabels,
        type: 'bar',
        orientation: 'h'
    };
    //Define the data for the figure
    var otuData = [otuTrace];
    //Define the layout of the figure
    var otuLayout = {
        title: "Top 10 OTUs",
        margin: {
          l: 100,
          r: 25,
          t: 25,
          b: 100
        },
        xaxis: {title: "Species Prevalence"},
      };
    //Create the figure at the 'bar' tag
    Plotly.newPlot("bar", otuData, otuLayout);

    //----------Bubble Chart Creation----------
    //-----------------------------------------

    //Create a trace for the figure - https://plotly.com/javascript/bubble-charts/
    var bubbleTrace = {
        x: sampleData['otu_ids'],
        y: sampleData['sample_values'],
        mode: 'markers',
        marker: {
            size: sampleData['sample_values'],
            color: sampleData['otu_ids']
        },
        text: sampleData['otu_labels']
    };
    //Define the data for the figure
    var bubbleData = [bubbleTrace];
    //Define the layout of the figure
    var bubbleLayout = {
        title: "Species Biodiversity",
        margin: {
          l: 100,
          r: 100,
          t: 25,
          b: 100
        },
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Species Prevalence"}
    };
    //Create the figure at the 'bubble' tag
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    //----------Demographic Info Table Creation----------
    //---------------------------------------------------

    //Select the #sample-metadata id from the index.html file
    var demographicsTable = d3.select('#sample-metadata');
    //Create a new patientDemographics object to hold the metadata portion from the importedData object, for a requested index value
    var patientDemographics = importedData['metadata'][index];
    //For each of the demographic categories from the patientDemographics object, create a new line in the metadata table and print the cooresponding value
    var row = demographicsTable.append('p');
        row.text(`Patient ID: ${patientDemographics['id']}`);
    var row = demographicsTable.append('p');
        row.text(`Patient Ethnicity: ${patientDemographics['ethnicity']}`);
    var row = demographicsTable.append('p');
        row.text(`Patient Gender: ${patientDemographics['gender']}`);
    var row = demographicsTable.append('p');
        row.text(`Patient Age: ${patientDemographics['age']}`);
    var row = demographicsTable.append('p');
        row.text(`Patient Location: ${patientDemographics['location']}`);
    var row = demographicsTable.append('p');
        row.text(`Belly Button Type: ${patientDemographics['bbtype']}`);
    var row = demographicsTable.append('p');
        row.text(`Wash Frequency: ${patientDemographics['wfreq']}`);

    //----------Wash Frequency Gauge Chart----------
    //----------------------------------------------

    //Define the data for the figure - https://plotly.com/javascript/gauge-charts/
    var gaugeData = [
        {
            domain: {x: [0, 1], y: [0, 1]},
            value: patientDemographics['wfreq'],
            title: {text: "Belly Button Scrubs Per Week"},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0, 9]},
                steps: [
                    {range: [0, 1], color: "F8F1E9"},
                    {range: [1, 2], color: "F3EFE1"},
                    {range: [2, 3], color: "E7E3C2"},
                    {range: [3, 4], color: "E2E5A8"},
                    {range: [4, 5], color: "CFE38F"},
                    {range: [5, 6], color: "ADC785"},
                    {range: [6, 7], color: "7CBA7B"},
                    {range: [7, 8], color: "79B583"},
                    {range: [8, 9], color: "75AD7E"},
                ],
                threshold: {
                    line: {color: "7D0004", width:4},
                    value: patientDemographics['wfreq']
                },
            }
        }
    ];
    //Define the layout of the figure
    var gaugeLayout = {
        width: 600, 
        height: 450, 
        margin: { t: 0, b: 0 },
    };
    //Create the figure at the 'gauge' tag
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
    });
};

//----------Update Visualizations----------
//-----------------------------------------
function updateGraphicsFun() {
    //Use D3 to select the dropdown menu
    var dropdownMenu = d3.select('#selDataset');
    //Assign the value of the dropdown menu option to a variable patientIndex
    var patientIndex = dropdownMenu.property("value");
    //Clear the Patient Demographics table in preparation for new values to be printed
    var demographicsTable = d3.select('#sample-metadata');
    demographicsTable.html('')
    //Call the createGraphicsFun and input the desired patientIndex
    createGraphicsFun(patientIndex)
};

//----------Dataset Selection----------
//-------------------------------------

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updateGraphicsFun);