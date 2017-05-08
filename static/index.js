var submit = document.querySelector(".submit-btn");

submit.addEventListener('click', function(e) {
  var full_url = document.querySelector("input").value;
  full_url = full_url.split(' ').join('');
  if(full_url === '') {
    return displayError();
  }
  submit.disabled=true;
  submit.classList.toggle("disabled");

  document.querySelector(".copy").classList.toggle("hidden");
  document.querySelector(".link-container").classList.toggle("hidden");

  var data = new FormData();  
  data.append("full_url", `${full_url}`);  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      displayLink(this.responseText);
    }
  });

  xhr.open("POST", "/");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);    
});

function displayLink(short_id) {
  let link = `https://linkss.tk/${short_id}`;
  let el = document.querySelector('.link-container');
  submit.classList.toggle("disabled");
  el.value = link;
  submit.disabled=false;
  document.querySelector(".copy").classList.remove("hidden");
  document.querySelector(".link-container").classList.remove("hidden");  
}

function displayError() {
  // let tooltip = document.querySelector(".tooltiptext");
  // tooltip.innerHTML = "This is not a valid url";
  // tooltip.style.visibility = 'visible';
  alert("Please enter a valid URL");
}

let copy = document.querySelector(".copy");
copy.addEventListener('click', function(e) {
  var link = document.getElementById('link')
  link.focus();
  document.execCommand('SelectAll');
  document.execCommand("Copy", false, null);
})