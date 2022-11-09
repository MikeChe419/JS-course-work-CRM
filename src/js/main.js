(() => {
    // Создаем форму поиска
    function createQueryForm () {
        const form = document.createElement('form');
        const link = document.createElement('a');
        const img = document.createElement('img');
        const input = document.createElement('input');
        const formWrapper = document.createElement('div');

        img.setAttribute('src', '/images/Logo.svg');
        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите запрос';
        formWrapper.classList.add('wrapper', 'pt-4', 'pl-3', 'mb-3');
        link.classList.add('mr-3');

        link.append(img);
        form.append(input);
        formWrapper.append(link);
        formWrapper.append(form);
        
        return {
            formWrapper,
            form,
            input,
            link,
        }
    }
    // Создаем и возвращаем заголовок приложения
    function createAppTitle (title) {
        const appTitle = document.createElement('h2')
        appTitle.textContent = title;
        appTitle.classList.add('app-title', 'mb-3');
        return appTitle;
    }

    //Создаем и возвращаем заголовок таблицы
    function createTableHead () {
        let tableHead = document.getElementById('heading-table');
        let headRow =`<tbody>
            <tr class="row head-row">
              <td id="ID">ID</td>
              <td id="sortName">Фамилия Имя Отчество</td>
              <td id ="sortCreateTime">Дата и время создания</td>
              <td id ="sortLastChanges">Последние измения</td>
              <td>Контакты</td>
              <td>Действия</td>
              </tr>
         </tbody>`
        tableHead.innerHTML = headRow;
        return {
           tableHead
        }
     }

    //Создаем и возвращаем кнопку добавления клиента
    function createAddButton() {
        const addBtn = document.createElement('button');
        const btnRow = document.createElement('div');
        const i = document.createElement('i');
        i.classList.add('fas', 'fa-user-plus');
        btnRow.classList.add('row', 'add-btn-row');
        addBtn.classList.add('btn', 'btn-light', 'add-client-btn');
        addBtn.setAttribute('data-target', '#staticBackdrop');
        addBtn.setAttribute('data-toggle', 'modal');
        addBtn.textContent = ' Добавить пользователя';
        addBtn.prepend(i)
        btnRow.append(addBtn);
        return {
            btnRow,
            addBtn,
        } 
    }

    //Создаем и возвращаем таблицу клиентов
    async function createClientTable ()  {
        const table = document.getElementById('client-table');
        table.innerHTML ='';

        const response = await fetch('http://localhost:3000/api/clients');
        const clientsList = await response.json();

        for (let i=0; i < clientsList.length; i++) {
            const createTime = clientsList[i].createdAt.slice(0, 10)
            const row = `<tr class='row, client__row'>
            <td>${clientsList[i].id}</td>
            <td class='client__item-cell' id ="fullName">${clientsList[i].name + '&nbsp;' + clientsList[i].surname}</td>
            <td class='client__item-cell'  id ="CreateTime">${createTime}</td>
            <td class='client__item-cell'  id ="LastChanges">Последние измения</td>
            <td class='client__item-cell'  id ='Contacts'>Контакты</td>
            <td class='client__item-cell'и >Действия</td>
        </tr>`
        table.innerHTML += row;
        }
      }

      // Создаем и возвращаем форму добавления(в перспиктивее и изменения) клиента
    function createAddClientForm(container, title) {
      const modalFade = document.createElement('div');
      const modalDialog = document.createElement('div');
      const modalContent = document.createElement('div');
      const modalHeader = document.createElement('div');
      const modalTitle = document.createElement('h5');
      const modalBody = document.createElement('div');
      const form = document.createElement('form');
      const modalFooter = document.createElement('div');
      const lastNameInput = document.createElement('input');
      const nameInput = document.createElement('input');
      const sureNameInput = document.createElement('input');
      const contactWrapper = document.createElement('div');
      const addContacts = document.createElement('button');
      const contactsList = document.createElement('ul');
      const closeBtn = document.createElement('button');
      const saveBtn  = document.createElement('button');


      modalFade.classList.add('modal', 'fade');
      modalFade.setAttribute('id', 'staticBackdrop');
      modalFade.setAttribute('data-backdrop', 'static');
      modalFade.setAttribute('aria-labelledby', 'staticBackdropLabel');
      modalDialog.classList.add('modal-dialog');
      modalContent.classList.add('modal-content');
      modalHeader.classList.add('modal-header');
      modalBody.classList.add('modal-body');
      modalFooter.classList.add('modal-footer');
      modalTitle.textContent = title;
      lastNameInput.classList.add('form-control', 'modal-input', 'mb-3');
      lastNameInput.placeholder = 'Фамилия *'
      nameInput.classList.add('form-control', 'modal-input', 'mb-3');
      nameInput.placeholder = 'Имя *'
      sureNameInput.classList.add('form-control', 'modal-input', 'mb-3');
      sureNameInput.placeholder = 'Отчество';
      closeBtn.setAttribute('data-dismiss', 'modal');
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.classList.add('btn', 'bottom-close-btn');
      closeBtn.textContent = 'Отмена'
      saveBtn.classList.add('btn', 'save-btn');
      saveBtn.textContent = 'Сохранить';
      saveBtn.setAttribute('type', 'submit');
      addContacts.textContent = 'Добавить контакт';
      addContacts.classList.add('btn', 'contacts__btn');
      form.classList.add('modal-form')
      form.setAttribute('style', 'display: flex; flex-direction: column; align-items: center');
      contactWrapper.classList.add('mb-3', 'modal__contact-wrapper');
      contactsList.classList.add('list-group', 'contacts-list');

      contactWrapper.append(contactsList);
      contactWrapper.append(addContacts);
      form.append(lastNameInput);
      form.append(nameInput);
      form.append(sureNameInput);
      form.append(contactWrapper);
      form.append(saveBtn);
      modalHeader.append(modalTitle);
      modalBody.append(form);
      modalFooter.append(closeBtn);
      modalContent.append(modalHeader);
      modalContent.append(modalBody);
      modalContent.append(modalFooter);
      modalDialog.append(modalContent);
      modalFade.append(modalDialog);
      container.append(modalFade);
      
      

       addContacts.addEventListener('click', (e) => {
         e.preventDefault();
         let numberContacts = document.getElementsByClassName('contact-group');
         if (numberContacts.length < 9) {
            let newContact = createContactsItem();
             contactsList.append(newContact.contactsItem)
            return 
         } else return;
     }) 
      return {
        closeBtn,
        saveBtn,
        form,
        lastNameInput,
        sureNameInput,
        nameInput,
        addContacts,
        contactsList,
      }
    }

    // Создаем и возвращаем форму добавления контактов клиента
     function createContactsItem () {
        // const container = document.querySelector('.contacts-list');
        const contactsItem = document.createElement('li');
        const contactSelect = document.createElement('select');
        const phoneOption = document.createElement('option');
        const emailOption = document.createElement('option');
        const facebookOption = document.createElement('option');
        const vkOption = document.createElement('option');
        const otherOption = document.createElement('option');
        const contactInput = document.createElement('input');
        const clearContactBtn = document.createElement('button');
        const contactBtnSpan = document.createElement('span');

         contactSelect.setAttribute('style', 'width: 125px;');
         contactInput.setAttribute('style', 'width: 240px;');
         contactSelect.classList.add('form-control', 'contact-form', 'contact-select');
         contactInput.classList.add('form-control', 'contact-form');
         contactsItem.classList.add('contact-group', 'mb-3');
         clearContactBtn.classList.add('btn', 'clear-contact-btn');
         contactBtnSpan.classList.add('contact__cleare-btn-span');
         phoneOption.textContent = 'Телефон';
         emailOption.textContent = 'Email';
         facebookOption.textContent = 'Facebook';
         vkOption.textContent ='VK';
         otherOption.textContent = 'Другое';
         phoneOption.setAttribute('value', 'phone');
         phoneOption.setAttribute('selected', 'selected')
         emailOption.setAttribute('value', 'mail');
         facebookOption.setAttribute('value', 'fb');
         vkOption.setAttribute('value', 'vk');
         otherOption.setAttribute('value', 'other');

         contactSelect.append(phoneOption);
         contactSelect.append(emailOption);
         contactSelect.append(facebookOption);
         contactSelect.append(vkOption);
         contactSelect.append(otherOption);
         clearContactBtn.append(contactBtnSpan);
         contactsItem.append(contactSelect);
         contactsItem.append(contactInput);
         contactsItem.append(clearContactBtn);
        // container.append(contactsItem);

         switch (contactSelect.value) {
             case('phone'):
             contactInput.setAttribute('type', 'tel');
             contactInput.setAttribute('id', 'phone');
             contactSelect.setAttribute('id', 'phone-select');
             break;
         }

         contactSelect.addEventListener('change', ()=> {
             switch (contactSelect.value) {
                 case('phone'):
                 contactInput.setAttribute('type', 'tel');
                 contactInput.setAttribute('id', 'phone');
                 contactSelect.setAttribute('id', 'phone-select');
                 break;
                 case('mail'):
                 contactInput.setAttribute('type', 'email');
                 contactInput.setAttribute('id', 'mail');
                 contactSelect.setAttribute('id', 'mail-select');
                 break;
                 case('fb' || 'vk' || 'other'):
                 contactInput.setAttribute('type', 'text')
                 break;
             }
         })

         return {
            contactsItem,
            contactSelect,
            contactInput,  
            clearContactBtn,
        }
     }

    const queryForm = createQueryForm();

    // Создаем функцию приложения
    function createAppCRM (container, title="Клиенты") {
        const appTitle = createAppTitle(title);
        const addClientBtn = createAddButton();
        const modalAddClient = createAddClientForm(container, 'Новый клиент');
        createTableHead();
        createClientTable();
        createAddClientForm(container, 'Новый клиент');

        modalAddClient.saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!modalAddClient.nameInput.value || !modalAddClient.lastNameInput.value)
                 return;

            const response = await fetch('http://localhost:3000/api/clients', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        name: modalAddClient.nameInput.value.trim(),
                        lastName: modalAddClient.sureNameInput.value.trim(),
                        surname: modalAddClient.lastNameInput.value.trim(),
                        // contacts: [document.getElementById('phone-select').value, document.getElementById('phone').value]
                        
                    }
                ),
                headers:
                {
                    'Content-Type': 'application/json',
                },
            });
            // const clientItem = await response.json();
            createClientTable ()
            
        }); 
        container.prepend(appTitle);
        container.prepend(queryForm.formWrapper);
        container.append(addClientBtn.btnRow);
    }

    createAppCRM(document.getElementById('container'))
})();