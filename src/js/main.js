document.addEventListener("DOMContentLoaded",()=>{

    document.querySelectorAll('code').forEach(el => {
        let texts = el.innerText.split(" ");
        let tag = document.createElement('span');
        tag.innerText = texts[0];

        let rest = texts.slice(1);
        let elems = rest.map(el => {
            let [attr,val] = el.split("=");
            let elAttr = document.createElement('span');
            elAttr.classList.add('attr');
            elAttr.innerText = " " + attr;
            let elAll = document.createElement('span');
            elAll.appendChild(elAttr);

            if(val !== undefined) {

                let elEq = document.createElement('span');
                elEq.innerText = '=';
                let elVal = document.createElement('span');
                elVal.classList.add('val');
                elVal.innerText = val;
                elAll.appendChild(elEq);
                elAll.appendChild(elVal);
            } else {
                elAttr.classList.add('single-attr');
            }

            return elAll;
        })
        console.log(elems);
        el.innerText = '';
        el.appendChild(tag);
        elems.forEach(it => {
            el.appendChild(it);
        })

    })

    const lifecycle = document.querySelector(".lifecycle");

    lifecycle.addEventListener('click', event => {
        const processExit = document.querySelector(".exitPros");
        processExit.style.display = 'block';
    });

});


