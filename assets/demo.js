const aa = document.getElementById('left');
    // const hasClicked = new Set();
    let hasClickedbool = 0;
    aa.addEventListener('click',(e)=>{
        const bb = document.getElementById('right');
        const cc = document.getElementById('right'+e.target.value);
        // hasClicked.add(cc);
        cc.firstElementChild.setAttribute('disabled',true)
        cc.setAttribute('disabled',true);
        if(hasClickedbool>=1){
            window.location.reload();
        }
        hasClickedbool+=1;
    });