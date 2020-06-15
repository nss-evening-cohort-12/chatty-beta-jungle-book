import moment from 'moment';
import utils from '../../helpers/utils';
import getMessages from '../../helpers/data/messageData';
import userData from '../../helpers/data/userData';

const getUsername = (id) => userData.users.find((user) => user.id === id).name;

const displayMessage = () => {
  let domString = '';
  const allow = document.querySelector('input[type = radio]:checked').value;
  getMessages.getMessages().forEach((messages) => {
    domString += `
        <div class="card">
            <div class="card-body" id="${messages.messageId}">
                <h5 class="name">${getUsername(messages.userId)}</h5>
                <p class="message">${messages.message}</p>
                ${messages.gifId ? `<img src="https://media1.giphy.com/media/${messages.gifId}/200w.gif"` : ''}
                <p class="time">${moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>`;
    if (getUsername(messages.userId) === allow) {
      domString += `<button type="button" id="${messages.userID}" class="fas fa-times-circle ${messages.userID}"></button>`;
    }
    domString += '</div>';
  });

  utils.printToDom('messageCard', domString);
};

$('body').on('click', '.custom-control-input', displayMessage);

export default { displayMessage };
