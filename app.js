let queryParameters = null;
let execution_date = null;


document.addEventListener(
    "DOMContentLoaded",
    () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        queryParameters = Object.fromEntries(urlSearchParams.entries());
        if (queryParameters.hasOwnProperty('execution_date')) {
            var paramDate = new Date(queryParameters.execution_date);
            if (Object.prototype.toString.call(paramDate) === "[object Date]") {
                if (isNaN(paramDate))
                    execution_date = new Date().toISOString().substring(0, 10);
                else
                    execution_date = paramDate.toISOString().substring(0, 10);

            } else
                execution_date = new Date().toISOString().substring(0, 10);
        } else
            execution_date = new Date().toISOString().substring(0, 10);
        renderDay();
    }
);

function renderDay() {
    const today_schedule_items = schedule_items.filter(
        (x) => {
            return x.execution_date === execution_date;
        }
    );
    today_schedule_items.forEach(
        (schedule_item) => {
            const muscle_group = muscle_groups.filter((x) => { return x.id === schedule_item.muscle_group_id; });
            muscle_group.forEach(
                (muscle_group) => {
                    muscle_group.exercises.forEach(
                        (exercise) => {
                            var exercise_tag = document.createElement('div');
                            exercise_tag.dataset.exercise_id = exercise.id;
                            exercise_tag.className = 'exercise';
                            var exercise_name_tag = document.createElement('h2');
                            exercise_name_tag.innerText = exercise.name;
                            exercise_tag.append(exercise_name_tag);
                            exercise_tag.innerHTML += exercise.instructions;
                            exercise.illustrations.forEach(
                                (illustration, idx) => {
                                    var illustration_tag = document.createElement('img');
                                    illustration_tag.setAttribute('src', illustration.base64);
                                    illustration_tag.setAttribute('alt', illustration.file_name);
                                    illustration_tag.dataset.illustration_id = illustration.id;
                                    illustration_tag.className = 'illustration half';
                                    exercise_tag.append(illustration_tag);
                                }
                            );
                            document.body.append(exercise_tag);
                        }
                    );
                }
            );
        }
    );
}