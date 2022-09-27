export class Recents {
  private phonePages;
  constructor() {
    this.phonePages = document.querySelector('.phone__pages');

    const recentsWrapper = document.createElement('div');
    recentsWrapper.className = 'phone__recents phone__page active';
    this.phonePages.append(recentsWrapper);

    const recentsTogglerBlock = document.createElement('div');
    recentsTogglerBlock.className = 'phone__recents_toggler_block';
    const recentsTogglerAll = document.createElement('div');
    recentsTogglerAll.className = 'phone__recents_toggler_item active';
    recentsTogglerAll.id = 'toggler-all';
    recentsTogglerAll.textContent = 'All';
    const recentsTogglerMissed = document.createElement('div');
    recentsTogglerAll.id = 'toggler-missed';
    recentsTogglerMissed.className = 'phone__recents_toggler_item';
    recentsTogglerMissed.textContent = 'Missed';
    const recentsToggler = document.createElement('div');
    recentsToggler.className = 'phone__recents_toggler';
    recentsTogglerBlock.append(
      recentsTogglerAll,
      recentsTogglerMissed,
      recentsToggler
    );
    recentsWrapper.append(recentsTogglerBlock);

    let activeToggle = 'all';
    recentsTogglerAll.addEventListener('click', () => {
      if (activeToggle != 'all') {
        recentsToggler.style.left = `2px`;
        activeToggle = 'all';
        recentsTogglerMissed.classList.remove('active');
        recentsTogglerAll.classList.add('active');
        document.querySelector('.phone__recents_list').remove();
        generateCalls('all');
      }
    });
    recentsTogglerMissed.addEventListener('click', () => {
      if (activeToggle != 'missed') {
        recentsToggler.style.left = `73px`;
        activeToggle = 'missed';
        recentsTogglerMissed.classList.add('active');
        recentsTogglerAll.classList.remove('active');
        document.querySelector('.phone__recents_list').remove();
        generateCalls('missed');
      }
    });

    const recentsTitle = document.createElement('h1');
    recentsTitle.className = 'phone__recents_title';
    recentsTitle.textContent = 'Recents';
    recentsWrapper.append(recentsTitle);

    // const recentsData = [['Michael', '+998909757316', '16/09/2022/17:48:41', 'income'],['Kostya','+998911900184','19/09/2022','outcome']];

    generateCalls('all');
    type callMode = 'all' | 'missed';
    function generateCalls(callMode) {
      const recentsList = document.createElement('div');
      recentsList.className = 'phone__recents_list';
      recentsWrapper.append(recentsList);
      if (localStorage.getItem('recents')) {
        const recentsData = JSON.parse(localStorage.getItem('recents'));

        for (let i = 0; i < recentsData.length; i++) {
          const reverseKey = recentsData.length - 1 - i;

          if (callMode === 'missed') {
            if (recentsData[reverseKey].mode === 'income') {
              createItems(recentsData[reverseKey]);
            }
          } else if (callMode === 'all') {
            createItems(recentsData[reverseKey]);
          }
        }
      }
      function createItems(info) {
        console.log(info);

        const item = document.createElement('div');
        item.className = `phone__recents_item`;
        item.classList.add(info.mode);
        item.id = `recents-call-${info.id}`;
        recentsList.append(item);

        const itemIconBlock = document.createElement('div');
        itemIconBlock.className = 'phone__recents_item_icon_block';
        const itemIconPhone = document.createElement('i');
        itemIconPhone.className = 'fas fa-phone-alt';
        const itemIconArrow = document.createElement('i');
        itemIconArrow.className = 'fas fa-long-arrow-up';
        itemIconBlock.append(itemIconPhone, itemIconArrow);
        item.append(itemIconBlock);

        const itemBody = document.createElement('div');
        itemBody.className = 'phone__recents_item_body';
        item.append(itemBody);

        const itemBodyTextBlock = document.createElement('div');
        itemBodyTextBlock.className = 'phone__recents_item_body_block-text';

        const itemNameBlock = document.createElement('div');
        itemNameBlock.className = 'phone__recents_item_name_block';
        const itemName = document.createElement('h3');
        itemName.className = 'phone__recents_item_name';
        itemName.textContent = info.name;
        itemNameBlock.append(itemName)

        if (info.isFavorite) {
          const itemNameFavIcon = document.createElement('i');
          itemNameFavIcon.className = 'fas fa-star';
          itemNameBlock.append(itemNameFavIcon);
        }

        const itemNumber = document.createElement('p');
        itemNumber.className = 'phone__recents_item_number';
        itemNumber.textContent = `+${info.number}`;
        itemBodyTextBlock.append(itemNameBlock, itemNumber);
        itemBody.append(itemBodyTextBlock);

        const itemBodyInfoBlock = document.createElement('div');
        itemBodyInfoBlock.className = 'phone__recents_item_body_block-info';
        const itemDate = document.createElement('h3');
        itemDate.className = 'phone__recents_item_date';
        itemDate.textContent = info.date;
        const itemInfoBtn = document.createElement('div');
        itemInfoBtn.className = 'phone__recents_item_btn-info';
        itemInfoBtn.textContent = 'i';
        itemBodyInfoBlock.append(itemDate, itemInfoBtn);
        itemBody.append(itemBodyInfoBlock);
        itemInfoBtn.addEventListener('click', () => {
          const itemInfoBackground = document.createElement('div');
          itemInfoBackground.className = 'phone__recents_item_info_bg';
          document.querySelector('.phone').append(itemInfoBackground);
          itemInfoBackground.addEventListener('click', () => {
            itemInfoBackground.remove();
          });
          const itemInfoWrapper = document.createElement('div');
          itemInfoWrapper.className = 'phone__recents_item_info';
          itemInfoBackground.append(itemInfoWrapper);

          const itemInfoCopyBtn = document.createElement('div');
          itemInfoCopyBtn.className =
            'phone__recents_item_info_btn phone__recents_item_info_btn-copy';
          const itemInfoCopyBtnIcon = document.createElement('i');
          itemInfoCopyBtnIcon.className = 'far fa-clone';
          const itemInfoCopyBtnText = document.createElement('h3');
          itemInfoCopyBtnText.className = 'phone__recents_item_info_btn_text';
          itemInfoCopyBtnText.textContent = 'Copy number to clipboard';
          itemInfoCopyBtn.append(itemInfoCopyBtnIcon, itemInfoCopyBtnText);
          itemInfoWrapper.append(itemInfoCopyBtn);

          const itemInfoDeleteBtn = document.createElement('div');
          itemInfoDeleteBtn.className =
            'phone__recents_item_info_btn phone__recents_item_info_btn-delete';
          const itemInfoDeleteBtnIcon = document.createElement('i');
          itemInfoDeleteBtnIcon.className = 'fas fa-trash';
          const itemInfoDeleteBtnText = document.createElement('h3');
          itemInfoDeleteBtnText.textContent = 'Delete';
          itemInfoDeleteBtnText.className = 'phone__recents_item_info_btn_text';
          itemInfoDeleteBtn.append(
            itemInfoDeleteBtnIcon,
            itemInfoDeleteBtnText
          );
          itemInfoWrapper.append(itemInfoDeleteBtn);
          itemInfoDeleteBtn.addEventListener('click', () => {
            const recentsData = JSON.parse(localStorage.getItem('recents'));
            let itemKey;
            for (let i = 0; i < recentsData.length; i++) {
              if (info.id === recentsData[i].id) {
                itemKey = i;
                break;
              }
            }
            recentsData.splice(itemKey, 1);
            localStorage.setItem('recents', JSON.stringify(recentsData));
            item.remove();
          });

          const itemInfoAddBtn = document.createElement('div');
          itemInfoAddBtn.className =
            'phone__recents_item_info_btn phone__recents_item_info_btn-add';
          const itemInfoAddBtnIcon = document.createElement('i');
          itemInfoAddBtnIcon.className = 'fas fa-user-plus';
          const itemInfoAddBtnText = document.createElement('h3');
          itemInfoAddBtnText.textContent = 'Add number to contact';
          itemInfoAddBtnText.className = 'phone__recents_item_info_btn_text';
          itemInfoAddBtn.append(itemInfoAddBtnIcon, itemInfoAddBtnText);
          itemInfoWrapper.append(itemInfoAddBtn);
        });
      }
    }
  }
}

export function addToRecents(info) {
  if (localStorage.getItem('recents')) {
    const recentsData = JSON.parse(localStorage.getItem('recents'));

    const date = new Date();
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    const newData = info;
    newData.date = `${hours}:${minutes}:${seconds}`;
    newData.mode = 'outcome';
    // const newData = {
    //   name: info.name,
    //   number: info.number,
    //   date: `${hours}:${minutes}:${seconds}`,
    //   mode: 'outcome',
    //   id: info.id,
    // };

    recentsData.push(newData);

    localStorage.setItem('recents', JSON.stringify(recentsData));
  } else {
    const date = new Date();
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    const newData = info;
    newData.date = `${hours}:${minutes}:${seconds}`;
    newData.mode = 'outcome';

    localStorage.setItem('recents', JSON.stringify([newData]));
  }
}
