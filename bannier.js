addEventListener('DOMContentLoaded', () => {
    const bannier = document.querySelector(".hautdelapage");
    const img = document.querySelector('.ons');
    const mesure = img.width;

        setInterval(() =>{
            if (bannier.scrollLeft + mesure >= bannier.scrollWidth) {
                    bannier.scrollLeft = 0;
            } else {
                bannier.scrollLeft += mesure;
            }

        }, 5000);
});