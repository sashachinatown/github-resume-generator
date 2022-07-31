import axios from "axios";

const wrapper = document.getElementById('wrapper'),
      form = document.querySelector('form'),
      input = document.querySelector('input'),
      button = form.querySelector('button');

const userInfoWrapper = document.createElement('div'),
      userImage = document.createElement('img'),
      userInfo = document.createElement('ul'),
      userBio = document.createElement('span'),
      userLanguages = document.createElement('span');

const getData = (user) => {
    axios.get(`https://api.github.com/users/${user}`)
    .then(response => {
        console.log(response.data);
        displayInfo(response.data);
    })
    .catch(error => console.log(error.message))
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(input.value);
    
    const userName = input.value || 'sashachinatown';

    getData(userName);
    form.reset();
});

function displayInfo(userData) {

    if (!wrapper.querySelector('div')) {

        userInfo.innerHTML = `<li>Name: ${userData.name ?? 'not specified'}</li>
                            <li>E-mail: ${userData.email ?? 'not specified'}</li>
                            <li>Location: ${userData.location ?? 'unknown'}</li>
                            <li>Company: ${userData.company ?? 'unknown'}</li>
                            `;

        
        userInfoWrapper.classList.add('user-info-wrapper');
        userImage.classList.add('user-info');
        userImage.setAttribute('src', userData.avatar_url);
        userBio.textContent = `Bio: ${userData.bio ?? 'empty'}`;
        // userLanguages.textContent = `Languages: ${userData.repos_url}`;

        wrapper.appendChild(userInfoWrapper);
        userInfoWrapper.appendChild(userImage);
        userInfoWrapper.appendChild(userInfo);
        wrapper.appendChild(userBio);

    } else {

        userInfoWrapper.remove();
        userImage.remove();
        userInfo.remove();
        userBio.remove();

        displayInfo(userData);
    }
}
