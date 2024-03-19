//Selecting overview class
const selectOverview = document.querySelector(".overview");
const username = 'katyaprymak';
const unordered = document.querySelector(".repo-list");

//async function to fetch data from my Github Profile

const gitUserInfo = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    displayUserInfo(data);
}

gitUserInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
    `;
    selectOverview.append(div);
    reposInfo();
}

const reposInfo = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const reposData = await fetchRepos.json();
    eachRepoInfo(reposData);
}

const eachRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}<h3>`;
        unordered.append(repoItem);
    }
};



