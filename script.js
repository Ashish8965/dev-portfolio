document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');

    // Toggle mobile navigation
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Smooth scrolling and active link highlighting
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const target = document.querySelector(href);
            
            window.scrollTo({
                top: target.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            });

            // Close mobile menu on link click
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
            }
        });
    });

    // Highlight active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - header.offsetHeight) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Add a subtle animation to the hamburger menu
    const hamburgerLines = document.querySelectorAll('.hamburger .line');
    hamburger.addEventListener('click', () => {
        hamburgerLines.forEach(line => {
            line.classList.toggle('active');
        });
    });

    // Scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
// Dynamically load projects
    const projectGrid = document.querySelector('.project-grid');

    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            projectGrid.innerHTML = ''; // Clear existing projects
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.classList.add('project-card');

                projectCard.innerHTML = `
                    <div class="project-icon"><i class="${project.icon}"></i></div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" class="see-more" target="_blank">See More <i class="fas fa-arrow-right"></i></a>
                `;

                projectGrid.appendChild(projectCard);
            });
        });
// Contact form submission
    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const serviceID = 'service_2qiwstf';
        const templateID = 'template_4u9lnbs';

        emailjs.sendForm(serviceID, templateID, contactForm)
            .then(() => {
                alert('Message sent successfully!');
                contactForm.reset();
            }, (err) => {
                alert(JSON.stringify(err));
            });
    });
// Dynamically load blog posts
    const blogGrid = document.querySelector('.blog-grid');
    const blogFiles = ['blog/post1.md', 'blog/post2.md'];
    const converter = new showdown.Converter();

    blogFiles.forEach(file => {
        fetch(file)
            .then(response => response.text())
            .then(markdown => {
                const html = converter.makeHtml(markdown);
                const postElement = document.createElement('div');
                postElement.classList.add('blog-post');
                postElement.innerHTML = html;
                blogGrid.appendChild(postElement);
            });
    });