let Field = document.querySelector('.Field')
let pallete = document.querySelector('.pallete')
document.addEventListener('mousedown', function(){
    IS_CLICKED = true;
});
document.addEventListener('mouseup', function(){
    IS_CLICKED = false;
});
for (let i = 0; i < 450; i += 1) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    Field.appendChild(cell)
}
var IS_CLICKED = false
var CURRENT_COLOR = "blue";
var DEFAULT_COLOR = "rgb(49, 45, 45)";
var COLOR_MAP = {
    "color1": "rgb(0, 0, 255)",
    "color2": "rgb(0, 128 ,0)",
    "color3": "rgb(255, 17, 136)",
    "color4": "rgb(255 255, 255)",
    "color5": "rgb(255, 255, 0)",
    "color6": "rgb(173, 255, 47)",
    "color7": "rgb(72, 209, 204)",
    "color8": "rgb(139, 69, 19)",
    "eraser": "rgb(49, 45, 45)"
};
let cells = document.querySelectorAll('.cell')
for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    cell.addEventListener('click', function(){
        cell.style.backgroundColor = CURRENT_COLOR;
    })
    cell.addEventListener('mouseover', function(){
        if (IS_CLICKED) {
            cell.style.backgroundColor = CURRENT_COLOR;
        }
    })
    cell.addEventListener('mousedown', function(){
        cell.style.backgroundColor = CURRENT_COLOR;
    })
}
let colorcells = document.querySelectorAll(".colorcell")
for (let i = 0; i < colorcells.length; i++) {
    let colorcell = colorcells[i];
    colorcell.addEventListener('click', function(){
        let colorClass = "";
        if (colorcell.classList.contains("color1")) colorClass = "color1";
        else if (colorcell.classList.contains("color2")) colorClass = "color2";
        else if (colorcell.classList.contains("color3")) colorClass = "color3";
        else if (colorcell.classList.contains("color4")) colorClass = "color4";
        else if (colorcell.classList.contains("color5")) colorClass = "color5";
        else if (colorcell.classList.contains("color6")) colorClass = "color6";
        else if (colorcell.classList.contains("color7")) colorClass = "color7";
        else if (colorcell.classList.contains("color8")) colorClass = "color8";
        else if (colorcell.classList.contains("eraser")) colorClass = "eraser";
        CURRENT_COLOR = COLOR_MAP[colorClass];
        document.querySelector(".selected").classList.remove('selected')
        colorcell.classList.add('selected')
    })
}

setInterval(function(){
    let result = " ";
    let temp_cells = document.querySelectorAll(".cell");
    for (let i = 0; i < temp_cells.length; i +=1) {
        let cell = temp_cells[i];
        let color = cell.style.backgroundColor;
        let colorIndex = "0";
        for (let j = 0; j <COLOR_MAP.length;j++) {
            if (color === COLOR_MAP[j]) {
                colorIndex = j.toString();
                break;
            }
        }
        result += colorIndex;
    }
    document.cookie = `pixel-result=${result};max-age=100000`;
}, 60);

function get_result() {
    let cookies = document.cookie.split("; ")
    for (let i = 0;i < cookies.length; i +=1) {
        let cookie = cookies[i].split("=")
        console.log(cookie)
        if (cookie[0] == "pixel-result") {
            return cookie[1]
        }
    }
    return "0" * 450
}
let temp_result = get_result()
if (temp_result != "0") {
    for (let i = 0;i < 450;i+=1) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.setAttribute("id", `${i}`)
        cell.style.backgroundColor = COLOR_MAP[parseInt(temp_result[i])]
        Field.appendChild(cell)
    }
 }
