function darkMode() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}
let themebutton = document.querySelector("button");
themebutton.addEventListener("click", darkMode);
