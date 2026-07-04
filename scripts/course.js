// Course array representing the Web and Computer Programming certificate data
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        completed: false
    }
];

// Elements selection for dynamic injection and filtering
const container = document.getElementById('courses-container');
const totalCreditsEl = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    container.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : 'pending'}`;
        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        container.appendChild(card);
    });

    // Use reduce to calculate credits dynamically based on current display
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = totalCredits;
}

// Event listeners for filtering buttons
document.getElementById('btn-all').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});

document.getElementById('btn-cse').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});

document.getElementById('btn-wdd').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});

function setActiveButton(activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Footer date initialization and default layout rendering
document.addEventListener("DOMContentLoaded", () => {
    // Initial load of all available courses
    displayCourses(courses);

    // Dynamic copyright year and last modified string
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
});