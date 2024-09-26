// const nasilisi = document.querySelector('.numbers');
document.addEventListener("DOMContentLoaded", function() {

    // let nayebité = localStorage.getItem('text');
    // nasilisi.textContent = nayebité;

    const navbar = document.getElementById('navbar');

    if(navbar) {
        const sideresearch = document.createElement("div")
        sideresearch.className = "boxresearch";
        navbar.appendChild(sideresearch);
        const check = document.createElement("input");
        check.className = "trop";
        check.type = "checkbox";
        check.id = "view";
        sideresearch.appendChild(check);
        const sign = document.createElement("label");
        sign.htmlFor = "view";
        sign.id = "quoi";
        sideresearch.appendChild(sign);
        const glass = document.createElement("i");
        glass.className = "fa-solid fa-magnifying-glass";
        sign.appendChild(glass);
        const viewer = document.createElement("label");
        viewer.htmlFor="view";
        viewer.id="feur";
        sideresearch.appendChild(viewer);
        const quit = document.createElement("i");
        quit.className = "fa-solid fa-xmark";
        viewer.appendChild(quit);
        const search = document.createElement("div");
        search.className = "research";
        sideresearch.appendChild(search);
        const searchbar = document.createElement("input");
        searchbar.type = "search";
        searchbar.id = "input-box";
        search.appendChild(searchbar);
        const Vresearch = document.createElement("button");
        Vresearch.id = "onclick";
        Vresearch.appendChild(glass.cloneNode(true));
        search.appendChild(Vresearch);
        const truc = document.createElement("div");
        truc.className = "things";
        search.appendChild(truc);
        const name = document.createElement("div");
        name.className = "name";
        const logo = document.createElement("h1");
        logo.textContent = "BREAKTHEGLASS";
        name.appendChild(logo);
        navbar.appendChild(name);
        const sideoptions = document.createElement("div");
        sideoptions.className = "rightside";
        navbar.appendChild(sideoptions);
        const checker = document.createElement("input");
        checker.className = "trop";
        checker.type = "checkbox";
        checker.id = "see";
        sideoptions.appendChild(checker)
        const signer = document.createElement("label");
        signer.className = "oui";
        signer.htmlFor= "see";
        const bars = document.createElement("i");
        bars.className = "fa-solid fa-bars";
        signer.appendChild(bars);
        sideoptions.appendChild(signer);
        sideoptions.appendChild(checker.cloneNode(true));
        const unsigner = document.createElement("label");
        unsigner.className = "non";
        unsigner.htmlFor = "see";
        const croix = document.createElement("i");
        croix.className = "fa-solid fa-xmark";
        unsigner.appendChild(croix);
        sideoptions.appendChild(unsigner);
        const options = document.createElement("div");
        options.className = "options";
        const list = document.createElement("ul");
        list.className = "listoptions";
        const lielement = [
            {name:'PRINCIPAL', url:"index.html"},
            {name:'DE SOLEIL', url:"catalogue.html"},
            {name:'CONTACT', url:"#footer"},
            {name:'SETTINGS', url:"settings.html"},
        ];

        lielement.forEach(({name, url}) => {
            if(name) {
                const checker = document.getElementById("see");
                const opt = document.createElement("li");
                opt.textContent = name;
                opt.addEventListener('click', () =>{
                    checker.checked = false;
                setTimeout (() => {
                window.open(url, '_top');
                }, 300);
                });
                list.appendChild(opt);
            }
        });
        options.appendChild(list);
        sideoptions.appendChild(options);
    }

    let availableKeywords = [
        {value:'dark white', url: "again.html"},
        {value:'sky begin night', url:"again2.html"},
        {value:'uptown bleumarine', url:"again3.html"},
       {value:'uptown nature', url:"again4.html"},
       {value:'pink world', url:"again5.html"},
       {value:'playa begin world', url:"again6.html"},
       {value:'dark secret', url:"again7.html"},
       {value:'silver armor', url:"again8.html"},
       {value:'league of legends', url:"again11.html"},
       {value:'gaming esp white', url:"again12.html"},
       {value:'call of duty MW', url:"again13.html"},
       {value:'rainbow six siege', url:"again14.html"},
       {value:'starkIndustries', url:"again15.html"},
       {value:'gaming esp orange', url:"again16.html"},
    ];

    const resultBox = document.querySelector('.things');
    const inputBox = document.getElementById('input-box');
    const clickedBtn = document.getElementById('onclick');
    inputBox.onkeyup = function(){
        let result = [];
        let input = inputBox.value.trim();
        if(input.length > 0){
            result = availableKeywords.filter((item)=>{
               return item.value.toLowerCase().includes(input.toLowerCase());
            });
            console.log(result);
        }
        display(result);
    }

    function display(result){
        const content = result.map((item)=>{
            const regex = new RegExp(`(${inputBox.value})`, 'gi');
            const highlightedText = item.value.replace();
            return `<li data-url="${item.url}">${highlightedText}</li>`;
        }).join("");
        resultBox.innerHTML = "<ul class='list'>" + content + "</ul>";
        
        const items = resultBox.querySelectorAll('li');

            items.forEach(item => {
                item.addEventListener('click', function() {
                    const url = item.getAttribute('data-url');
                    window.open(url, '_top'); // Ouvre l'URL dans un nouvel onglet
                });
            });
    }

   clickedBtn.onclick = function() {
            let input = inputBox.value.trim();

            if (input.length > 0) {
                const match = availableKeywords.find(item => item.value.toLowerCase() === input.toLowerCase());

                if (match) {
                    window.open(match.url, '_top'); // Ouvre l'URL dans la même fenêtre si une correspondance exacte est trouvée
                } else {
                    alert('Aucun résultat exact trouvé. Essayez avec des mots clés disponibles.');
                }
            }
        }
});
