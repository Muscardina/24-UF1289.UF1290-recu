function getPersonInfo(callback) {
  const personId = document.getElementById("person-id").value;
  const personInfoDiv = document.getElementById("person-info");
  const errorDiv = document.getElementById("error");

  // Validar que el campo no esté vacío
  if (!personId) {
    errorDiv.textContent = "Please enter a Person ID.";
    personInfoDiv.style.display = "none";
    return;
  }

  fetch(`/person/${personId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        errorDiv.textContent = data.error;
        personInfoDiv.style.display = "none";
      } else {
        callback(data);
        personInfoDiv.style.display = "block";
        errorDiv.textContent = "";
      }
    })
    .catch((err) => {
      console.error(err);
      errorDiv.textContent = "Error fetching person data<br>" + err.msg;
      personInfoDiv.style.display = "none";
    });
}

function getStudentInfo() {
  function callback(data) {
  	document.getElementById("person-info").classList.add("student-info")
    document.getElementById("person-name").textContent = data.name;
    document.getElementById("person-score").textContent = data.score;
    document.getElementById("person-role").textContent = data.role;
  }

  getPersonInfo(callback);
}

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  var elemm = document.getElementById("btn-search");
  elemm.onclick = getStudentInfo;
});
