let log = console.log;
// ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰  Loader   ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
const loader = document.querySelector('.loader')


window.addEventListener('DOMContentLoaded', () => {
    loader.classList.add('close')
    setTimeout(() => loader.style.display = "none",1000)
})

// ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰  Header  & click to scroll   ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
const navIcon = document.querySelector('.nav__icon');
const headerContainer = document.querySelector('.header__container');
const navUl = document.querySelector('.nav__ul');
const links = [...document.querySelectorAll('.nav__ul a')];
const header = document.querySelector('header')
let h = header.clientHeight + 32;



navIcon.addEventListener('click', () => { 
    headerContainer.classList.toggle('border_radius');
    navIcon.classList.toggle('close');
    navUl.classList.toggle('show');
})

links[0].classList.add('active')
links.forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        links.forEach(el => el.classList.remove('active'));
        a.classList.add('active');

        headerContainer.classList.remove('border_radius');
        navIcon.classList.remove('close');
        navUl.classList.remove('show');

        let sec = sections.find(s => s.id == a.dataset.scroll );
        window.scrollTo({
            top: sec.offsetTop - h,
            behavior: 'smooth'
        })
    })
})
// ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰  Links sync  ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
const sections = [...document.querySelectorAll('[data-sec]')];


window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let id = sec.getAttribute('id');

        if (scrollY >= sec.offsetTop - h) {
            let a = links.find(el => el.dataset.scroll == id );
            links.forEach(el => el.classList.remove('active'));
            a.classList.add('active')
        }
    })
})
// ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰  stats   ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
const stats = document.getElementById('stats');
const strong = document.querySelectorAll('.stats__num strong');
let start = true;


window.addEventListener('scroll', () => {
    if (scrollY >= stats.offsetTop - 500) {
        if (start) {
            strong.forEach(s => {
                let num = s.dataset.num;
                    let go = setInterval(() => {
                    s.innerHTML++;
                    if (s.innerHTML == num ) clearInterval(go);
                }, (1500 / num) )
            })
        }

        start = false
    }
})
// ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰  Content reveal   ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
let option = {
    threshold: '.3',
    rootMargin: '0px'
}

let obs = new IntersectionObserver(watch , option)

function watch(entries) { entries.forEach(el => { if (el.isIntersecting) el.target.classList.add('spotted') }) }
document.querySelectorAll('.spot').forEach(el => obs.observe(el));




