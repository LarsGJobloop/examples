const personList = [
  { name: "Lars", gender: "male", age: 34 },
  { name: "Julie", gender: "female", age: 25 },
  { name: "Gregory", gender: "male", age: 42 },
  { name: "Yvonne", gender: "female", age: 18 },
  { name: "Kim", gender: "female", age: 27 },
]

const numbersList = [ 1, 143, 2, 234, 32, 4443, 957, 7816 ]

const originalList = [
  "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈"
]

const modifiedList = [
  { name: "Lars", gender: "male", age: 34 },
  { name: "Julie", gender: "female", age: 25 },
  { name: "Gregory", gender: "male", age: 42 },
  { name: "Yvonne", gender: "female", age: 18 },
  { name: "Kim", gender: "female", age: 27 },
  { name: "Simon", gender: "mage", age: 207 },
]
  .sort((personA, personB) => personA.age - personB.age)
  .map((person, index) => {
    return `${person.name} is a ${person.gender} of age ${person.age} ${originalList[index % originalList.length]}`
  })








renderList(originalList, document.getElementById("original-list"))
renderList(modifiedList, document.getElementById("modified-list"))

/**
 * Takes a list of strings and generates a new <li> element with
 * the string as content before inserting all elements into the
 * provided root element
 * 
 * @param {string[] | Object[]} list strings to render as <li> elements
 * @param {HTMLUListElement} root element to insert list into
 */
function renderList(list, root) {
  // Create an element for each smiley
  const elementList = list.map(item =>  {
    const node = document.createElement("li")

    switch (typeof item) {
      case "string":
        node.textContent = item
        node.className = "big"
        break;
      
      case "number":
        node.textContent = item
        node.className = ""
        break;
    
      default:
        node.textContent = JSON.stringify(item)
        node.className = "small"
        break;
    }

    return node
  })
  
  // Append to DOM
  // instead of modifying the DOM once for each element
  // we create a temporary node (fragement) which we modify
  // and then we append everything at once
  const fragment = document.createDocumentFragment()
  elementList.forEach(element => fragment.appendChild(element))
  root.appendChild(fragment)
}