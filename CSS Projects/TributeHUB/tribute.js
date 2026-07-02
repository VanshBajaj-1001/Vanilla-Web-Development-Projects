const tributeBtn=document.getElementById("tribute-btn");
const tributeCount=document.getElementById("tribute-count");
const person=document.body.dataset.person;
let count=localStorage.getItem(person);
if(count=== null){
    count=0;
} else {
    count=Number(count);
}
tributeCount.textContent=count;
tributeBtn.addEventListener("click", () => {
    count++;
    tributeCount.textContent=count;
    localStorage.setItem(person,count);
    confetti({
        particleCount: 45,
        spread: 60,

        origin: {
            y: 0.8
        },

        colors: [
            "#facc15",
            "#fde68a",
            "#fef3c7"
        ]
    });
});