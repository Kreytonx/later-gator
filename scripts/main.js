//  take a look at the expected behavior for Part 1 here: https://youtu.be/WH2TbnkirpQ
//
// assume you have access to 2 provided functions:
// 1. later(targetQuery, callback) finds a valediction that is appropriate for a targetQuery.
//    targetQuery: to whom you'd like to offer an appropriate valediction (https://en.wikipedia.org/wiki/Valediction)
//                  (if it is a substring of a known target, the corresponding valediction will be provided,
//                   otherwise a random one will be selected)
//    callback: function that you want later to call with the valediction result when it's ready.
//              this function will be called with the following argument:
//        result: an object with the keys:
//            target: to whom the result is intended to go
//            valediction: what to say to the target
// 2. options(callback, query) finds all known valediction targets or those that include the substring specified in query, if it's provided.
//    callback: function that you want options to call with the known valediction targets, when they're ready.
//              this function will be called with the following argument:
//        keys: an array of known valediction targets
//    query: a constraint on which valediction targets to include. Only those of which query is a substring will be included.

// get refs to the input and output elements in the page
const input = document.getElementById("target");
const output = document.querySelector("output");
const list = document.getElementById("available-targets");

// when the input has focus and enter is pressed, invoke the function named later
// input.addEventListener("keydown", (ev) => {
//   console.debug("keydown", ev.key);
//   if (ev.key === "Enter") {
//     console.log("Enter detected. current value:", input.value);
//     // TODO use the provided later() function here
//     later(input.value, setOutput)
//   }
// });

input.addEventListener("keydown", (ev) => {
  if(ev.key === "Enter"){
    console.log("Enter detected. Current input value:", input.value);

    //clears the existing list to avoid duplicate entries
    list.innerHTML = '';

    const query = input.value;

    //retrieves all targets and filter manually
    options((targets) => {
      console.log("Matching targets based on query:", targets);

      // If there are no matching targets, get a random valediction
      if(targets.length === 0){
        later(query, (result) => {
          //creates a button with the random valediction as text
          const listItem = document.createElement("li");
          const button = document.createElement("button");
          button.textContent = result.valediction;

          //when the button is clicked, update the output with the random valediction
          button.addEventListener("click", () => {
            setOutput(result);
          });

          listItem.appendChild(button);
          list.appendChild(listItem);
        });
      }
      //else there is an input
      else{
        addOptions(targets);
      }
    }, query);
  }
});

//adds each option as a button in a list item
const addOptions = (targets) => {
  console.log("addOptions called with targets:", targets);

  targets.forEach(target => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = target;

    // When the button is clicked, request the valediction with later()
    button.addEventListener("click", () => {
      console.log("Button clicked for target:", target);
      later(target, setOutput);
    });

    listItem.appendChild(button);
    list.appendChild(listItem);
  });
};

// when you have the result from this function, update(replace) the content of the output element with the result formatted as:
// "RESULT, TARGET" // where the all caps are placeholders for the corresponding values
// example:
// if the result of invoking later() with a target of "alligator"
// is "see you later", the output element should be updated to read:
// see you later, alligator

//
const setOutput = (result) => {
  console.log("setOutput", result);
  // TODO see comments just above 🙄
  output.textContent = `${result.valediction}, ${result.target}`;
};

// for Part 2
// change the code so that rather than directly requesting a valediction with the user's input,
// the page instead queries for matching targets using the provided option() function 
// (if the user hasn't entered anything, simply exclude the query argument in your invocation to options).
// add each of the resulting target options as buttons in list items in the ul.
// when any of these buttons are clicked, user the later() function to request the corresponding valediction and update the output element as in Part 1
