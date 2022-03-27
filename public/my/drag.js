const KEYPATH = "application/my-app"

function dragstart(ev) {
  const element = ev.target
  if (!element.getAttribute("draggable")) return

  ev.dataTransfer.effectAllowed = "copyLink";

  const domHTML = element.querySelector('noscript')?.innerHTML

  console.log(element.getElementsByTagName('noscript')[0])

  if (!domHTML) {
    console.error('failed to get proper html')
    return
  }

  ev.dataTransfer.setData(KEYPATH, domHTML);
  
}

function dragstart_handler(ev) {
  ev.dataTransfer.setData("application/my-app", ev.target.id);
  ev.dataTransfer.effectAllowed = "copyLink";
}
function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "copyLink"
}
function drop_handler(ev) {
  ev.preventDefault();

  const container = ev.target
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData(KEYPATH);

  container.insertAdjacentHTML('beforeend', data)
}

window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('dragstart', dragstart)
})
