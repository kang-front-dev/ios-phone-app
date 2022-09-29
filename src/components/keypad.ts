import { createNewContact } from './contacts';
import { addToRecents } from './recents';
export class Keypad {
  private phonePages;
  constructor() {
    this.phonePages = document.querySelector('.phone__pages');

    const keypadWrapper = document.createElement('div');
    keypadWrapper.className = 'phone__keypad phone__page active';
    this.phonePages.append(keypadWrapper);

    const keypadContactWrapper = document.createElement('div')
    keypadContactWrapper.className = 'phone__keypad_contact_wrapper'
    keypadWrapper.append(keypadContactWrapper)

    const keypadInputBlock = document.createElement('div');
    keypadInputBlock.className = 'phone__keypad_input_block';
    const keypadInput = document.createElement('input');
    keypadInput.value = '+';
    keypadInput.readOnly = true;
    keypadInput.className = 'phone__keypad_input';
    const keypadInputBtn = document.createElement('div');
    keypadInputBtn.className = 'phone__keypad_input_btn';
    keypadInputBtn.textContent = 'Add number';
    keypadInputBlock.append(keypadInput, keypadInputBtn);
    keypadWrapper.append(keypadInputBlock);

    keypadInputBtn.addEventListener('click', () => {
      createNewContact(this.phonePages, keypadInput.value);
    });

    const keypad = document.createElement('div');
    keypad.className = 'phone__keypad_key_wrapper';
    keypadWrapper.append(keypad);
    const keypadBtnData = [
      ['1', ''],
      ['2', 'ABC'],
      ['3', 'DEF'],
      ['4', 'GHI'],
      ['5', 'JKL'],
      ['6', 'MNO'],
      ['7', 'PQRS'],
      ['8', 'TUV'],
      ['9', 'WXYZ'],
      ['*', ''],
      ['0', '+'],
      ['#', ''],
    ];

    keypadBtnData.forEach((itemInfo) => {
      const key = document.createElement('div');
      key.className = 'phone__keypad_key';
      const keyNumber = document.createElement('div');
      keyNumber.className = 'phone__keypad_key_number';
      keyNumber.textContent = itemInfo[0];
      const keyLetters = document.createElement('div');
      keyLetters.className = 'phone__keypad_key_letters';
      keyLetters.textContent = itemInfo[1];
      key.append(keyNumber, keyLetters);
      key.addEventListener('click', () => {
        if (keypadInput.value.length < 16) {
          keypadInput.value += itemInfo[0];
        }
        if (document.querySelector('.phone__keypad_contact_block')) {
          document.querySelector('.phone__keypad_contact_block').remove();
        }
        this.showupRelevantContact(keypadInput.value);
      });
      keypad.append(key);
    });

    const callBtnBlock = document.createElement('div');
    callBtnBlock.className = 'phone__keypad_btn-call_block';
    const callBtn = document.createElement('a');
    callBtn.className = 'phone__keypad_btn-call';
    callBtn.href = '';
    const callBtnIcon = document.createElement('i');
    callBtnIcon.className = 'fas fa-phone-alt';
    callBtn.append(callBtnIcon);

    keypad.addEventListener('click', () => {
      callBtn.href = `tel:${keypadInput.value}`;
    });

    callBtn.addEventListener('click', () => {
      if (localStorage.getItem('recents')) {
        const recentsData = JSON.parse(localStorage.getItem('recents'));

        let number = keypadInput.value;
        if (number.includes('+')) {
          number = number.split('');
          number.shift();
          number = number.join('');
        }

        const date = new Date();
        const hours =
          date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes =
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const seconds =
          date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
        const setData = {
          name: 'Unknown',
          number: number,
          date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/${hours}:${minutes}:${seconds}`,
          mode: 'outcome',
        };

        recentsData.push(setData);

        localStorage.setItem('recents', JSON.stringify(recentsData));
      } else {
        let number = keypadInput.value;
        if (number.includes('+')) {
          number = number.split('');
          number.shift();
          number = number.join('');
        }

        const date = new Date();
        const hours =
          date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes =
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        const seconds =
          date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
        const setData = [
          {
            name: 'Unknown',
            number: number,
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}/${hours}:${minutes}:${seconds}`,
            mode: 'outcome',
          },
        ];
        localStorage.setItem('recents', JSON.stringify(setData));
      }
    });

    const eraseBtn = document.createElement('i');
    eraseBtn.className = 'fas fa-backspace phone__keypad_btn-erase';
    callBtnBlock.append(callBtn, eraseBtn);
    keypadWrapper.append(callBtnBlock);
    eraseBtn.addEventListener('click', () => {
      const value = keypadInput.value.split('');
      value.pop();
      keypadInput.value = value.join('');
      this.showupRelevantContact(keypadInput.value);
    });
  }
  showupRelevantContact(key) {
    const keypadContactWrapper = document.querySelector('.phone__keypad_contact_wrapper');
    const keypadContactBlock = document.createElement('a');
    keypadContactBlock.className = 'phone__keypad_contact_block';
    keypadContactWrapper.append(keypadContactBlock);
    const keypadContactAvatar = document.createElement('img');
    keypadContactAvatar.className = 'phone__keypad_contact_avatar';
    keypadContactAvatar.src = 'assets/img/avatar.png';
    const keypadContactRight = document.createElement('div');
    keypadContactRight.className = 'phone__keypad_contact_right';
    const keypadContactNameBlock = document.createElement('div');
    keypadContactNameBlock.className = 'phone__keypad_contact_name_block';
    const keypadContactName = document.createElement('h3');
    keypadContactName.className = 'phone__keypad_contact_name';
    keypadContactNameBlock.append(keypadContactName);
    const keypadContactFavIcon = document.createElement('i');
    keypadContactFavIcon.className = 'fas fa-star';
    keypadContactNameBlock.append(keypadContactFavIcon);
    const keypadContactNumber = document.createElement('p');
    keypadContactNumber.className = 'phone__keypad_contact_number';
    keypadContactRight.append(keypadContactNameBlock, keypadContactNumber);
    keypadContactBlock.append(keypadContactAvatar, keypadContactRight);

    if (keypadContactBlock.classList.contains('active')) {
      keypadContactBlock.classList.remove('active');
      keypadContactBlock.classList.add('disabled');
    }

    const contactsData = JSON.parse(localStorage.getItem('contacts'));
    const target = contactsData.find((el) => {
      let numKey;
      if (key.includes('+')) {
        numKey = key.split('');
        numKey.shift();
        numKey = numKey.join('');
      } else {
        numKey = key;
      }

      if (numKey.length > 0) {
        if (el.number.includes(numKey)) {
          return el;
        } else {
          return false;
        }
      }
    });

    if (target) {
      keypadContactBlock.classList.add('active');
      keypadContactBlock.href = `tel:${target.number}`;
      keypadContactBlock.addEventListener('click', () => {
        addToRecents(target);
      });
      if (target.avatarImgData) {
        keypadContactAvatar.src = target.avatarImgData;
      } else {
        keypadContactAvatar.src = 'assets/img/avatar.png';
      }
      if (target.isFavorite) {
        keypadContactFavIcon.classList.add('active');
      } else {
        keypadContactFavIcon.classList.remove('active');
      }
      keypadContactName.textContent = target.name;
      keypadContactNumber.textContent = `+${target.number}`;
      setTimeout(() => {
        keypadContactBlock.classList.remove('disabled');
        keypadContactBlock.classList.add('active');
      }, 150);
    } else {
      keypadContactBlock.href = '';
      keypadContactBlock.classList.remove('active');
      keypadContactBlock.classList.add('disabled');
    }
  }
}
