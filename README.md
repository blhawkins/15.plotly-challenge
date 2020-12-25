# Navel Flora
### Belly Button Biodiversity 🦠🔬


# Main Contents:
    app.js
    index.html
    samples.json

# Tools Used:
    Javascript
    Plotly.js
    D3.js
    HTML

# Description:

The purpose of this project is to develop a Javascript program, ([app.js](https://github.com/blhawkins/NavelFlora/blob/main/Javascript/app.js)) that explores the various visualizations that can be formed with the Plotly.js library. The program is supported by an HTML template ([index.html](https://github.com/blhawkins/NavelFlora/blob/main/index.html)) and the Belly Button Biodiversity dataset ([samples.json](https://github.com/blhawkins/NavelFlora/blob/main/Data/samples.json)). The resultant webpage is deployed [here](https://blhawkins.github.io/NavelFlora/).

### [App.js](https://github.com/blhawkins/NavelFlora/blob/main/Javascript/app.js)
Components of the app.js file include:
1. Creation of a function that, upon start-up, populates the dropdown menu with all of the available datasets (Patient IDs). This function also uses a random number generator to initialize the webpage's graphics using data cooresponding to a random patient.
2. Creation of a function that produces the following graphics:
    <ul>
    <li>A bar chart that displays the names and relative frequencies of the top ten OTUs (operational taxonomic units) found on the selected patient's belly button.</li>
    <li>A bubble chart that displays the diversity and the relative frequencies of the OTUs found on the selected patient.</li>
    <li>A table that displays pertinent demographic information about the selected patient.</li>
    <li>A gauge chart that visualizes the frequency with which the selected patient washes their belly button.</li>
    </ul>
3. Creation of a function that allows the visualizations to be updated according to the dataset selected through the dropdown menu.
    

#### Screen Captures:
![alt text](https://github.com/blhawkins/NavelFlora/blob/main/Screenshots/Screen_capture1.png 'Screenshot 1 [Top of webpage]')
![alt text](https://github.com/blhawkins/NavelFlora/blob/main/Screenshots/Screen_capture2.png 'Screenshot 2')
