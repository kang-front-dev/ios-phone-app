import { Favorites } from './favorites';
import { generateFavorite } from './favorites';
import { addToRecents } from './recents';

export interface IContact {
  name: string;
  number: string;
  email?: string;
  id: number;
  isFavorite?: boolean;
}
export class Contacts {
  public contactsWrapper;
  public contacts;
  public phonePagesWrapper;
  constructor() {
    this.phonePagesWrapper = document.querySelector('.phone__pages');
    const phoneContactsAndInfoWrapper = document.createElement('div');
    phoneContactsAndInfoWrapper.className =
      'phone__contacts_wrapper-info phone__contacts';

    const phoneContacts = document.createElement('div');
    phoneContacts.className = 'phone__contacts_page phone__page active';
    this.contacts = phoneContacts;
    phoneContactsAndInfoWrapper.append(phoneContacts);

    const phoneContactsTitleWrapper = document.createElement('div');
    phoneContactsTitleWrapper.className = 'phone__contacts_title_wrapper';
    const phoneContactsTitle = document.createElement('h1');
    phoneContactsTitle.className = 'phone__contacts_title';
    phoneContactsTitle.textContent = 'Contacts';
    const phoneContactsAdd = document.createElement('i');
    phoneContactsAdd.className = 'fal fa-plus phone__contacts_add';
    phoneContactsTitleWrapper.append(phoneContactsTitle, phoneContactsAdd);
    phoneContacts.append(phoneContactsTitleWrapper);
    phoneContactsAdd.addEventListener('click', () => {
      createNewContact(this.phonePagesWrapper);
    });

    const phoneContactsSearch = document.createElement('div');
    phoneContactsSearch.className = 'phone__contacts_search';
    const phoneContactsSearchIcon = document.createElement('i');
    phoneContactsSearchIcon.className = 'far fa-search';
    const phoneContactsSearchInput = document.createElement('input');
    phoneContactsSearchInput.className = 'phone__contacts_search_input';
    phoneContactsSearchInput.placeholder = 'Search';
    phoneContactsSearchInput.type = 'text';
    phoneContactsSearch.append(
      phoneContactsSearchIcon,
      phoneContactsSearchInput
    );

    phoneContactsSearchInput.addEventListener('input', () => {
      this.updateContactsList(phoneContactsSearchInput.value);
    });

    phoneContacts.append(phoneContactsSearch);

    const phoneContactsUnderline = document.createElement('div');
    phoneContactsUnderline.className = 'phone__contacts_underline';
    phoneContacts.append(phoneContactsUnderline);

    const phoneContactsWrapper = document.createElement('div');
    phoneContactsWrapper.className = 'phone__contacts_wrapper';
    phoneContacts.append(phoneContactsWrapper);

    const phoneContactsProfile = document.createElement('div');
    phoneContactsProfile.className = 'phone__contacts_profile';
    const phoneContactsProfileImg = document.createElement('img');
    phoneContactsProfileImg.className = 'phone__contacts_profile_img';
    phoneContactsProfileImg.src = 'assets/img/avatar.png';
    phoneContactsProfile.append(phoneContactsProfileImg);
    phoneContactsWrapper.append(phoneContactsProfile);

    const phoneContactsProfileRight = document.createElement('div');
    phoneContactsProfileRight.className = 'phone__contacts_profile_right';
    const phoneContactsProfileName = document.createElement('input');
    phoneContactsProfileName.className = 'phone__contacts_profile_name';
    phoneContactsProfileName.placeholder = 'Your name';
    const phoneContactsProfileAmount = document.createElement('div');
    phoneContactsProfileAmount.className = 'phone__contacts_profile_amount';
    phoneContactsProfileAmount.textContent = '50 contacts';
    phoneContactsProfileRight.append(
      phoneContactsProfileName,
      phoneContactsProfileAmount
    );
    phoneContactsProfile.append(phoneContactsProfileRight);

    this.contactsWrapper = phoneContactsWrapper;
    this.phonePagesWrapper.append(phoneContactsAndInfoWrapper);

    this.init();
  }
  init() {
    const contactsData = JSON.parse(localStorage.getItem('contacts'));
    generateGroups(contactsData);
  }

  updateContactsList(searchKey?) {
    searchKey = searchKey.toUpperCase();
    const contactsData = JSON.parse(localStorage.getItem('contacts'));
    const oldGroups = document.querySelectorAll('.phone__contacts_group');
    const targets = [];

    oldGroups.forEach((item) => {
      item.remove();
    });

    contactsData.forEach((item) => {
      const uppercasedName = item.name.toUpperCase();
      if (uppercasedName.includes(searchKey)) {
        targets.push(item);
      }
    });
    generateGroups(targets);
  }

  remove() {
    this.contacts.remove();
  }
}
export function generateContactInfo(info, parent) {
  const phoneStatusBar = document.querySelector('.phone__status');

  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'phone__contacts_info';
  infoWrapper.id = info.id;
  infoWrapper.classList.add('active');

  parent.append(infoWrapper);
  parent.classList.add('swipe');
  phoneStatusBar.classList.add('active');

  const backBtnWrapper = document.createElement('div');
  backBtnWrapper.className = 'phone__contacts_info_btn-back_wrapper';
  const backBtnBlock = document.createElement('div');
  backBtnBlock.className = 'phone__contacts_info_btn-back_block';
  const backBtnIcon = document.createElement('i');
  backBtnIcon.className = 'far fa-chevron-left';
  const backBtnText = document.createElement('h3');
  backBtnText.className = 'phone__contacts_info_btn-back';
  backBtnText.textContent = 'Back';
  backBtnBlock.addEventListener('click', () => {
    parent.classList.remove('swipe');
    phoneStatusBar.classList.remove('active');
    setTimeout(() => {
      infoWrapper.remove();
    }, 400);
  });
  backBtnBlock.append(backBtnIcon, backBtnText);
  backBtnWrapper.append(backBtnBlock);
  infoWrapper.append(backBtnWrapper);

  const avatar = document.createElement('div');
  avatar.className = 'phone__contacts_info_avatar';
  infoWrapper.append(avatar);

  if (info.avatarImgData) {
    const avatarImg = document.createElement('img');
    avatarImg.className = 'phone__contacts_info_avatar_img';
    avatarImg.src = info.avatarImgData;
    avatar.append(avatarImg);
  } else {
    if (info.name.split(' ').length > 1) {
      const nameArr = info.name.split(' ');
      avatar.setAttribute(
        'avatar-letter',
        `${info.name[0] + nameArr[nameArr.length - 1][0]}`
      );
    } else {
      avatar.setAttribute('avatar-letter', `${info.name[0]}`);
    }
  }

  const nameText = document.createElement('h1');
  nameText.className = 'phone__contacts_info_name';
  nameText.textContent = info.name;
  infoWrapper.append(nameText);

  const btnsBlock = document.createElement('div');
  btnsBlock.className = 'phone__contacts_info_btn_block';
  infoWrapper.append(btnsBlock);
  const btnsData = [
    ['message', 'fas fa-comment'],
    ['call', 'fas fa-phone-alt'],
    ['video', 'fas fa-video'],
    ['mail', 'fas fa-envelope'],
  ];
  btnsData.forEach((item) => {
    let btn;
    if (item[0] === 'call') {
      btn = document.createElement('a');
      btn.href = `tel:${info.number}`;
      btn.addEventListener('click', () => {
        addToRecents(info);
      });
    } else if (item[0] === 'message') {
      btn = document.createElement('a');
      btn.href = `sms:${info.number}`;
    } else if (item[0] === 'mail' && info.hasOwnProperty('email')) {
      btn = document.createElement('a');
      btn.href = `mailto:${info.email}`;
    } else {
      btn = document.createElement('div');
    }

    btn.className = 'phone__contacts_info_btn';
    const btnIcon = document.createElement('i');
    btnIcon.className = `${item[1]}`;
    const btnText = document.createElement('h3');
    btnText.className = 'phone__contacts_info_btn_text';
    btnText.textContent = `${item[0]}`;

    btn.append(btnIcon, btnText);
    btnsBlock.append(btn);
  });

  const mobile = document.createElement('div');
  mobile.className = 'phone__contacts_info_mobile';
  const mobileTitle = document.createElement('label');
  mobileTitle.className = 'phone__contacts_info_mobile_title';
  mobileTitle.setAttribute('for', 'contact-info-phone');
  mobileTitle.textContent = 'mobile';
  const mobileInputBlock = document.createElement('div');
  mobileInputBlock.className = 'phone__contacts_info_mobile_input_block';
  const mobileInput = document.createElement('input');
  mobileInput.className = 'phone__contacts_info_mobile_input';
  mobileInput.id = 'contact-info-phone';
  mobileInput.placeholder = 'Unknown';
  mobileInput.type = 'tel';
  mobileInput.value = info.number;
  const mobileInputLabel = document.createElement('label');
  mobileInputLabel.setAttribute('for', 'mobile-input');
  const mobileInputIcon = document.createElement('i');
  mobileInputIcon.className = 'fas fa-edit';
  mobileInputLabel.append(mobileInputIcon);

  mobile.append(mobileTitle, mobileInputBlock);
  mobileInputBlock.append(mobileInput, mobileInputLabel);
  infoWrapper.append(mobile);

  const notesWrapper = document.createElement('div');
  notesWrapper.className = 'phone__contacts_info_notes_wrapper';
  const notesTitle = document.createElement('label');
  notesTitle.className = 'phone__contacts_info_notes_title';
  notesTitle.textContent = 'notes';
  notesTitle.setAttribute('for', 'mobile-notes');
  const notes = document.createElement('textarea');
  notes.className = 'phone__contacts_info_notes';
  notes.id = 'contact-info-notes';
  notes.setAttribute('maxlength', '60');
  notesWrapper.append(notesTitle, notes);
  infoWrapper.append(notesWrapper);

  if (info.notes) {
    notes.value = info.notes;
  }

  const email = document.createElement('div');
  email.className = 'phone__contacts_info_email';
  const emailTitle = document.createElement('label');
  emailTitle.className = 'phone__contacts_info_email_title';
  emailTitle.setAttribute('for', 'contact-email-input');
  emailTitle.textContent = 'email';
  const emailInputBlock = document.createElement('div');
  emailInputBlock.className = 'phone__contacts_info_email_input_block';
  const emailInput = document.createElement('input');
  emailInput.className = 'phone__contacts_info_email_input';
  emailInput.id = 'contact-info-email';
  emailInput.placeholder = 'Unknown';
  emailInput.type = 'tel';

  if (info.email) {
    emailInput.value = info.email;
  } else {
    emailInput.value = 'Unknown';
  }

  const contactsData = JSON.parse(localStorage.getItem('contacts'));
  const infoIndex = updateContactData(info);

  mobileInput.addEventListener('input', () => {
    info.number = mobileInput.value;

    contactsData[infoIndex] = info;

    localStorage.setItem('contacts', JSON.stringify(contactsData));
  });
  emailInput.addEventListener('input', () => {
    info.email = emailInput.value;

    contactsData[infoIndex] = info;

    localStorage.setItem('contacts', JSON.stringify(contactsData));
  });
  notes.addEventListener('input', () => {
    info.notes = notes.value;

    contactsData[infoIndex] = info;

    localStorage.setItem('contacts', JSON.stringify(contactsData));
  });

  const emailInputLabel = document.createElement('label');
  emailInputLabel.setAttribute('for', 'contact-info-email');
  const emailInputIcon = document.createElement('i');
  emailInputIcon.className = 'fas fa-edit';
  emailInputLabel.append(emailInputIcon);

  email.append(emailTitle, emailInputBlock);
  emailInputBlock.append(emailInput, emailInputLabel);
  infoWrapper.append(email);

  const actionBlock = document.createElement('div');
  actionBlock.className = 'phone__contacts_info_action_block';
  infoWrapper.append(actionBlock);
  const actionData = [
    ['Delete contact', 'phone__contacts_info_action-deletecontact'],
    ['Add to favorites', 'phone__contacts_info_action-addtofavorites'],
  ];
  actionData.forEach((item) => {
    const action = document.createElement('div');
    action.className = `phone__contacts_info_action ${item[1]}`;
    action.textContent = `${item[0]}`;
    if (item[0] === 'Add to favorites') {
      if (info.isFavorite) {
        action.textContent = 'Remove from favorites';
      } else {
        action.textContent = 'Add to favorites';
      }
      action.addEventListener('click', () => {
        let favoriteItem, favoritesList;
        info.isFavorite = !info.isFavorite;
        if (info.isFavorite) {
          action.textContent = 'Remove from favorites';
          if (document.querySelector('.phone__favorites')) {
            favoriteItem = document.querySelector(`#favorite-${info.id}`);
            favoritesList = document.querySelector('.phone__favorites_list');
            generateFavorite(info, favoritesList);
          }
        } else {
          if (document.querySelector('.phone__favorites')) {
            favoriteItem = document.querySelector(`#favorite-${info.id}`);
            favoritesList = document.querySelector('.phone__favorites_list');
            favoriteItem.remove();
          }

          action.textContent = 'Add to favorites';
        }
        updateContactData(info);
      });
    } else if (item[0] === 'Delete contact') {
      action.addEventListener('click', () => {

        contactsData.splice(infoIndex, 1);
        localStorage.setItem('contacts', JSON.stringify(contactsData));

        backBtnBlock.click();
        let contactsWrapper, contactsPage;
        if (document.querySelector('.phone__contacts')) {
          contactsWrapper = document.querySelector('.phone__contacts');
          contactsPage = document.querySelector('.phone__contacts_page');
          if (contactsPage.classList.contains('active')) {
            contactsWrapper.remove();
            const newContactsWrapper = new Contacts();
          }
        }
      });
    }
    actionBlock.append(action);
  });
}
export function createNewContact(parent, phone?) {
  const newContactWrapper = document.createElement('div');
  newContactWrapper.className = 'phone__contacts_new';
  parent.append(newContactWrapper);
  const newContactNav = document.createElement('div');
  newContactNav.className = 'phone__contacts_new_nav';
  newContactWrapper.append(newContactNav);
  const newContactBtnCancel = document.createElement('div');
  newContactBtnCancel.className = 'phone__contacts_new_btn-cancel';
  newContactBtnCancel.textContent = 'Cancel';
  newContactNav.append(newContactBtnCancel);
  const newContactTitle = document.createElement('h2');
  newContactTitle.className = 'phone__contacts_new_title';
  newContactTitle.textContent = 'New Contact';
  newContactNav.append(newContactTitle);
  const newContactBtnDone = document.createElement('div');
  newContactBtnDone.className = 'phone__contacts_new_btn-done';
  newContactBtnDone.textContent = 'Done';
  newContactNav.append(newContactBtnDone);

  newContactBtnCancel.addEventListener('click', () => {
    newContactWrapper.remove();
  });

  const newContactAvatar = document.createElement('div');
  newContactAvatar.className = 'phone__contacts_new_avatar';
  newContactWrapper.append(newContactAvatar);
  const newContactAvatarContent = document.createElement('div');
  newContactAvatarContent.className = 'phone__contacts_new_avatar_content';
  newContactAvatar.append(newContactAvatarContent);
  const newContactAvatarImg = document.createElement('img');
  newContactAvatarImg.className = 'phone__contacts_new_avatar_img';

  const newContactAvatarBtn = document.createElement('div');
  newContactAvatarBtn.className = 'phone__contacts_new_avatar_btn';
  newContactAvatarBtn.textContent = 'Add Photo';
  newContactWrapper.append(newContactAvatarBtn);
  const newContactAvatarInput = document.createElement('input');
  newContactAvatarInput.className = 'phone__contacts_new_avatar_input';
  newContactAvatarInput.type = 'file';
  newContactAvatarInput.accept = 'image/png, image/jpg, image/jpeg';
  newContactWrapper.append(newContactAvatarInput);
  newContactAvatarBtn.addEventListener('click', () => {
    newContactAvatarInput.click();
  });
  let avatarImgData = '';
  newContactAvatarInput.onchange = (e) => {
    const selectedFiles = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      newContactAvatarImg.src = avatarImgData = reader.result as string;
    };
    newContactAvatar.append(newContactAvatarImg);
    reader.readAsDataURL(selectedFiles);
  };

  const newContactInputWrapper = document.createElement('div');
  newContactInputWrapper.className = 'phone__contacts_new_input_wrapper';
  newContactWrapper.append(newContactInputWrapper);

  const newContactInputFirstNameBlock = document.createElement('div');
  newContactInputFirstNameBlock.className = 'phone__contacts_new_input_block';
  newContactInputWrapper.append(newContactInputFirstNameBlock);
  const newContactInputFirstName = document.createElement('input');
  newContactInputFirstName.className = 'phone__contacts_new_input';
  newContactInputFirstName.id = 'newcontact-input-firstname';
  newContactInputFirstName.setAttribute('required', '');
  newContactInputFirstName.placeholder = 'First name';

  // newContactInputFirstName.tabIndex = '-1';
  newContactInputFirstNameBlock.append(newContactInputFirstName);

  const newContactInputLastNameBlock = document.createElement('div');
  newContactInputLastNameBlock.className = 'phone__contacts_new_input_block';
  newContactInputWrapper.append(newContactInputLastNameBlock);
  const newContactInputLastName = document.createElement('input');
  newContactInputLastName.className = 'phone__contacts_new_input';
  newContactInputLastName.id = 'newcontact-input-lastname';
  newContactInputLastName.placeholder = 'Last name';
  // newContactInputLastName.tabIndex = '-1';
  newContactInputLastNameBlock.append(newContactInputLastName);

  const newContactInputPhoneBlock = document.createElement('div');
  newContactInputPhoneBlock.className = 'phone__contacts_new_input_block';
  newContactInputWrapper.append(newContactInputPhoneBlock);
  const newContactInputPhone = document.createElement('input');
  newContactInputPhone.className = 'phone__contacts_new_input';
  newContactInputPhone.id = 'newcontact-input-phone';
  newContactInputPhone.setAttribute('required', '');
  newContactInputPhone.type = 'number';
  newContactInputPhone.placeholder = 'Phone number';
  newContactInputPhoneBlock.append(newContactInputPhone);

  const newContactInputEmailBlock = document.createElement('div');
  newContactInputEmailBlock.className = 'phone__contacts_new_input_block';
  newContactInputWrapper.append(newContactInputEmailBlock);
  const newContactInputEmail = document.createElement('input');
  newContactInputEmail.className = 'phone__contacts_new_input';
  newContactInputEmail.id = 'newcontact-input-mail';
  newContactInputEmail.type = 'mail';
  newContactInputEmail.placeholder = 'Email';
  newContactInputEmailBlock.append(newContactInputEmail);

  const newContactErrorMessage = document.createElement('p');
  newContactErrorMessage.className = 'phone__contacts_new_error';
  newContactWrapper.append(newContactErrorMessage);

  if (phone) {
    phone = phone.split('');
    phone.shift();
    newContactInputPhone.value = phone.join('');
  }
  // newContactInputPhone.tabIndex = '-1';

  newContactBtnDone.addEventListener('click', () => {
    if (newContactInputFirstName.value && newContactInputPhone.value) {
      const contactsData = JSON.parse(localStorage.getItem('contacts'));

      const contactId = contactsData[contactsData.length - 1].id + 1;
      let name = newContactInputFirstName.value;
      if (newContactInputLastName.value) {
        name = `${newContactInputFirstName.value} ${newContactInputLastName.value}`;
      }
      const newContactData = {
        name: name,
        number: newContactInputPhone.value,
        email: newContactInputEmail.value,
        id: contactId,
        avatarImgData: avatarImgData,
        isFavorite: false,
      };
      contactsData.push(newContactData);
      localStorage.setItem('contacts', JSON.stringify(contactsData));

      newContactWrapper.remove();
    } else {
      if (!newContactInputFirstName.value && !newContactInputPhone.value) {
        newContactErrorMessage.textContent =
          'You must enter name and phone number.';
        const firstNameError = createError();
        newContactInputFirstNameBlock.append(firstNameError);
        newContactInputFirstName.addEventListener('input', () => {
          if (newContactInputFirstName.value) {
            firstNameError.style.opacity = '0';
          } else {
            firstNameError.style.opacity = '1';
          }
        });
        const phoneError = createError();
        newContactInputPhoneBlock.append(phoneError);
        newContactInputPhone.addEventListener('input', () => {
          if (newContactInputPhone.value) {
            phoneError.style.opacity = '0';
          } else {
            phoneError.style.opacity = '1';
          }
        });
      } else if (!newContactInputFirstName.value) {
        newContactErrorMessage.textContent = 'You must enter name.';
        const firstNameError = createError();
        newContactInputFirstNameBlock.append(firstNameError);
        newContactInputFirstName.addEventListener('input', () => {
          if (newContactInputFirstName.value) {
            firstNameError.style.opacity = '0';
          } else {
            firstNameError.style.opacity = '1';
          }
        });
      } else if (!newContactInputPhone.value) {
        newContactErrorMessage.textContent = 'You must enter phone number.';
        const phoneError = createError();
        newContactInputPhoneBlock.append(phoneError);
        newContactInputPhone.addEventListener('input', () => {
          if (newContactInputPhone.value) {
            phoneError.style.opacity = '0';
          } else {
            phoneError.style.opacity = '1';
          }
        });
      }
    }
    let contactsWrapper;
    let contactsPage;

    if (document.querySelector('.phone__contacts')) {
      contactsWrapper = document.querySelector('.phone__contacts');
      contactsPage = document.querySelector('.phone__contacts_page');
    }

    if (contactsPage) {
      if (contactsPage.classList.contains('active')) {
        contactsWrapper.remove();
        const contacts = new Contacts();
      }
    }
  });
  function createError() {
    const error = document.createElement('p');
    error.className = 'phone__contacts_new_input_error';
    error.textContent = '!';
    return error;
  }
}

export function updateContactData(info) {
  const contactsData = JSON.parse(localStorage.getItem('contacts'));
  let infoIndex;
  for (let i = 0; i < contactsData.length; i++) {
    if (contactsData[i].id === info.id) {
      contactsData[i] = info;
      infoIndex = i;
      break;
    }
  }

  localStorage.setItem('contacts', JSON.stringify(contactsData));

  return infoIndex;
}

export function generateGroups(targets) {
  const contactsWrapper = document.querySelector('.phone__contacts_wrapper');
  const group = document.createElement('div');
  group.className = 'phone__contacts_group';
  targets.sort((textA, textB) => {
    textA = textA.name;
    textB = textB.name;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  targets.forEach((item) => {
    const contactInfo = item;

    if (document.querySelector(`#group-${contactInfo.name[0].toUpperCase()}`)) {
      document
        .querySelector(`#group-${contactInfo.name[0].toUpperCase()}`)
        .append(generateItem(contactInfo));
    } else if (
      !document.querySelector(`#group-${contactInfo.name[0].toUpperCase()}`)
    ) {
      const letterGroup = document.createElement('div');
      letterGroup.className = 'phone__contacts_group';
      letterGroup.id = `group-${contactInfo.name[0].toUpperCase()}`;

      const letter = document.createElement('p');
      letter.className = 'phone__contacts_group_letter';
      letter.textContent = contactInfo.name[0].toUpperCase();

      letterGroup.append(letter);
      letterGroup.append(generateItem(contactInfo));
      contactsWrapper.append(letterGroup);
    }
  });

  function generateItem(info) {
    const item = document.createElement('p');
    item.className = 'phone__contacts_group_item';
    item.textContent = info.name;
    item.addEventListener('click', () => {
      generateContactInfo(
        info,
        document.querySelector('.phone__contacts_wrapper-info')
      );
    });
    return item;
  }
}
