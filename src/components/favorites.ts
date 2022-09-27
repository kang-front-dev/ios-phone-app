import { generateContactInfo } from './contacts';
import { addToRecents } from './recents';
export class Favorites {
  private phonePages;
  constructor() {
    this.phonePages = document.querySelector('.phone__pages');
    const favoriteAndInfoWrapper = document.createElement('div');
    favoriteAndInfoWrapper.className = 'phone__favorites_info phone__favorites';
    this.phonePages.append(favoriteAndInfoWrapper);

    const favoritesWrapper = document.createElement('div');
    favoritesWrapper.className = 'phone__favorites_page phone__page active';
    favoriteAndInfoWrapper.append(favoritesWrapper);

    const favoritesTitle = document.createElement('h1');
    favoritesTitle.className = 'phone__favorites_title';
    favoritesTitle.textContent = 'Favorites';
    favoritesWrapper.append(favoritesTitle);

    const favoritesList = document.createElement('div');
    favoritesList.className = 'phone__favorites_list';
    favoritesWrapper.append(favoritesList);

    if (localStorage.getItem('contacts')) {
      const contactsData = JSON.parse(localStorage.getItem('contacts'));

      for (let i = 0; i < contactsData.length; i++) {
        if (
          contactsData[i].hasOwnProperty('isFavorite') &&
          contactsData[i].isFavorite
        ) {
          console.log('wew');

          generateFavorite(contactsData[i], favoritesList);
        }
      }
    }
  }
}

export function generateFavorite(info, parent) {
  const favoritesAndInfoWrapper = document.querySelector('.phone__favorites');
  const item = document.createElement('a');
  item.className = 'phone__favorites_list_item';
  item.href = `tel:${info.number}`
  parent.append(item);
  item.id = `favorite-${info.id}`;

  item.addEventListener('click',()=>{
    addToRecents(info)
  })

  const avatar = document.createElement('div');
  avatar.className = 'phone__favorites_list_item_avatar';
  item.append(avatar);

  if (info.avatarImgData) {
    const avatarImg = document.createElement('img');
    avatarImg.className = 'phone__favorites_list_item_avatar_img';
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
  const itemBody = document.createElement('div');
  itemBody.className = 'phone__favorites_list_item_body';
  item.append(itemBody);

  const itemTextBlock = document.createElement('div');
  itemTextBlock.className = 'phone__favorites_list_item_text_block';
  itemBody.append(itemTextBlock);

  const itemNameBlock = document.createElement('div');
  itemNameBlock.className = 'phone__favorites_list_item_name_block';
  itemTextBlock.append(itemNameBlock);

  const itemName = document.createElement('h3');
  itemName.className = 'phone__favorites_list_item_name';
  itemName.textContent = info.name;
  itemNameBlock.append(itemName);

  const itemNameIcon = document.createElement('i');
  itemNameIcon.className = 'fas fa-star';
  itemNameBlock.append(itemNameIcon);

  const itemNumber = document.createElement('p');
  itemNumber.className = 'phone__favorites_list_item_number';
  itemNumber.textContent = `+${info.number}`;
  itemTextBlock.append(itemNumber);

  const infoIcon = document.createElement('div');
  infoIcon.className = 'phone__favorites_list_item_info';
  infoIcon.textContent = 'i';
  itemBody.append(infoIcon);

  infoIcon.addEventListener('click', () => {
    generateContactInfo(info, favoritesAndInfoWrapper);
  });
}
