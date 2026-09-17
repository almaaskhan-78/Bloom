// ==============================
// BLOOM JAVASCRIPT
// ==============================


// ------------------------------
// ENTRANCE PAGE PETALS
// ------------------------------

const petals = document.getElementById("petals");

if (petals) {

    for (let i = 0; i < 25; i++) {

        const petal = document.createElement("span");

        petal.className = "petal";

        petal.style.left = Math.random() * 100 + "%";

        petal.style.animationDelay =
            Math.random() * 8 + "s";

        petal.style.animationDuration =
            6 + Math.random() * 5 + "s";

        petals.appendChild(petal);
    }
}



// ------------------------------
// TASK PAGE
// ------------------------------

const taskList =
    document.getElementById("taskList");

const taskForm =
    document.getElementById("taskForm");

const taskModal =
    document.getElementById("taskModal");

const openTaskModal =
    document.getElementById("openTaskModal");

const closeTaskModal =
    document.getElementById("closeTaskModal");

const emptyTasks =
    document.getElementById("emptyTasks");



// Only run this part on tasks.html

if (taskList && taskForm) {


    // Get saved tasks

    let tasks =
        JSON.parse(localStorage.getItem("bloomTasks")) || [];


    let currentFilter = "all";



    // ------------------------------
    // OPEN MODAL
    // ------------------------------

    openTaskModal.addEventListener("click", function () {

        taskModal.classList.add("show");

    });



    // ------------------------------
    // CLOSE MODAL
    // ------------------------------

    closeTaskModal.addEventListener("click", function () {

        taskModal.classList.remove("show");

    });



    // ------------------------------
    // ADD TASK
    // ------------------------------

    taskForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("taskName").value;

        const category =
            document.getElementById("taskCategory").value;

        const priority =
            document.getElementById("taskPriority").value;

        const date =
            document.getElementById("taskDate").value;


        const newTask = {

            id: Date.now(),

            name: name,

            category: category,

            priority: priority,

            date: date,

            completed: false

        };


        tasks.push(newTask);


        localStorage.setItem(
            "bloomTasks",
            JSON.stringify(tasks)
        );


        taskForm.reset();

        taskModal.classList.remove("show");


        displayTasks();

    });



    // ------------------------------
    // DISPLAY TASKS
    // ------------------------------

    function displayTasks() {

        taskList.innerHTML = "";


        let filteredTasks = tasks;


        if (currentFilter === "pending") {

            filteredTasks =
                tasks.filter(function (task) {

                    return task.completed === false;

                });

        }


        if (currentFilter === "completed") {

            filteredTasks =
                tasks.filter(function (task) {

                    return task.completed === true;

                });

        }



        // Empty message

        if (filteredTasks.length === 0) {

            emptyTasks.style.display = "block";

        } else {

            emptyTasks.style.display = "none";

        }



        // Create cards

        filteredTasks.forEach(function (task) {

            const card =
                document.createElement("div");

            card.className = "task-card";


            if (task.completed) {

                card.classList.add("completed");

            }


            card.innerHTML =

                '<button class="task-check" data-id="' +
                task.id +
                '"></button>' +

                '<div class="task-info">' +

                    '<p class="task-title">' +
                    task.name +
                    '</p>' +

                    '<div class="task-meta">' +

                        '<span class="task-category">' +
                        task.category +
                        '</span>' +

                        '<span class="task-priority">' +
                        task.priority +
                        '</span>' +

                        '<span>' +
                        (task.date || "No date") +
                        '</span>' +

                    '</div>' +

                '</div>' +

                '<button class="task-delete" data-id="' +
                task.id +
                '">' +

                    '×' +

                '</button>';


            taskList.appendChild(card);

        });



        // VERY IMPORTANT

        updateProgress();

    }



    // ------------------------------
    // COMPLETE / DELETE
    // ------------------------------

    taskList.addEventListener("click", function (event) {


        // COMPLETE

        if (
            event.target.classList.contains("task-check")
        ) {

            const id =
                Number(event.target.dataset.id);


            tasks.forEach(function (task) {

                if (task.id === id) {

                    task.completed =
                        !task.completed;

                }

            });


            localStorage.setItem(
                "bloomTasks",
                JSON.stringify(tasks)
            );


            displayTasks();

        }



        // DELETE

        if (
            event.target.classList.contains("task-delete")
        ) {

            const id =
                Number(event.target.dataset.id);


            tasks =
                tasks.filter(function (task) {

                    return task.id !== id;

                });


            localStorage.setItem(
                "bloomTasks",
                JSON.stringify(tasks)
            );


            displayTasks();

        }

    });



    // ------------------------------
    // FILTERS
    // ------------------------------

    const filterButtons =
        document.querySelectorAll(".task-filter");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            displayTasks();

        });

    });



    // ------------------------------
    // PROGRESS
    // ------------------------------

    function updateProgress() {


        // Count ALL tasks

        const total =
            tasks.length;


        // Count completed tasks

        const completed =
            tasks.filter(function (task) {

                return task.completed === true;

            }).length;


        // Calculate percentage

        let percentage = 0;


        if (total > 0) {

            percentage =
                Math.round(
                    (completed / total) * 100
                );

        }



        // --------------------------
        // SHOW "1 of 2 completed"
        // --------------------------

        const progressText =
            document.getElementById("progressText");


        if (progressText) {

            progressText.textContent =
                completed +
                " of " +
                total +
                " completed";

        }



        // --------------------------
        // SHOW 50%
        // --------------------------

        const progressPercentage =
            document.getElementById(
                "progressPercentage"
            );


        if (progressPercentage) {

            progressPercentage.textContent =
                percentage + "%";

        }



        // --------------------------
        // MOVE BAR
        // --------------------------

        const progressFill =
            document.getElementById(
                "progressFill"
            );


        if (progressFill) {

            progressFill.style.width =
                percentage + "%";

        }



        // --------------------------
        // MESSAGE
        // --------------------------

        const progressMessage =
            document.getElementById(
                "progressMessage"
            );


        if (progressMessage) {


            if (total === 0) {

                progressMessage.textContent =
                    "One little task at a time 🌷";

            }


            else if (percentage === 100) {

                progressMessage.textContent =
                    "You did it! Bloom is proud of you ♡";

            }


            else if (percentage >= 50) {

                progressMessage.textContent =
                    "You're doing beautifully ♡";

            }


            else {

                progressMessage.textContent =
                    "Keep going, one little task at a time 🌷";

            }

        }

    }



    // ------------------------------
    // START TASK PAGE
    // ------------------------------

    displayTasks();

}

// ==============================
// BLOOM HOME DASHBOARD
// ==============================


// --------------------------------
// HOME ELEMENTS
// --------------------------------

const homeTaskCount =
    document.getElementById("homeTaskCount");

const homeSkillCount =
    document.getElementById("homeSkillCount");

const homeProjectCount =
    document.getElementById("homeProjectCount");

const homeCertificateCount =
    document.getElementById("homeCertificateCount");


// --------------------------------
// TASKS → HOME
// --------------------------------

function updateHomeTasks() {

    const savedTasks =
        JSON.parse(localStorage.getItem("bloomTasks")) || [];

    const homeTasks =
        document.getElementById("homeTasks");


    // Number of tasks
    if (homeTaskCount) {

        const today =
            new Date().toISOString().split("T")[0];

        const todayTasks =
            savedTasks.filter(function (task) {

                return (
                    task.date === today ||
                    task.date === "" ||
                    !task.date
                );

            });

        homeTaskCount.textContent =
            todayTasks.length;
    }


    if (!homeTasks) {
        return;
    }


    // Empty state
    if (savedTasks.length === 0) {

        homeTasks.innerHTML =
            '<div class="home-empty-state">' +
                '<span>🌱</span>' +
                '<p>No tasks yet.</p>' +
                '<small>Add something you want to accomplish.</small>' +
            '</div>';

        return;
    }


    homeTasks.innerHTML = "";


    // Show first 3 tasks
    savedTasks.slice(0, 3).forEach(function (task) {

        const taskItem =
            document.createElement("div");

        taskItem.className = "task-item";


        if (task.completed) {

            taskItem.classList.add("completed");

        }


        taskItem.innerHTML =

            '<button class="checkbox ' +
                (task.completed ? "checked" : "") +
            '">' +

                (task.completed ? "✓" : "") +

            '</button>' +

            '<div class="task-content ' +
                (task.completed ? "completed" : "") +
            '">' +

                '<h4>' +
                    task.name +
                '</h4>' +

                '<p>' +
                    task.category +
                    ' · ' +
                    task.priority +
                    ' priority' +
                '</p>' +

            '</div>' +

            '<span class="task-date">' +

                (
                    task.completed
                    ? "Done"
                    : "To do"
                ) +

            '</span>';


        homeTasks.appendChild(taskItem);

    });

}


// --------------------------------
// SKILLS → HOME
// --------------------------------

function updateHomeSkills() {

    const savedSkills =
        JSON.parse(localStorage.getItem("bloomSkills")) || [];


    if (homeSkillCount) {

        homeSkillCount.textContent =
            savedSkills.length;

    }


    const homeSkills =
        document.getElementById("homeSkills");


    if (!homeSkills) {
        return;
    }


    // Empty state
    if (savedSkills.length === 0) {

        homeSkills.innerHTML =
            '<div class="home-empty-state">' +
                '<span>🌱</span>' +
                '<p>No skills added yet.</p>' +
                '<small>Start growing your skills.</small>' +
            '</div>';

        return;
    }


    homeSkills.innerHTML = "";


    // Show first 3 skills
    savedSkills.slice(0, 3).forEach(function (skill) {

        const skillElement =
            document.createElement("div");


        skillElement.className = "skill";


        const progress =
            Number(skill.progress || 0);


        skillElement.innerHTML =

            '<div class="skill-info">' +

                '<span>' +
                    skill.name +
                '</span>' +

                '<span>' +
                    progress +
                    '%' +
                '</span>' +

            '</div>' +

            '<div class="skill-bar">' +

                '<div ' +
                    'class="skill-fill" ' +
                    'style="width:' +
                    progress +
                    '%;">' +
                '</div>' +

            '</div>';


        homeSkills.appendChild(skillElement);

    });

}


// --------------------------------
// PROJECTS → HOME
// --------------------------------

function updateHomeProjects() {

    const savedProjects =
        JSON.parse(localStorage.getItem("bloomProjects")) || [];


    if (homeProjectCount) {

        homeProjectCount.textContent =
            savedProjects.length;

    }


    const homeProjects =
        document.getElementById("homeProjects");


    if (!homeProjects) {
        return;
    }


    // Empty state
    if (savedProjects.length === 0) {

        homeProjects.innerHTML =
            '<div class="home-empty-state">' +
                '<span>🌷</span>' +
                '<p>No projects added yet.</p>' +
                '<small>Your creations will appear here.</small>' +
            '</div>';

        return;
    }


    homeProjects.innerHTML = "";


    // Show first 3 projects
    savedProjects.slice(0, 3).forEach(function (project) {

        const projectElement =
            document.createElement("div");


        projectElement.className =
            "project";


        projectElement.innerHTML =

            '<div class="project-icon pink-icon">' +
                '♡' +
            '</div>' +

            '<div class="home-project-info">' +

                '<h4>' +
                    project.name +
                '</h4>' +

                '<p>' +
                    project.type +
                    ' · ' +
                    project.progress +
                    '% complete' +
                '</p>' +

            '</div>';


        homeProjects.appendChild(projectElement);

    });

}


// --------------------------------
// CERTIFICATES → HOME
// --------------------------------

function updateHomeCertificates() {

    const savedCertificates =
        JSON.parse(
            localStorage.getItem("bloomCertificates")
        ) || [];


    if (homeCertificateCount) {

        homeCertificateCount.textContent =
            savedCertificates.length;

    }

}


// --------------------------------
// OVERALL BLOOM PROGRESS
// --------------------------------

function updateHomeProgress() {

    const tasks =
        JSON.parse(
            localStorage.getItem("bloomTasks")
        ) || [];


    const skills =
        JSON.parse(
            localStorage.getItem("bloomSkills")
        ) || [];


    const projects =
        JSON.parse(
            localStorage.getItem("bloomProjects")
        ) || [];


    const certificates =
        JSON.parse(
            localStorage.getItem("bloomCertificates")
        ) || [];


    let totalProgress = 0;

    let progressItems = 0;


    // TASK PROGRESS
    if (tasks.length > 0) {

        const completedTasks =
            tasks.filter(function (task) {

                return task.completed === true;

            }).length;


        totalProgress +=
            (completedTasks / tasks.length) * 100;

        progressItems++;

    }


    // SKILL PROGRESS
    if (skills.length > 0) {

        const skillProgress =
            skills.reduce(
                function (total, skill) {

                    return (
                        total +
                        Number(skill.progress || 0)
                    );

                },
                0
            ) / skills.length;


        totalProgress += skillProgress;

        progressItems++;

    }


    // PROJECT PROGRESS
    if (projects.length > 0) {

        const projectProgress =
            projects.reduce(
                function (total, project) {

                    return (
                        total +
                        Number(project.progress || 0)
                    );

                },
                0
            ) / projects.length;


        totalProgress += projectProgress;

        progressItems++;

    }


    // CERTIFICATES
    if (certificates.length > 0) {

        totalProgress += 100;

        progressItems++;

    }


    let percentage = 0;


    if (progressItems > 0) {

        percentage =
            Math.round(
                totalProgress / progressItems
            );

    }


    const homeProgress =
        document.getElementById("homeProgress");


    if (homeProgress) {

        homeProgress.textContent =
            percentage + "%";

    }


    const homeProgressMessage =
        document.getElementById(
            "homeProgressMessage"
        );


    if (homeProgressMessage) {

        if (percentage === 0) {

            homeProgressMessage.textContent =
                "Your journey is just beginning. ♡";

        } else if (percentage < 50) {

            homeProgressMessage.textContent =
                "Every little step counts. Keep blooming. 🌱";

        } else if (percentage < 100) {

            homeProgressMessage.textContent =
                "You're making beautiful progress. ♡";

        } else {

            homeProgressMessage.textContent =
                "Look at you blooming! 🌸";

        }

    }

}


// --------------------------------
// UPDATE HOME
// --------------------------------

updateHomeTasks();

updateHomeSkills();

updateHomeProjects();

updateHomeCertificates();

updateHomeProgress();


// ------------------------------
// SKILLS → HOME
// ------------------------------

function updateHomeSkills() {

    const savedSkills =
        JSON.parse(localStorage.getItem("bloomSkills")) || [];


    if (homeSkillCount) {

        homeSkillCount.textContent =
            savedSkills.length;
    }


    const homeSkills =
        document.getElementById("homeSkills");


    if (!homeSkills) {
        return;
    }


    if (savedSkills.length === 0) {

        homeSkills.innerHTML =
            '<div class="home-empty-state">' +
                '<span>🌱</span>' +
                '<p>No skills added yet.</p>' +
                '<small>Start growing your skill garden.</small>' +
            '</div>';

        return;
    }


    homeSkills.innerHTML = "";


    savedSkills.slice(0, 3).forEach(function (skill) {

        const skillElement =
            document.createElement("div");

        skillElement.className =
            "skill";


        skillElement.innerHTML =
            '<div class="skill-info">' +

                '<span>' +
                skill.name +
                '</span>' +

                '<span>' +
                skill.progress +
                '%</span>' +

            '</div>' +

            '<div class="skill-bar">' +

                '<div class="skill-fill" style="width: ' +
                skill.progress +
                '%">' +

                '</div>' +

            '</div>';


        homeSkills.appendChild(skillElement);

    });
}


// ==============================
// PROJECTS → HOME
// ==============================

function updateHomeProjects() {

    const savedProjects =
        JSON.parse(localStorage.getItem("bloomProjects")) || [];


    // Update project count
    if (homeProjectCount) {
        homeProjectCount.textContent =
            savedProjects.length;
    }


    const homeProjects =
        document.getElementById("homeProjects");


    if (!homeProjects) {
        return;
    }


    // No projects yet
    if (savedProjects.length === 0) {

        homeProjects.innerHTML =
            '<div class="home-empty-state">' +
                '<span>🌷</span>' +
                '<p>No projects added yet.</p>' +
                '<small>Your creations will appear here.</small>' +
            '</div>';

        return;
    }


    // Clear old content
    homeProjects.innerHTML = "";


    // Show first 3 projects
    savedProjects.slice(0, 3).forEach(
        function (project) {

            const projectElement =
                document.createElement("div");


            projectElement.className =
                "project";


            projectElement.innerHTML =

                '<div class="project-icon pink-icon">' +
                    '♡' +
                '</div>' +

                '<div class="home-project-info">' +

                    '<h4>' +
                        project.name +
                    '</h4>' +

                    '<p>' +
                        project.type +
                        ' · ' +
                        project.progress +
                        '% complete' +
                    '</p>' +

                '</div>';


            homeProjects.appendChild(
                projectElement
            );

        }
    );

}


// ------------------------------
// CERTIFICATES → HOME
// ------------------------------

function updateHomeCertificates() {

    const savedCertificates =
        JSON.parse(
            localStorage.getItem("bloomCertificates")
        ) || [];


    if (homeCertificateCount) {

        homeCertificateCount.textContent =
            savedCertificates.length;
    }
}


// ------------------------------
// OVERALL PROGRESS
// ------------------------------

function updateHomeProgress() {

    const tasks =
        JSON.parse(localStorage.getItem("bloomTasks")) || [];

    const skills =
        JSON.parse(localStorage.getItem("bloomSkills")) || [];

    const projects =
        JSON.parse(localStorage.getItem("bloomProjects")) || [];

    const certificates =
        JSON.parse(
            localStorage.getItem("bloomCertificates")
        ) || [];


    let totalProgress = 0;

    let progressItems = 0;


    // Tasks

    if (tasks.length > 0) {

        const completedTasks =
            tasks.filter(function (task) {
                return task.completed === true;
            }).length;

        totalProgress +=
            (completedTasks / tasks.length) * 100;

        progressItems++;
    }


    // Skills

    if (skills.length > 0) {

        const skillProgress =
            skills.reduce(
                function (total, skill) {
                    return total + Number(skill.progress || 0);
                },
                0
            ) / skills.length;

        totalProgress += skillProgress;

        progressItems++;
    }


    // Projects

    if (projects.length > 0) {

        totalProgress += 100;

        progressItems++;
    }


    // Certificates

    if (certificates.length > 0) {

        totalProgress += 100;

        progressItems++;
    }


    let percentage = 0;


    if (progressItems > 0) {

        percentage =
            Math.round(
                totalProgress / progressItems
            );
    }


    const homeProgress =
        document.getElementById("homeProgress");


    if (homeProgress) {

        homeProgress.textContent =
            percentage + "%";
    }


    const homeProgressMessage =
        document.getElementById(
            "homeProgressMessage"
        );


    if (homeProgressMessage) {

        if (percentage === 0) {

            homeProgressMessage.textContent =
                "Your journey is just beginning. ♡";

        } else if (percentage < 50) {

            homeProgressMessage.textContent =
                "Every little step counts. Keep blooming. 🌱";

        } else if (percentage < 100) {

            homeProgressMessage.textContent =
                "You're making beautiful progress. ♡";

        } else {

            homeProgressMessage.textContent =
                "Look at you blooming! 🌸";
        }
    }
}


// ------------------------------
// RUN HOME FUNCTIONS
// ------------------------------

updateHomeTasks();
updateHomeSkills();
updateHomeProjects();
updateHomeCertificates();
updateHomeProgress();

// ==============================
// BLOOM SKILLS
// ==============================

const skillsList =
    document.getElementById("skillsList");

const skillForm =
    document.getElementById("skillForm");

const skillModal =
    document.getElementById("skillModal");

const openSkillModal =
    document.getElementById("openSkillModal");

const emptyAddSkill =
    document.getElementById("emptyAddSkill");

const closeSkillModal =
    document.getElementById("closeSkillModal");

const skillProgress =
    document.getElementById("skillProgress");

const skillProgressValue =
    document.getElementById("skillProgressValue");


if (skillsList && skillForm) {

    let skills =
        JSON.parse(
            localStorage.getItem("bloomSkills")
        ) || [];


    // ------------------------------
    // OPEN ADD SKILL MODAL
    // ------------------------------

    function openSkillsModal() {

        skillModal.classList.add("show");

    }


    if (openSkillModal) {

        openSkillModal.addEventListener(
            "click",
            openSkillsModal
        );

    }


    if (emptyAddSkill) {

        emptyAddSkill.addEventListener(
            "click",
            openSkillsModal
        );

    }


    // ------------------------------
    // CLOSE MODAL
    // ------------------------------

    if (closeSkillModal) {

        closeSkillModal.addEventListener(
            "click",
            function () {

                skillModal.classList.remove("show");

            }
        );

    }


    // ------------------------------
    // PROGRESS SLIDER
    // ------------------------------

    if (skillProgress) {

        skillProgress.addEventListener(
            "input",
            function () {

                skillProgressValue.textContent =
                    skillProgress.value + "%";

            }
        );

    }


    // ------------------------------
    // ADD SKILL
    // ------------------------------

    skillForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "skillName"
                ).value.trim();


            const category =
                document.getElementById(
                    "skillCategory"
                ).value;


            const progress =
                Number(
                    document.getElementById(
                        "skillProgress"
                    ).value
                );


            const description =
                document.getElementById(
                    "skillDescription"
                ).value.trim();


            const newSkill = {

                id: Date.now(),

                name: name,

                category: category,

                progress: progress,

                description: description

            };


            skills.push(newSkill);


            localStorage.setItem(
                "bloomSkills",
                JSON.stringify(skills)
            );


            skillForm.reset();

            skillProgressValue.textContent =
                "0%";

            skillModal.classList.remove(
                "show"
            );


            displaySkills();

        }
    );


    // ------------------------------
    // DISPLAY SKILLS
    // ------------------------------

    function displaySkills() {

        skillsList.innerHTML = "";


        const emptySkills =
            document.getElementById(
                "emptySkills"
            );


        if (skills.length === 0) {

            emptySkills.style.display =
                "flex";

            return;

        }


        emptySkills.style.display =
            "none";


        skills.forEach(
            function (skill) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "skill-page-card";


                card.innerHTML =

                    '<div class="skill-card-top">' +

                        '<div>' +

                            '<h3 class="skill-card-title">' +

                                skill.name +

                            '</h3>' +

                            '<span class="skill-card-category">' +

                                skill.category +

                            '</span>' +

                        '</div>' +

                        '<span class="skill-card-percentage">' +

                            skill.progress +

                            '%' +

                        '</span>' +

                    '</div>' +


                    (
                        skill.description
                        ?
                        '<p class="skill-card-description">' +

                            skill.description +

                        '</p>'

                        :

                        ''
                    ) +


                    '<div class="skill-page-progress">' +

                        '<div class="skill-page-progress-fill" style="width:' +

                            skill.progress +

                            '%">' +

                        '</div>' +

                    '</div>' +


                    '<div class="skill-card-actions">' +

                        '<button class="update-skill-button" data-id="' +

                            skill.id +

                        '">' +

                            'Update progress' +

                        '</button>' +

                        '<button class="delete-skill-button" data-id="' +

                            skill.id +

                        '">' +

                            'Remove' +

                        '</button>' +

                    '</div>';


                skillsList.appendChild(card);

            }
        );

    }


    // ------------------------------
    // UPDATE PROGRESS
    // ------------------------------

    skillsList.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "update-skill-button"
                )
            ) {

                const id =
                    Number(
                        event.target.dataset.id
                    );


                const skill =
                    skills.find(
                        function (item) {

                            return item.id === id;

                        }
                    );


                if (!skill) {
                    return;
                }


                const newProgress =
                    prompt(
                        "How much have you completed? Enter a number from 0 to 100.",
                        skill.progress
                    );


                if (newProgress === null) {
                    return;
                }


                const progress =
                    Number(newProgress);


                if (
                    isNaN(progress) ||
                    progress < 0 ||
                    progress > 100
                ) {

                    alert(
                        "Please enter a number between 0 and 100."
                    );

                    return;

                }


                skill.progress =
                    progress;


                localStorage.setItem(
                    "bloomSkills",
                    JSON.stringify(skills)
                );


                displaySkills();

            }
            // ==============================
// SKILLS → HOME
// ==============================

function updateHomeSkills() {

    const savedSkills =
        JSON.parse(localStorage.getItem("bloomSkills")) || [];

    // Update number of skills
    if (homeSkillCount) {
        homeSkillCount.textContent = savedSkills.length;
    }

    const homeSkills =
        document.getElementById("homeSkills");

    if (!homeSkills) {
        return;
    }

    // No skills yet
    if (savedSkills.length === 0) {

        homeSkills.innerHTML =
            '<div class="home-empty-state">' +
                '<span>🌱</span>' +
                '<p>No skills added yet.</p>' +
                '<small>Start growing your skills.</small>' +
            '</div>';

        return;
    }

    // Clear old content
    homeSkills.innerHTML = "";

    // Show first 3 skills
    savedSkills.slice(0, 3).forEach(function (skill) {

        const skillElement =
            document.createElement("div");

        skillElement.className = "skill";

        skillElement.innerHTML =
            '<div class="skill-info">' +
                '<span>' +
                    skill.name +
                '</span>' +

                '<span>' +
                    Number(skill.progress || 0) +
                    '%' +
                '</span>' +
            '</div>' +

            '<div class="skill-bar">' +

                '<div ' +
                    'class="skill-fill" ' +
                    'style="width: ' +
                    Number(skill.progress || 0) +
                    '%;">' +
                '</div>' +

            '</div>';

        homeSkills.appendChild(skillElement);
    });
}


            // --------------------------
            // DELETE SKILL
            // --------------------------

            if (
                event.target.classList.contains(
                    "delete-skill-button"
                )
            ) {

                const id =
                    Number(
                        event.target.dataset.id
                    );


                skills =
                    skills.filter(
                        function (skill) {

                            return skill.id !== id;

                        }
                    );


                localStorage.setItem(
                    "bloomSkills",
                    JSON.stringify(skills)
                );


                displaySkills();

            }

        }
    );


    // ------------------------------
    // START
    // ------------------------------

    displaySkills();

}

// ==============================
// BLOOM PROJECTS
// ==============================

const projectsList =
    document.getElementById("projectsList");

const projectForm =
    document.getElementById("projectForm");

const projectModal =
    document.getElementById("projectModal");

const openProjectModal =
    document.getElementById("openProjectModal");

const emptyAddProject =
    document.getElementById("emptyAddProject");

const closeProjectModal =
    document.getElementById("closeProjectModal");

const projectProgress =
    document.getElementById("projectProgress");

const projectProgressValue =
    document.getElementById("projectProgressValue");


if (projectsList && projectForm) {

    let projects =
        JSON.parse(localStorage.getItem("bloomProjects")) || [];


    // ------------------------------
    // OPEN MODAL
    // ------------------------------

    function openProjectsModal() {

        projectModal.classList.add("show");

    }


    if (openProjectModal) {

        openProjectModal.addEventListener(
            "click",
            openProjectsModal
        );

    }


    if (emptyAddProject) {

        emptyAddProject.addEventListener(
            "click",
            openProjectsModal
        );

    }


    // ------------------------------
    // CLOSE MODAL
    // ------------------------------

    if (closeProjectModal) {

        closeProjectModal.addEventListener(
            "click",
            function () {

                projectModal.classList.remove("show");

            }
        );

    }


    // ------------------------------
    // PROGRESS SLIDER
    // ------------------------------

    if (projectProgress) {

        projectProgress.addEventListener(
            "input",
            function () {

                projectProgressValue.textContent =
                    projectProgress.value + "%";

            }
        );

    }


    // ------------------------------
    // ADD PROJECT
    // ------------------------------

    projectForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("projectName")
                    .value
                    .trim();


            const type =
                document
                    .getElementById("projectType")
                    .value;


            const status =
                document
                    .getElementById("projectStatus")
                    .value;


            const progress =
                Number(
                    document
                        .getElementById("projectProgress")
                        .value
                );


            const description =
                document
                    .getElementById("projectDescription")
                    .value
                    .trim();


            const link =
                document
                    .getElementById("projectLink")
                    .value
                    .trim();


            const newProject = {

                id: Date.now(),

                name: name,

                type: type,

                status: status,

                progress: progress,

                description: description,

                link: link

            };


            projects.push(newProject);


            localStorage.setItem(
                "bloomProjects",
                JSON.stringify(projects)
            );


            projectForm.reset();

            projectProgressValue.textContent = "0%";

            projectModal.classList.remove("show");


            displayProjects();

        }
    );


    // ------------------------------
    // DISPLAY PROJECTS
    // ------------------------------

    function displayProjects() {

        projectsList.innerHTML = "";


        const emptyProjects =
            document.getElementById("emptyProjects");


        // No projects
        if (projects.length === 0) {

            emptyProjects.style.display = "flex";

            return;

        }


        emptyProjects.style.display = "none";


        // Display each project
        projects.forEach(
            function (project) {

                const card =
                    document.createElement("div");


                card.className =
                    "project-page-card";


                card.innerHTML =

                    '<div class="project-card-top">' +

                        '<div>' +

                            '<h3 class="project-card-title">' +
                                project.name +
                            '</h3>' +

                            '<span class="project-card-type">' +
                                project.type +
                            '</span>' +

                        '</div>' +

                        '<span class="project-card-status">' +
                            project.status +
                        '</span>' +

                    '</div>' +


                    (
                        project.description
                        ?
                        '<p class="project-card-description">' +
                            project.description +
                        '</p>'
                        :
                        ''
                    ) +


                    '<div class="project-progress-header">' +

                        '<span class="project-progress-label">' +
                            'Progress' +
                        '</span>' +

                        '<span class="project-progress-percentage">' +
                            project.progress +
                            '%' +
                        '</span>' +

                    '</div>' +


                    '<div class="project-page-progress">' +

                        '<div ' +
                            'class="project-page-progress-fill" ' +
                            'style="width:' +
                            project.progress +
                            '%">' +
                        '</div>' +

                    '</div>' +


                    '<div class="project-card-footer">' +

                        (
                            project.link
                            ?
                            '<a ' +
                                'href="' +
                                project.link +
                                '" ' +
                                'target="_blank" ' +
                                'class="project-link-button">' +
                                'View project ↗' +
                            '</a>'
                            :
                            '<span></span>'
                        ) +


                        '<div class="project-card-actions">' +

                            '<button ' +
                                'class="update-project-button" ' +
                                'data-id="' +
                                project.id +
                                '">' +
                                'Update progress' +
                            '</button>' +

                            '<button ' +
                                'class="delete-project-button" ' +
                                'data-id="' +
                                project.id +
                                '">' +
                                'Remove' +
                            '</button>' +

                        '</div>' +

                    '</div>';


                projectsList.appendChild(card);

            }
        );

    }


    // ------------------------------
    // PROJECT ACTIONS
    // ------------------------------

    projectsList.addEventListener(
        "click",
        function (event) {


            // UPDATE PROGRESS
            if (
                event.target.classList.contains(
                    "update-project-button"
                )
            ) {

                const id =
                    Number(
                        event.target.dataset.id
                    );


                const project =
                    projects.find(
                        function (item) {

                            return item.id === id;

                        }
                    );


                if (!project) {

                    return;

                }


                const newProgress =
                    prompt(
                        "How much have you completed? Enter a number from 0 to 100.",
                        project.progress
                    );


                if (newProgress === null) {

                    return;

                }


                const progress =
                    Number(newProgress);


                if (
                    isNaN(progress) ||
                    progress < 0 ||
                    progress > 100
                ) {

                    alert(
                        "Please enter a number between 0 and 100."
                    );

                    return;

                }


                project.progress =
                    progress;


                // Automatically update status
                if (progress === 0) {

                    project.status = "Idea";

                } else if (progress === 100) {

                    project.status = "Completed";

                } else {

                    project.status = "In Progress";

                }


                localStorage.setItem(
                    "bloomProjects",
                    JSON.stringify(projects)
                );


                displayProjects();

            }


            // DELETE PROJECT
            if (
                event.target.classList.contains(
                    "delete-project-button"
                )
            ) {

                const id =
                    Number(
                        event.target.dataset.id
                    );


                projects =
                    projects.filter(
                        function (project) {

                            return project.id !== id;

                        }
                    );


                localStorage.setItem(
                    "bloomProjects",
                    JSON.stringify(projects)
                );


                displayProjects();

            }

        }
    );


    // ------------------------------
    // INITIAL DISPLAY
    // ------------------------------

    displayProjects();

}
// =========================================
// BLOOM CERTIFICATE CHECKLIST
// =========================================

const certificateList =
    document.getElementById("certificatesList");

const certificateForm =
    document.getElementById("certificateForm");

const certificateModal =
    document.getElementById("certificateModal");

const addCertificateButton =
    document.getElementById("openCertificateModal");

const emptyAddButton =
    document.getElementById("emptyAddCertificate");

const closeCertificateButton =
    document.getElementById("closeCertificateModal");

const filterButtons =
    document.querySelectorAll(".certificate-filter");


// =========================================
// LOAD SAVED CERTIFICATES
// =========================================

let certificates = [];

try {

    const saved =
        localStorage.getItem("bloomCertificates");

    if (saved) {

        const oldData =
            JSON.parse(saved);

        if (Array.isArray(oldData)) {

            certificates =
                oldData.map(function (certificate) {

                    return {

                        id:
                            certificate.id ||
                            Date.now() +
                            Math.random(),

                        name:
                            certificate.name ||
                            "Untitled Certificate",

                        provider:
                            certificate.provider ||
                            "",

                        category:
                            certificate.category ||
                            "Other",

                        completed:
                            certificate.completed === true

                    };

                });

        }

    }

} catch (error) {

    certificates = [];

}


// =========================================
// CURRENT FILTER
// =========================================

let currentFilter = "all";


// =========================================
// SAVE
// =========================================

function saveCertificates() {

    localStorage.setItem(
        "bloomCertificates",
        JSON.stringify(certificates)
    );

}


// =========================================
// OPEN MODAL
// =========================================

function openCertificateWindow() {

    certificateModal.classList.add("show");

}


if (addCertificateButton) {

    addCertificateButton.addEventListener(
        "click",
        openCertificateWindow
    );

}


if (emptyAddButton) {

    emptyAddButton.addEventListener(
        "click",
        openCertificateWindow
    );

}


// =========================================
// CLOSE MODAL
// =========================================

if (closeCertificateButton) {

    closeCertificateButton.addEventListener(
        "click",
        function () {

            certificateModal.classList.remove("show");

        }
    );

}


// Close when clicking outside the box

if (certificateModal) {

    certificateModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === certificateModal
            ) {

                certificateModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =========================================
// ADD CERTIFICATE
// =========================================

if (certificateForm) {

    certificateForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("certificateName")
                    .value
                    .trim();


            const provider =
                document
                    .getElementById("certificateProvider")
                    .value
                    .trim();


            const category =
                document
                    .getElementById("certificateCategory")
                    .value;


            if (name === "") {

                return;

            }


            const newCertificate = {

                id:
                    Date.now(),

                name:
                    name,

                provider:
                    provider,

                category:
                    category,

                completed:
                    false

            };


            certificates.push(
                newCertificate
            );


            saveCertificates();


            certificateForm.reset();


            certificateModal.classList.remove(
                "show"
            );


            currentFilter = "all";


            filterButtons.forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );

                }
            );


            const allButton =
                document.querySelector(
                    '.certificate-filter[data-filter="all"]'
                );


            if (allButton) {

                allButton.classList.add(
                    "active"
                );

            }


            displayCertificates();

        }
    );

}


// =========================================
// FILTER BUTTONS
// =========================================

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                displayCertificates();

            }
        );

    }
);


// =========================================
// DISPLAY CERTIFICATES
// =========================================

function displayCertificates() {

    if (!certificateList) {

        return;

    }


    certificateList.innerHTML = "";


    let visibleCertificates =
        certificates;


    if (currentFilter === "todo") {

        visibleCertificates =
            certificates.filter(
                function (certificate) {

                    return !certificate.completed;

                }
            );

    }


    if (currentFilter === "completed") {

        visibleCertificates =
            certificates.filter(
                function (certificate) {

                    return certificate.completed;

                }
            );

    }


    const emptyState =
        document.getElementById(
            "emptyCertificates"
        );


    // =====================================
    // NOTHING TO SHOW
    // =====================================

    if (visibleCertificates.length === 0) {

        emptyState.style.display = "flex";


        const title =
            emptyState.querySelector("h2");

        const text =
            emptyState.querySelector("p");


        if (certificates.length === 0) {

            title.textContent =
                "Your certificate list is empty ♡";

            text.textContent =
                "Add the certificates and courses you want to complete.";

        } else {

            title.textContent =
                "Nothing here yet ♡";

            text.textContent =
                "There are no certificates in this category.";

        }


        return;

    }


    emptyState.style.display = "none";


    // =====================================
    // CREATE ITEMS
    // =====================================

    visibleCertificates.forEach(
        function (certificate) {

            const item =
                document.createElement("div");


            item.className =
                "certificate-checklist-item";


            if (certificate.completed) {

                item.classList.add(
                    "completed"
                );

            }


            item.innerHTML =

                '<button ' +
                    'type="button" ' +
                    'class="certificate-checkbox ' +
                    (
                        certificate.completed
                        ? "checked"
                        : ""
                    ) +
                    '" ' +
                    'data-id="' +
                    certificate.id +
                '">' +

                    (
                        certificate.completed
                        ? "✓"
                        : ""
                    ) +

                '</button>' +


                '<div class="certificate-checklist-info">' +

                    '<h3 class="certificate-checklist-name">' +
                        certificate.name +
                    '</h3>' +

                    (
                        certificate.provider
                        ?
                        '<div class="certificate-checklist-provider">' +
                            certificate.provider +
                        '</div>'
                        :
                        ''
                    ) +

                '</div>' +


                '<span class="certificate-checklist-category">' +
                    certificate.category +
                '</span>' +


                '<button ' +
                    'type="button" ' +
                    'class="delete-certificate-button" ' +
                    'data-id="' +
                    certificate.id +
                '">' +
                    'Remove' +
                '</button>';


            certificateList.appendChild(
                item
            );

        }
    );

}


// =========================================
// CHECKBOX + REMOVE
// =========================================

if (certificateList) {

    certificateList.addEventListener(
        "click",
        function (event) {


            // ---------------------------------
            // CHECKBOX
            // ---------------------------------

            if (
                event.target.classList.contains(
                    "certificate-checkbox"
                )
            ) {

                const id =
                    Number(
                        event.target.dataset.id
                    );


                const certificate =
                    certificates.find(
                        function (item) {

                            return (
                                Number(item.id) ===
                                id
                            );

                        }
                    );


                if (!certificate) {

                    return;

                }


                certificate.completed =
                    !certificate.completed;


                saveCertificates();


                displayCertificates();

            }


            // ---------------------------------
            // REMOVE
            // ---------------------------------

            if (
                event.target.classList.contains(
                    "delete-certificate-button"
                )
            ) {

                const id =
                    Number(
                        event.target.dataset.id
                    );


                certificates =
                    certificates.filter(
                        function (certificate) {

                            return (
                                Number(certificate.id) !==
                                id
                            );

                        }
                    );


                saveCertificates();


                displayCertificates();

            }

        }
    );

}


// =========================================
// INITIAL DISPLAY
// =========================================

displayCertificates();