addEventListener('DOMContentLoaded', () => {
    const bannier = document.querySelector(".hautdelapage");
    const mesure = window.innerWidth;

        setInterval(() =>{
            if (bannier.scrollLeft + mesure >= bannier.scrollWidth) {
                    bannier.scrollLeft = 0;
            } else {
                bannier.scrollLeft += mesure;
            }

        }, 5000);
});