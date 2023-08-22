
function docReady(callback) {
    // in case the document is already rendered
    if (document.readyState != 'loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function () {
        if (document.readyState == 'complete') callback();
    });
}

function armSelect() {
    var selects = document.querySelectorAll("[arm-select]");
    if (selects == null || selects == undefined || selects.length <= 0) return;

    for (let select of selects) {
        if(select.id != '' && select.id != null && select.id != null) searchableSelect(select);
    }
}

function searchableSelect(select) {
    if (select == null || select == undefined) return;

    select.insertAdjacentElement("beforebegin", getSearchInput(select));
    select.addEventListener("change", (event) => { return optionSelected(event); });
}

function getSearchInput(select) {
    select.classList.add("position-absolute");
    select.classList.add("d-none"); 
    select.classList.add("mt-2");
    select.setAttribute("style", "width:inherit;");

    var input = document.createElement('input');
    input.id = select.id + "-search-input";
    input.setAttribute("arm-select-input", select.id);
    input.type = "text";
    input.classList.add("form-select");
    input.autocomplete = "off";
    input.value = getSelectedText(select.id);

    input.addEventListener("focus", (event) => { return focusInput(event); })
    input.addEventListener("keyup", (event) => { return armSelectSearch(event); })

    return input;
}


function armSelectSearch(event) {
    var input = event.target;
    if (input == null || input == undefined) return;

    var select = document.getElementById(input.getAttribute("arm-select-input"));
    if (select == null || select == undefined) return;

    for (let option of select.options) {
        if (!option.text.toLowerCase().includes(input.value.toLowerCase())) {
            option.classList.add("d-none");
        } else {
            option.classList.remove("d-none");
        }
    }
}

function focusInput(event) {
    document.getElementsByTagName("html")[0].click();

    var input = event.target;
    if (input == null || input == undefined) return;
    //select.classList.remove("z-2");
    //select.classList.add("z-1");
    input.select();
    setTimeout(() => { input.focus(); }, 1);

    var select = document.getElementById(input.getAttribute("arm-select-input"));
    if (select == null || select == undefined) return;



    //input.classList.remove("z-1");
    //input.classList.add("z-2");
    select.classList.remove("d-none");
    select.setAttribute("multiple", "multiple");

    //document.getElementById('foo').getBoundingClientRect();
    //document.getElementById('foo').offsetWidth;

    
}
function getSelectedText(selectElementId) {
    const selectElement = document.getElementById(selectElementId);
    if (selectElement == undefined || selectElement == null) return -1;

    var selectedText = selectElement.options[selectElement.selectedIndex].text;
    if (selectedText == undefined || selectedText == "") return -1;

    return selectedText;
}   

function optionSelected(event) {
    var select = event.target;
    if (select == null || select == undefined) return;

    var input = document.getElementById(select.id + "-search-input");
    if (input == null || input == undefined) return;
    input.value = getSelectedText(select.id);

    select.classList.add("d-none");
    select.removeAttribute("multiple");
}

function blurInput(event) {
    var input = event.target;
    if (input == null || input == undefined) return;

    //input.classList.remove("z-2");
    //input.classList.add("z-1");



    var select = document.getElementById(input.getAttribute("arm-select-input"))
    if (select == null || select == undefined) return;

    //select.classList.remove("z-1");
    //select.classList.add("z-2");
    //select.classList.remove("mt-2");

    select.classList.add("d-none");
    select.removeAttribute("multiple");
}

document.getElementsByTagName("html")[0].addEventListener("click", (event) => {

    const isArmSelect = event.target.hasAttribute("arm-select-input");
    if (isArmSelect) {
        const selectId = event.target.getAttribute("arm-select-input");
        const select = document.getElementById(selectId);
        if (select != null && select != undefined && !select.classList.contains("d-none")) {
            return;
        }
    }

    var selects = document.querySelectorAll("[arm-select]");
    if (selects == null || selects == undefined || selects.length <= 0) return;

    for (let select of selects) {

        select.classList.add("d-none");
        select.removeAttribute("multiple");

    }

});