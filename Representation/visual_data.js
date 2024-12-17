

let add = document.getElementById("starter");
add.addEventListener("click", starter);

let clearer = document.getElementById("clear");
clearer.addEventListener("click", clear_input);

// let export_btn = document.getElementById("export");
// export_btn.addEventListener("click", exporter);

let ul = document.querySelector(".box");

const structureSelect = document.getElementById("structure");



//clears on change
structureSelect.addEventListener("change", function() {
  let the_input = document.getElementById("array");  
  if(structureSelect.value === "array"){
      the_input.value = "10,20,30,40,50" 
  }
  else if(structureSelect.value === "linked"){
      the_input.value = "10->20->30->40->50" 
  }
  else if(structureSelect.value === "binarytree"){
    the_input.value = "";
    console.log("test")
    // du er kommet hertil
    const fragment = new DocumentFragment();
    for(let i = 0; i < 2; i++){
      const btn = document.createElement("button");
      btn.className = "binary_button";
      btn.textContent = "Test";
      fragment.append(btn);

      ul.append(fragment);
    }
    
  }
});

//calls the right function for the selected value
function starter(){
        const selectElement = document.getElementById("structure"); //vælger af dropdown
        const selectedValue = selectElement.value; //også vælger

        if (selectedValue === "array") {
            selected_array();
        }
        else if(selectedValue ==="linked"){
            linked_lists()
        }
        else if(selectedValue ==="binarytree"){
          binarytree()
      }


      }

//array creator
function selected_array() {
  let array = document.getElementById("array").value; //
  
  let items = array.split(",").map((item) => Number(item)); //laver antal items i arrayet med .map
  let antal = items.length;

  // clear existing balls
  ul.innerHTML = "";
  const fragment = new DocumentFragment();
  for (let i = 0; i < antal; i++) {
    const li = document.createElement("div");
    li.id = "r" + 1;
    li.className = "array";
    li.textContent = items[i];
    fragment.append(li);
  }
  
  ul.append(fragment);
}

function clear_input() {
  ul.innerHTML = "";
}

function linked_lists() {
  let array = document.getElementById("array").value;
  let items = array.split("->").map((item) => Number(item));
  let antal = items.length;

  // clear existing balls
  ul.innerHTML = "";

  const fragment = new DocumentFragment();
  for (let i = 0; i < antal; i++) {
    const li = document.createElement("div");
    li.id = "r" + 1;
    li.className = "array";
    li.textContent = items[i];
    fragment.append(li);

    // create a div element with "next" and an arrow
    if (i < antal - 1) {
      //create the next box
      const next = document.createElement("div");
      next.className = "array";
      next.textContent = "next";
      fragment.append(next);

      const arrow = document.createElement("div");
      arrow.id = "arrow"
      arrow.textContent = "-->";
      fragment.append(arrow);
    }
    
  }

  // add "next" after the last item
  const next = document.createElement("div");
  next.className = "array";
  next.textContent = "next";
  fragment.append(next);

  const arrow = document.createElement("div");
  arrow.id = "arrow"
  arrow.textContent = "-->";
  fragment.append(arrow);


  // add "end" 
  const slut = document.createElement("div");
  slut.className = "array";
  slut.textContent = "end";
  fragment.append(slut);

  ul.append(fragment);

  
  // Create parent div
const parentDiv = document.createElement('div');

// Create child divs
const childDiv1 = document.createElement('div');
const childDiv2 = document.createElement('div');

// Append child divs to parent div
parentDiv.appendChild(childDiv1);
parentDiv.appendChild(childDiv2);

// Add parent div to document
document.body.appendChild(parentDiv);
}

function binarytree(){
    console.log("yes");

}




starter()




//virker ikke helt 
function exporter(){
  
    const docDefinition = {
      content: [{
        layout: {
          paddingTop: function(i, node) { return i === 0 ? 0 : 10; },
          paddingBottom: function(i, node) { return 10; },
          hLineWidth: function(i, node) { return 0; },
          vLineWidth: function(i, node) { return 0; },
        },
        table: {
          headerRows: 0,
          widths: ['*'],
          body: []
        }
      }]
    };
  
    // get the HTML element to export
    const elements = document.querySelectorAll(".balls");
  
    // add each element to the PDF document
    elements.forEach(function(element) {
      docDefinition.content[0].table.body.push([{
        text: element.textContent,
        fontSize: 16,
        alignment: 'center'
      }]);
    });
  
    // generate the PDF
    pdfMake.createPdf(docDefinition).download('document.pdf');
  
 

  
}





function exporter() {
  const balls = ul.querySelectorAll(".balls");
  const ballValues = Array.from(balls).map((ball) => ball.textContent);
  const ballString = ballValues.join(",");

  const newWindow = window.open();
  newWindow.document.write(`
    <html>
      <head>
        <style>
          /* Add your CSS rules here */
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }

          .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #F9F9F9;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            height: 70px;
            padding: 0 20px;
            width: 100%;
          }
          
          .nav ul {
            display: flex;
            list-style: none;
            margin: 0 15px;
            padding: 0;
          }
          
          .nav li {
            margin: 0 20px;
          }
          
          .nav a {
            color: #333;
            text-decoration: none;
            font-size: 18px;
            font-weight: 500;
            transition: color 0.3s;
            margin-right: 20px;
          }
          
          .nav a:hover {
            color: #666;
          }
          
          .box {
            display: flex;
            flex-wrap: wrap;
            margin: 20px;
          }

          .balls {
            margin: 2px;
            height: 100px;
            width: 100px;
            background-color: white;
            border-style: solid;
            border-color: black;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Array:</h1>
        <div class="box">
          ${ul.innerHTML}
        </div>
        
      </body>
    </html>
  `);
  newWindow.document.close();
}

