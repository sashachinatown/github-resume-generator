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

        axios.get(`https://api.github.com/users/${user}/repos`)
        .then(response => {
            let languageArr = [];

            response.data.forEach(obj => {
                obj.language ? languageArr.push(obj.language) : null;
            });

            const languages = languageArr.reduce((acc, rec) => {
                return (typeof acc[rec] !== 'undefined') 
                  ? { ...acc, [rec]: acc[rec] + 1 } 
                  : { ...acc, [rec]: 1 }
            }, {});

            let total = 0;
            const languageValues = Object.values(languages);
            const languageKeys = Object.keys(languages);

            for (let amount of languageValues) {
                total += amount;
            }

            languageKeys.forEach(key => languages[key] = Math.round(languages[key] * 100 / total) + '%');
            
            let str = '';

            for (const [key, value] of Object.entries(languages)) {
                str += `${key}(${value}), `;
            }

            userLanguages.textContent = str.length > 3 ? `Languages: ${str.slice(0,-2)}` : 'No repositories found';
        })
    })
    .catch(error => console.log(error.message))
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    
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
        userLanguages.setAttribute('style', 'margin: 1%; margin-left: 10%; margin-right: 10%;');

        wrapper.appendChild(userInfoWrapper);
        userInfoWrapper.appendChild(userImage);
        userInfoWrapper.appendChild(userInfo);
        wrapper.appendChild(userBio);
        wrapper.appendChild(userLanguages);

    } else {

        userInfoWrapper.remove();
        userImage.remove();
        userInfo.remove();
        userBio.remove();

        displayInfo(userData);
    }
}
