// khoi tao cac thong so
let btn1 = document.querySelector('#btn1');
let img1 = document.querySelector('#call');
let btn2 = document.querySelector('#btn2');
// functions nut bam
// const database=firebase.database();
// const deviceRef=database.ref('quan1');

btn1.addEventListener('click', ()=>{
    img1.src = 'image/voibat.png'; 
    firebase.database().ref("thietbi4").set({voi: 1})
})
btn2.addEventListener('click', ()=>{
    img1.src = 'image/voitat.png';
    firebase.database().ref("thietbi4").set({voi: 0})
})


// khoi tao cac thong so
let btn3 = document.querySelector('#btn3');
let img2 = document.querySelector('#led');
let btn4 = document.querySelector('#btn4');
// functions nut bam
btn3.addEventListener('click', ()=>{
    img2.src = 'image/quatbat.gif'; 
    firebase.database().ref("thietbi5").set({fan:1})
})

btn4.addEventListener('click', ()=>{
    img2.src = 'image/quattat.png';
    firebase.database().ref("thietbi5").set({fan:0})
})



// khoi tao cac thong s
let btn5 = document.querySelector('#btn5');
let img3 = document.querySelector('#loa');
let btn6 = document.querySelector('#btn6');

// functions nut bam
btn5.addEventListener('click', ()=>{
     img3.src = 'image/denon.gif' ;
     firebase.database().ref("thietbi2").set({den1:1})

})
btn6.addEventListener('click', ()=>{
    img3.src = 'image/den.jpg';
    firebase.database().ref("thietbi2").set({den1: 0})

})
