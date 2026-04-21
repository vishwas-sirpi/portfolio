// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// v2 - Render skills from js objects dynamically
const skills = [
    { name: 'HTML5', category: 'frontend' },
    { name: 'CSS3', category: 'frontend' },
    { name: 'JavaScript (ES6+)', category: 'frontend' },
    { name: 'React', category: 'frontend' },
    { name: 'TailwindCSS', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'Express', category: 'backend' },
    { name: 'MongoDB', category: 'database' },
    { name: 'Git & GitHub', category: 'tools' }
];

function renderSkills() {
    const skillsList = document.getElementById('skillsList');
    if (!skillsList) return;
    
    // Clear the loading or existing content
    skillsList.innerHTML = '';
    
    skills.forEach(skill => {
        const li = document.createElement('li');
        li.className = 'skill-tag';
        li.textContent = skill.name;
        skillsList.appendChild(li);
    });
}

// Fetch GitHub Repositories
async function fetchGit() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    try {
        // We use await fetch() properly now
        const response = await fetch('https://api.github.com/users/vrlegacy/repos?sort=updated&per_page=6');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remove loading state
        projectsGrid.innerHTML = '';
        
        if (data.length === 0) {
            projectsGrid.innerHTML = '<p>No repositories found.</p>';
            return;
        }

        data.forEach(repo => {
            // Skip forks if desired, or keep them. Let's keep them for now.
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent); margin-bottom: 1rem;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    <h3 class="project-title">${repo.name}</h3>
                </div>
                <p class="project-desc">${repo.description || 'No description provided for this repository.'}</p>
                <div class="project-tech">
                    ${repo.language ? `<span class="tech-span">${repo.language}</span>` : '<span class="tech-span">Frontend</span>'}
                </div>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="GitHub Repository">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                    ${repo.homepage ? `
                    <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live Demo">
                        <svg xmlns="http://www.w3.
                        org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                    ` : ''}
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });

    } catch (error) {
        console.error('Error fetching repositories:', error);
        projectsGrid.innerHTML = `
            <div style="color: #ef4444;">
                <p>Failed to load projects from GitHub.</p>
                <p style="font-size: 0.9em; margin-top: 0.5rem; color: var(--text-secondary);">${error.message}</p>
            </div>
        `;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    fetchGit();
});