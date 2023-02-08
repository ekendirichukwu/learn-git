window.addEventListener("DOMContentLoaded",() =>{
    const stepper = new SlidingStepper(".stepper",{
        step: 1,
        min: -9,
        value: 0,
        max: 99
    });
});
class SlidingStepper {
    constructor(qs, args){
        const{ step, min, value, max} = args;
        this.el = document.querySelector(qs);
        this.step = step !== undefined ? step : 1;
        this.min = min !== undefined ? min : -9;
        this.value = value !== undefined ? value : 0;
        this.max = max !== undefined ? max : 99;
        this.valuePos = 0;
        this.values = [];
        this.posData= ["off-left", "prev", "cur", "next", "off-right"];
        this.init();
        this.changeValue();
        if (this.el){
            this.el.addEventListener("click", this.changeValue.bind(this));

            this.el.addEventListener("keydown", this.changeValue.bind(this));
        }
    }
    init(){
        if(this.step < 1 || isNaN(this.step))
        this.step = 1;
        // handle a value being outside the bounds
        if(this.value < this.min)
        this.value = this.min;
        else if(this.value > this.max)
        this.value = this.max;
        // ensure min is less than max, or make it same as max
        if(this.min > this.max)
        this.min = this.max;
        // load values before initial
        for (let l = this.value; l >= this.min; l -= this.step)
        this.values.unshift(l);
        this.values.unshift(this.min);
        // then those after it
        for(let r = this.value; r <= this.max; r += this.step)
        this.values.push(r);
        this.values.push(this.max);
        //kill the dupes
        this.values = [...new Set(this.values)];
        //initil value
        this.valuePos = this.values.indexOf(this.value);
    }
    changeValue(e){
        let dir = null;
        if (e) {const {key, target} = e;
        if (key) {if(key === "ArrowUp" || key === "ArrowRight")
        dir = "up";}
        else if (key ==="ArrowDown" || key === "ArrowLeft")
        dir = "down";}
        else {dir = target.getAttribute("data-dir");}
        }}
