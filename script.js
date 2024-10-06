document.addEventListener('DOMContentLoaded', () =>{
    if(window.innerWidth >= 951) {
        const bannierstyle = document.querySelector('.hautdelapage');
        const ban = document.createElement('div');
        ban.className = 'banprem';
        bannierstyle.parentNode.insertBefore(ban, bannierstyle);
        ban.appendChild(bannierstyle);
    }
});