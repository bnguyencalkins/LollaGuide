/* Set up link */
const dataLink = 'https://docs.google.com/spreadsheets/d/1dfWeBhbqIZb6kOXyFcBKV-mjGUJvK3gufpNiWUOTySQ/export?format=csv&grid=0';

/* Papa Parser */
const csvData = Papa.parse(dataLink, {
    download: true,
    header: true,
    skipEmptyLines: 'greedy',
    delimiter: "",
    newline: "",
    qouteChar: '"',
    escapeChar: '"',
    complete: function(result) {
        console.log("finished:", result.data);
        result.data.filter(f => {
            return f.approved === 'TRUE';
        });
        var data = result.data;
        displayResults(data);
    }
});

// Function to display results

//For artist filter, testing?
function displayResults(data) {
    for (i = 0; i < data.length; i++) {
        artist = document.createTextNode(data[i].Artist);
    
        //Name all-artist col-2, artist List
        artistList = document.getElementById("artistList");


        //create tab-buttons
        buttonItem = document.createElement("Button");
        buttonItem.classList.add("btn");
        buttonItem.appendChild(artist);

        artistList.appendChild(buttonItem);

        //Create button functions for each tab-button (artist)
        for (j = 0; j < artistList.children.Length; j++) {
            (function(index){
                artistList.children[j].onclick = function(){
                  document.getElementById("artistName").innerHTML(data[index].Artist);
                }
              })(j);
        }
    }
}