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
    createGraphics(Math.floor(Math.random() * 152));
};


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
          r: 100,
          t: 25,
          b: 100
        }
      };
    //Create the figure at the 'bar' tag
    Plotly.newPlot("bar", otuData, otuLayout);

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

    //----------Bubble Chart Creation----------
    //-----------------------------------------

    //Select the #bubble id from the index.html file
    var bubbleChart = d3.select('#bubble')

    //----------Wash Frequency Gauge Chart----------
    //----------------------------------------------

    //Select the #gauge id from the index.html file
    var gaugeChart = d3.select('#gauge')
    });
};

//----------Dataset Selection----------
//-------------------------------------

//Look for an onchange in the notes for the creation of this
// Call updatePlotly() when a change takes place to the DOM
//d3.selectAll("#selDataset").on("change", updatePlotly);
