d3.json('Data/samples.json').then((importedData) => {
    //console.log(data)
    testID = '940'
    var sampleData = importedData['samples'][0] //??How do I call for a particular entry in the array of patients
    console.log(sampleData);
    topTenIDs = sampleData['otu_ids'].slice(0,10)
        for (var i = 0; i <= topTenIDs.length -1; i++){
            topTenIDs[i] = 'OTU ' + topTenIDs[i];
        }
        topTenIDs = topTenIDs.reverse()
    topTenSampleValues = sampleData['sample_values'].slice(0,10)
        topTenSampleValues = topTenSampleValues.reverse()
    topTenLabels = sampleData['otu_labels'].slice(0,10)
        topTenLabels = topTenLabels.reverse()
    console.log(topTenIDs)
    console.log(topTenSampleValues)
    console.log(topTenLabels)
    
    var trace1 = {
        x: topTenSampleValues,
        y: topTenIDs,
        text: topTenLabels,
        type: 'bar',
        orientation: 'h'
    };

    var topTenData = [trace1];

    Plotly.newPlot("bar", topTenData);
});

//How to search for a particular person?
//Is there a way to join dictionary entries?

//This is for the table from 14.3.5 Bonus
// Object.entries(frequencyCounts).forEach(([key, value]) => {
//     var li = output.append("li").text(`${key}: ${value}`);
//   });