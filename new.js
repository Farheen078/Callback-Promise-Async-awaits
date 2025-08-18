 function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();

      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }

      const li = document.createElement("li");
      li.textContent = taskText;

      // ✅ Mark as completed when clicked
      li.addEventListener("click", function() {
        li.classList.toggle("completed");
      });

      // ❌ Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = function() {
        li.remove();
      };

      li.appendChild(deleteBtn);
      document.getElementById("taskList").appendChild(li);

      taskInput.value = ""; // clear input
    }
  