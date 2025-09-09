const userForm = document.getElementById("userForm");
const postForm = document.getElementById("postForm");
const usersList = document.getElementById("usersList");
const postsContainer = document.getElementById("posts");

let users =JSON.parse(localStorage.getItem('users')) || [];
let posts =JSON.parse(localStorage.getItem('posts')) || [];

renderUsers();
renderPosts();

// Add user
userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  if (username) {
    users.push(username);
    localStorage.setItem('users',JSON.stringify(users));
    renderUsers();
    userForm.reset();
  }
});

// Add post
postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (users.length === 0) {
    alert("⚠️ You must add at least one user before posting.");
    return;
  }

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title && content) {
    const post = { title, content, user: users[users.length - 1] };
    posts.push(post);
    localStorage.setItem('posts',JSON.stringify(posts))
    renderPosts();
    postForm.reset();
  }
});

// Render users
function renderUsers() {
  usersList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user;
    usersList.appendChild(li);
  });
}

// Render posts
function renderPosts() {
  postsContainer.innerHTML = "";
  posts.forEach((post,index) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    // Title
    const title = document.createElement("h2");
    title.textContent = post.title;
    postDiv.appendChild(title);

    // Expandable
    const expandable = document.createElement("div");
    expandable.classList.add("expandable");
    expandable.innerHTML = `
      <p>${post.content}</p>
      <small>Written by: ${post.user}</small>
    `;
    postDiv.appendChild(expandable);

    const deleteBtn= document.createElement("button");
    deleteBtn.textContent='Delete';
    deleteBtn.classList.add("delete-btn")
    console.log("ADD",post.title);
    deleteBtn.setAttribute ("data-index",index);

    deleteBtn.addEventListener("click",(e) => {
      console.log("Delete Button")
      e.stopPropagation();
      const indexToDelete=e.target.getAttribute("data-index")
      deletePost(indexToDelete);
    })
    postDiv.appendChild(deleteBtn)

    // Toggle expand/collapse
    postDiv.addEventListener("click", () => {
      expandable.style.display =
        expandable.style.display === "none" ? "block" : "none";
    });

    postsContainer.appendChild(postDiv);
  });
}

function deletePost(index){
  console.log(`deletepost for : ${index}`)
  if (confirm('are you sure you want to delete this post')){
    posts.splice(index,1);
    localStorage.setItem('posts',JSON.stringify(posts));
    renderPosts();
  }
}