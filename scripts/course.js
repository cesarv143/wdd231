// Computer Programming certificate data
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true,
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.'
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true,
        description: 'Focuses on building standard-compliant websites using structured HTML5 markup and clear, modern layout styling with CSS3.'
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true,
        description: 'Deals with decomposing problems into structured functions. Emphasizes writing clean, reusable, and testable code blocks.'
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        certificate: 'Web and Computer Programming',
        completed: true,
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.'
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: false,
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.'
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 3,
        certificate: 'Web and Computer Programming',
        completed: false,
        description: 'Advanced frontend skills using real-time API data streams, structured objects, components, dynamic filters, and scalable layouts.'
    }
];

// Elements selection for dynamic injection
const container = document.getElementById('courses-container');
const totalCreditsEl = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    container.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.completed ? 'completed' : 'pending'}`;
        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        
        // Listens for clicks to open the modal dialog with unique course details
        card.addEventListener('click', () => {
            openCourseModal(course);
        });
        
        container.appendChild(card);
    });

    // Use reduce to calculate credits dynamically based on current list view
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    animateCreditsCounter(totalCredits);
}

// Controls the native HTML5 dialog modal pop-up windows
function openCourseModal(course) {
    const modal = document.getElementById('course-modal');
    if (!modal) return; // Safeguard if the HTML modal code hasn't been added yet
    
    document.getElementById('modal-title').textContent = `${course.subject} ${course.number} - ${course.title}`;
    document.getElementById('modal-description').textContent = course.description;
    document.getElementById('modal-credits').textContent = course.credits;
    
    modal.showModal();
}

// Rolls numbers smoothly upward during changes instead of snapping instantly
function animateCreditsCounter(targetValue) {
    let startValue = 0;
    const duration = 400; // Animation window speed in milliseconds
    const startTime = performance.now();

    function updateCount(currentTime) {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
            const progress = elapsedTime / duration;
            const currentValue = Math.floor(progress * targetValue);
            totalCreditsEl.textContent = currentValue;
            requestAnimationFrame(updateCount);
        } else {
            totalCreditsEl.textContent = targetValue; 
        }
    }
    requestAnimationFrame(updateCount);
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

// Footer date initialization 
document.addEventListener("DOMContentLoaded", () => {
    // Initial load of all available courses
    displayCourses(courses);

    // Dynamic closing event attachment for the modal dialog layout box
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('course-modal');
    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    // Copyright year 
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
});