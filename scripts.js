


const result = document.getElementById('result');

const inputElement = document.getElementById('user-search');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    result.innerHTML = '';
    let inputtedValue = inputElement.value;

    if(!(inputtedValue.trim())) {
        result.innerHTML = `<h2 class="warning">Please Enter A Username</h2>`;
    } else {
        getUserData(inputtedValue);
    }
})

const getUserData = async userName => {
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const user = await res.json();
    userResults(user)
}

const userResults = user => {
        // checks to see if the user exists
        if(user.message === 'Not Found') {
            result.innerHTML = `<h2 class="warning">User ${user.message}</h2>`;
        } else {
            // create elements base on user info
            console.log(user);
            const nameElement = document.createElement('h2');
            nameElement.textContent = user.name;
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', user.avatar_url);
            imgElement.id = 'profile';

            const divElement = document.createElement('div');
            divElement.append(nameElement, imgElement);

            let linkElement;
            let bioElement;
            let locationElement;

            if(user.location) {
                locationElement = document.createElement('p');
                locationElement.innerHTML = `User Resides In: <strong>${user.location}</strong>`;
                locationElement.id = 'location';
                divElement.append(locationElement);
            }

            if (user.bio) {
                bioElement = document.createElement('p');
                bioElement.innerHTML = `${user.bio}`;
                bioElement.id = 'bio';
                divElement.append(bioElement);
            }

            if (user.html_url) {
                linkElement = document.createElement('p');
                linkElement.innerHTML = `<a href="${user.html_url}">GitHub Profile</a>`;
                divElement.append(linkElement);
            }

            result.style.padding = '10px';
            result.append(divElement);
        }                
};