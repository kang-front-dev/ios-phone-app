import { Contacts } from './contacts';
import { Keypad } from './keypad';
import { Recents } from './recents';
import { Favorites } from './favorites';
import { createNewContact } from './contacts';

import { defaultContacts, defaultRecents } from './defaultContacts';

export class App {
  init() {
    if (!localStorage.getItem('contacts')) {
      localStorage.setItem('contacts', JSON.stringify(defaultContacts));
    }
    if (!localStorage.getItem('recents')) {
      localStorage.setItem('recents', JSON.stringify(defaultRecents));
    }
    this.initNav();
    this.initStatusbar();
  }
  initStatusbar() {
    const timeEl = document.querySelector('.phone__status_time');
    updateTime(timeEl);
    setInterval(() => {
      updateTime(timeEl);
    }, 1000);
    function updateTime(el) {
      const date = new Date();
      const hours = date.getHours();
      const minutes =
        date.getMinutes() <= 10 ? `0${date.getMinutes()}` : date.getMinutes();

      el.textContent = `${hours}:${minutes}`;
    }
  }
  initNav() {
    const phoneNav = document.querySelector('.phone__nav');
    const phoneStatusbar = document.querySelector('.phone__status');

    const favorites = document.querySelector('.phone__nav_favorite'),
      recents = document.querySelector('.phone__nav_recents'),
      contacts = document.querySelector('.phone__nav_contacts'),
      keypad = document.querySelector('.phone__nav_keypad');
    const contactsPage = new Contacts();
    // const keypadPage = new Keypad();
    // const recentsPage = new Recents()
    let activePage = 'contacts';

    phoneNav.addEventListener('click', (e) => {
      if (e.target === favorites) {
        phoneStatusbar.classList.remove('active');
        phoneStatusbar.classList.add('disabled');
        setTimeout(() => {
          phoneStatusbar.classList.remove('disabled');
        }, 0);

        removePage(`.phone__${activePage}`);
        resetActives();
        favorites.classList.add('active');
        const favoritesPage = new Favorites();
        activePage = 'favorites';
      } else if (e.target === recents) {
        phoneStatusbar.classList.remove('active');
        phoneStatusbar.classList.add('disabled');
        setTimeout(() => {
          phoneStatusbar.classList.remove('disabled');
        }, 0);

        removePage(`.phone__${activePage}`);
        resetActives();
        recents.classList.add('active');
        const recentsPage = new Recents();
        activePage = 'recents';
      } else if (e.target === contacts && activePage != 'contacts') {
        phoneStatusbar.classList.remove('active');
        phoneStatusbar.classList.add('disabled');
        setTimeout(() => {
          phoneStatusbar.classList.remove('disabled');
        }, 0);

        removePage(`.phone__${activePage}`);
        resetActives();
        contacts.classList.add('active');
        const contactsPage = new Contacts();
        activePage = 'contacts';
      } else if (e.target === keypad && activePage != 'keypad') {
        phoneStatusbar.classList.remove('active');
        phoneStatusbar.classList.add('disabled');
        setTimeout(() => {
          phoneStatusbar.classList.remove('disabled');
        }, 0);

        removePage(`.phone__${activePage}`);
        resetActives();
        keypad.classList.add('active');
        const keypadPage = new Keypad();
        activePage = 'keypad';
      }
    });
    const phoneItems = document.querySelectorAll('.phone__nav_item');
    function resetActives() {
      phoneItems.forEach((item) => {
        item.classList.remove('active');
      });
    }
    function removePage(selector) {
      document.querySelector(selector).remove();
    }
  }
}
