const color=[]
const basic_color=["cyan", "magenta", "yellow", "black", "red", "green", "blue", "orange", "brown"]

function index_active(el, index, name){
    // console.log(el.eq(index));
    el.removeClass(name);
    el.eq(index).addClass(name);
};