// ================================
// GitHub API Configuration
// ================================
const GITHUB_USERNAME = 'otavioaugust1';
const GITHUB_API = 'https://api.github.com';

// ================================
// Dark Mode Toggle
// ================================
(function initTheme() {
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    const darkIcon = document.getElementById('darkIcon');
    if (darkIcon) {
        darkIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
})();

function applyTheme(theme) {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('data-theme', theme);
    const darkIcon = document.getElementById('darkIcon');
    if (darkIcon) {
        darkIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    const darkToggle = document.getElementById('darkToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
    }
});

// ================================
// Mobile Menu Toggle
// ================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
            navToggle.classList.remove('active');
        });
    });
}

// ================================
// Fetch GitHub User Data
// ================================
async function fetchUserData() {
    try {
        const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`);
        const userData = await response.json();
        
        // Update stats
        document.getElementById('followers').textContent = userData.followers || 0;
        document.getElementById('repoCount').textContent = userData.public_repos || 0;
        document.getElementById('totalRepos').textContent = userData.public_repos || 0;
        
        return userData;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
}

// ================================
// Fetch GitHub Repositories
// ================================
async function fetchRepositories() {
    try {
        const response = await fetch(
            `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=stars&order=desc&per_page=100`
        );
        const repos = await response.json();
        
        // Calculate stats
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        document.getElementById('starCount').textContent = totalStars;
        document.getElementById('totalStars').textContent = totalStars;
        
        // Get top language
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        
        const topLanguage = Object.keys(languages).length > 0 
            ? Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b)
            : 'JavaScript';
        
        document.getElementById('topLanguage').textContent = topLanguage;
        
        // Filter and classify repos
        const filteredRepos = repos.filter(repo => !repo.fork && repo.description);
        displayProjects(filteredRepos.slice(0, 9)); // Display top 9
        
        return filteredRepos;
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
    }
}

// ================================
// Classify Project
// ================================
function classifyProject(repo) {
    const description = (repo.description || '').toLowerCase();
    const name = (repo.name || '').toLowerCase();
    
    const dataScience = ['data', 'analysis', 'machine learning', 'ml', 'data science', 'análise', 'ciência de dados', 'modelo', 'model'];
    const web = ['web', 'site', 'frontend', 'react', 'vue', 'angular', 'html', 'portfólio', 'portfolio'];
    const automation = ['bot', 'automatização', 'automation', 'script', 'consolidação', 'consolidation', 'portaria', 'rfce'];
    
    const text = description + ' ' + name;
    
    if (dataScience.some(word => text.includes(word))) return 'data-science';
    if (web.some(word => text.includes(word))) return 'web';
    if (automation.some(word => text.includes(word))) return 'automation';
    
    return 'general';
}

// ================================
// Display Projects
// ================================
function displayProjects(repos) {
    const projectsGrid = document.getElementById('projectsGrid') || document.getElementById('projects-grid');
    
    if (!repos || repos.length === 0) {
        projectsGrid.innerHTML = '<p class="loading">Nenhum projeto encontrado</p>';
        return;
    }
    
    projectsGrid.innerHTML = repos.map(repo => {
        const category = classifyProject(repo);
        const stars = repo.stargazers_count || 0;
        const language = repo.language || 'N/A';
        const description = repo.description || 'Sem descrição disponível';
        
        return `
            <div class="project-card" data-category="${category}">
                <div class="project-image">
                    <i class="fas fa-code"></i>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${repo.name}</h3>
                    <p class="project-description">${description}</p>
                    <div class="project-tags">
                        ${language !== 'N/A' ? `<span class="project-tag">${language}</span>` : ''}
                        <span class="project-tag">${category.replace('-', ' ')}</span>
                    </div>
                </div>
                <div class="project-footer">
                    <div class="project-stats">
                        <span><i class="fas fa-star"></i> ${stars}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="project-link">
                        Ver <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

// ================================
// Filter Projects
// ================================
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        const filter = button.dataset.filter;
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ================================
// Smooth Scroll for Anchor Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ================================
// Scroll Animation for Elements
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Scroll reveal for .reveal elements
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// ================================
// Initialize on Load
// ================================
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and display data
    await fetchUserData();
    await fetchRepositories();
    
    // Observe elements for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Scroll reveal for cards and highlighted elements
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});

// ================================
// Counter Animation for Stats
// ================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Animate stat numbers when they come into view
const statElements = document.querySelectorAll('.stat-number');
let statsAnimated = false;

window.addEventListener('scroll', () => {
    if (!statsAnimated) {
        statElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.75) {
                const target = parseInt(el.textContent) || 0;
                if (target > 0) {
                    animateCounter(el, target);
                }
                statsAnimated = true;
            }
        });
    }
});

// ================================
// Dark Mode Toggle (Optional)
// ================================
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function updateTheme() {
    if (prefersDarkScheme.matches) {
        document.documentElement.style.colorScheme = 'dark';
    }
}

updateTheme();
prefersDarkScheme.addEventListener('change', updateTheme);
