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
        day = data[i].Day;
    
        //Name all-artist col-2, artist List
        artistList = document.getElementById("artistList");


        //create tab-buttons
        buttonItem = document.createElement("Button");
        buttonItem.classList.add("btn", "filterDiv", "show", day);
        buttonItem.appendChild(artist);
        //add button to artist list
        artistList.appendChild(buttonItem);

        //Create button functions for each tab-button (artist)
        var len = artistList.children.length;
        for (var j = 0; j < len; j++) {
            (function(index){
                artistList.children[j].onclick = function() {
                    document.getElementById('artistName').innerHTML = data[index].Artist;
                    document.getElementById('fieldDay').innerHTML = data[index].Day;
                }
            })(j);
        }
    }
}

//Filter search results
function filterSearch() {
    var btnlist, input;
    input = document.getElementById("search").value;
    // this is about where I lose confidence...
    btnlist = document.getElementsByClassName("filterDiv");
    for (i = 0; i < btnlist.length; i++) {
       if (btnlist[i].innerHTML.includes(input))
       w3AddClass(btnlist[i], "show");
       else w3RemoveClass(btnlist[i], "show");
    }
 }

// Enter = search
function enterSearch() {
    input = document.getElementById("search");
    input.addEventListener('keyup', function(event){
        if (event.code === 'Enter') {
            filterSearch();
        }
    })
}

//W3 Filter functions
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}