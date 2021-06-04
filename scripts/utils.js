


function backButton(pathToBack){
  document.getElementById("back-btn").addEventListener("click", () => {
    console.log(pathToBack);
  });
}

module.exports = {
  backButton
};
