
$(document).ready(function () {

    // Mobile navigation
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');

        const isOpen = $('.navbar').hasClass('nav-toggle');
        $(this).attr('aria-expanded', isOpen);
    });

    // Scroll events and active navigation
    $(window).on('scroll load', function () {

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
        $('#menu').attr('aria-expanded', 'false');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Navigation scroll spy
        $('section[id]').each(function () {

            let height = $(this).outerHeight();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find('a[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // Smooth scrolling for internal links only
    $('a[href^="#"]').on('click', function (e) {

        const target = $(this).attr('href');

        if (target.length > 1 && $(target).length) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500, 'swing');

            $('.navbar').removeClass('nav-toggle');
            $('#menu').removeClass('fa-times');
            $('#menu').attr('aria-expanded', 'false');
        }
    });

    // EmailJS contact form
    $("#contact-form").submit(function (event) {

        event.preventDefault();

        emailjs.sendForm(
            'contact_service',
            'template_contact',
            '#contact-form'
        ).then(function (response) {

            console.log('SUCCESS!', response.status, response.text);

            document.getElementById("contact-form").reset();

            alert("Form Submitted Successfully");

        }, function (error) {

            console.log('FAILED...', error);

            alert("Form Submission Failed! Try Again");

        });
    });

});


// Change browser title when the visitor switches tabs
document.addEventListener('visibilitychange', function () {

    if (document.visibilityState === "visible") {
        document.title = "Md Elias Hossen | Portfolio";

        $("#favicon").attr("href", "./assets/images/elias13.png");

    } else {
        document.title = "Come Back To My Portfolio";

        $("#favicon").attr("href", "./assets/images/favhand1.png");
    }

});


// =====================================
// TYPING ANIMATION
// =====================================

if (window.Typed && document.querySelector(".typing-text")) {

    new Typed(".typing-text", {

        strings: [
            "a Mechanical Engineer",
            "a Ph.D. Researcher",
            "an Engineer-in-Training",
            "an Advanced Materials Researcher",
            "a Robotics Enthusiast"
        ],

        loop: true,
        typeSpeed: 60,
        backSpeed: 35,
        backDelay: 1200

    });

}


// =====================================
// FETCH SKILLS AND PROJECTS
// =====================================

async function fetchData(type = "skills") {

    let response;

    if (type === "skills") {
        response = await fetch("./skills.json");
    } else {
        response = await fetch("./projects/projects.json");
    }

    if (!response.ok) {
        throw new Error("Could not load " + type + " data");
    }

    return await response.json();
}


// Display skills
function showSkills(skills) {

    let skillsContainer = document.getElementById("skillsContainer");

    if (!skillsContainer) return;

    let skillHTML = "";

    skills.forEach(skill => {

        skillHTML += `
            <div class="bar">
                <div class="info">
                    <img src="${skill.icon}" alt="${skill.name}">
                    <span>${skill.name}</span>
                </div>
            </div>
        `;

    });

    skillsContainer.innerHTML = skillHTML;

}


// Display projects only when a project container exists
function showProjects(projects) {

    let projectsContainer = document.querySelector("#work .box-container");

    if (!projectsContainer) {
        console.log("Project container not found. Keeping existing research section.");
        return;
    }

    let projectHTML = "";

    projects
        .slice(0, 10)
        .filter(project => project.category !== "android")
        .forEach(project => {

            projectHTML += `
                <div class="box tilt">

                    <img draggable="false"
                         src="./assets/images/projects/${project.image}.png"
                         alt="${project.name}">

                    <div class="content">

                        <div class="tag">
                            <h3>${project.name}</h3>
                        </div>

                        <div class="desc">

                            <p>${project.desc}</p>

                            <div class="btns">

                                <a href="${project.links.view}"
                                   class="btn"
                                   target="_blank"
                                   rel="noopener">
                                    <i class="fas fa-eye"></i> View
                                </a>

                                <a href="${project.links.code}"
                                   class="btn"
                                   target="_blank"
                                   rel="noopener">
                                    Code <i class="fas fa-code"></i>
                                </a>

                            </div>

                        </div>

                    </div>

                </div>
            `;

        });

    projectsContainer.innerHTML = projectHTML;

    initializeTilt();

}


// Load skills
fetchData("skills")
    .then(data => showSkills(data))
    .catch(error => console.error("Skills loading error:", error));


// Load projects
fetchData("projects")
    .then(data => showProjects(data))
    .catch(error => console.error("Projects loading error:", error));


// =====================================
// VANILLA TILT EFFECT
// =====================================

function initializeTilt() {

    if (window.VanillaTilt) {

        VanillaTilt.init(
            document.querySelectorAll(".tilt"),
            {
                max: 12,
                speed: 400,
                glare: true,
                "max-glare": 0.2
            }
        );

    }

}

initializeTilt();


// =====================================
// SCROLL REVEAL ANIMATION
// =====================================

if (window.ScrollReveal) {

    const sr = ScrollReveal({

        origin: 'top',
        distance: '50px',
        duration: 900,
        delay: 100,
        reset: false

    });

    // Home
    sr.reveal('.home .content h2', { delay: 150 });
    sr.reveal('.home .content p', { delay: 250 });
    sr.reveal('.home .content .btn', { delay: 350 });
    sr.reveal('.home .image', { delay: 400 });

    sr.reveal('.home .social-icons li', {
        interval: 100
    });

    // About
    sr.reveal('.about .content h3', { delay: 150 });
    sr.reveal('.about .content .tag', { delay: 200 });
    sr.reveal('.about .content p', { delay: 250 });
    sr.reveal('.about .content .box-container', { delay: 300 });
    sr.reveal('.about .content .resumebtn', { delay: 350 });

    // Skills
    sr.reveal('.skills .container', { delay: 200 });
    sr.reveal('.skills .container .bar', {
        interval: 100
    });

    // Education
    sr.reveal('.education .box', {
        interval: 150
    });

    // Research and experience
    sr.reveal('.experience .timeline', { delay: 200 });

    sr.reveal('.experience .timeline .container', {
        interval: 150
    });

    // Contact
    sr.reveal('.contact .container', { delay: 250 });

}


// =====================================
// TAWK.TO LIVE CHAT
// =====================================

var Tawk_API = Tawk_API || {};
var Tawk_LoadStart = new Date();

(function () {

    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];

    s1.async = true;

    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';

    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    s0.parentNode.insertBefore(s1, s0);

})();

