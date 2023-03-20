export function cycleWords() {
  let text = document.getElementById("am-a-text-word");
  let words = ["Developer",
    "Thinker",
    "Self-Starter",
    "Programmer",
    "Designer",
    "Coder",
  ];

  textSequence(0);
  function textSequence(i) {

    if (words.length > i) {
      setTimeout(function () {
        text.innerHTML = words[i];
        textSequence(++i);
      }, 1500); // 1.5 second (in milliseconds)

    } else if (words.length == i) { // Loop
      textSequence(0);
    }
  }
};