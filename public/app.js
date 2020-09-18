function storeTask() {
  console.log('Stores the tasks');
  // Javascript
  let taskDescription = document.getElementById('task_description').value;
  console.log('taskDescription', taskDescription);

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: taskDescription })
  };
  fetch('/tasks', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      document.getElementById('task_description').value = '';
      addTask(task);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function addTask(task) {
  let html =
  `
  <div class="card my-3">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
      <input id="${task.id}" type="button" onclick="taskCompleted(this)" value="Done" class="btn btn-primary">
      <input id="del-${task.id}" type="button" onclick="deleteTask(this)" value="Delete" class="btn btn-primary">
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('task_list').prepend(node);
}

function deleteTask(task) {
  let taskDescription = document.getElementById('task_description').value;
  console.log('taskDescription', taskDescription);

  let body = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: $(task).attr("id").split("-")[1] })
  };
  fetch('/tasksDelete', body)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw "Error en la llamada Ajax";
          }
      })
      .then(task => {
          removeTask(task);
      })
      .catch(error => {
          console.log('Error: ', error);
      })

}

function removeTask(task) {
  console.log(task)
  let finishedTask = $('#del-' + task).parent().parent()
  finishedTask.remove()
}