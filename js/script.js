//Selecting overview class
const selectOverview = document.querySelector(".overview");
const username = 'katyaprymak';
const repoList = document.querySelector(".repo-list");
const allReposInfo = document.querySelector(".repos");
const repoInfo = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos"); 
const filterRepos = document.querySelector(".filter-repos")

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
    filterRepos.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}<h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfoData = await fetchRepoInfo.json();
    console.log(repoInfoData);
    const fetchLanguages = await fetch(repoInfoData.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfoData, languages);
};

const displayRepoInfo = function (repoInfoData, languages) {
    repoInfo.innerHTML = "";
    repoInfo.classList.remove("hide");
    allReposInfo.classList.add("hide");
    viewReposButton.classList.remove("hide");
    const div = document.createElement("div");
    /*div.classList.add("new-repo-info");*/
    div.innerHTML = `
        <h3>Name: ${repoInfoData.name}</h3>
        <p>Description: ${repoInfoData.description}</p>
        <p>Default Branch: ${repoInfoData.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfoData.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoInfo.append(div);
};

viewReposButton.addEventListener("click", function() {
    allReposInfo.classList.remove("hide");
    repoInfo.classList.add("hide");
    viewReposButton.classList.add("hide");
});

filterRepos.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});