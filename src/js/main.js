(() => {
    const URI = 'http://localhost:3000/api/clients';
    let objClient = {};
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
              <td id="sort-name">Фамилия Имя Отчество</td>
              <td id ="sort-create-time">Дата и время создания</td>
              <td id ="sort-last-edits">Последние измения</td>
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

    //Создаем и возвращаем блок редактирования и удаления 
    function createEditWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add("table__btn-wrapper");
        const editBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-link', 'edit-client-btn');
        delBtn.classList.add('btn', 'btn-link', 'del-client-btn');
        delBtn.setAttribute('data-target', '#delModal');
        delBtn.setAttribute('data-toggle', 'modal')
        editBtn.textContent = 'Изменить';
        delBtn.textContent = 'Удалить';

        wrapper.append(editBtn);
        wrapper.append(delBtn);


        return {
            wrapper,
            delBtn,
            editBtn,
        }
    }

    //Создаем шаблон модального окна с использованием bootstrap
    function createModalContainer (container) {
        const modalDialog = document.createElement('div');
        const modalContent = document.createElement('div');
        const modalHeader = document.createElement('div');
        const headerCloseBtn = document.createElement('button');
        const span = document.createElement('span');
        const modalTitle = document.createElement('h5');
        const modalBody = document.createElement('div');
        const modalFooter = document.createElement('div');
        const closeBtn = document.createElement('button');

        modalDialog.classList.add('modal-dialog');
        modalContent.classList.add('modal-content');
        modalHeader.classList.add('modal-header');
        modalTitle. classList.add('modal__title');
        modalBody.classList.add('modal-body');
        modalFooter.classList.add('modal-footer');
        headerCloseBtn.setAttribute('type', 'button');
        headerCloseBtn.setAttribute('data-dismiss', 'modal');
        headerCloseBtn.setAttribute('aria-label', 'Close');
        headerCloseBtn.classList.add('close');
        span.innerHTML = '&times';
        headerCloseBtn.append(span);
        closeBtn.setAttribute('data-dismiss', 'modal');
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.classList.add('btn', 'bottom-close-btn');
        closeBtn.textContent = 'Отмена'
        modalHeader.append(modalTitle);
        modalHeader.append(headerCloseBtn);
        modalFooter.append(closeBtn);
        modalContent.append(modalHeader);
        modalContent.append(modalBody);
        modalContent.append(modalFooter);
        modalDialog.append(modalContent);
        container.append(modalDialog);

        return {
            modalDialog,
            modalHeader,
            modalFooter,
            modalBody,
            modalTitle,
            closeBtn
        }
    } 

    //Создаем и возвращаем модальное окно удаления клиента
    function delClientModal(container) {
        const modal = document.createElement('div');
        const modalDel = createModalContainer(modal);
        const p = document.createElement('p');
        const deleteBtn = document.createElement('button');

        p.classList.add('modal__del-text');
        p.textContent = 'Вы действительно хотите удалить данного клиента?'
        p.classList.add('modal__del-body-text')
        modal.classList.add('modal', 'fade');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('id', 'delModal');
        deleteBtn.classList.add('btn', 'save-btn');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.setAttribute('data-dismiss', 'modal');
        modalDel.modalTitle.textContent = "Удалить клиента";
        modalDel.modalBody.classList.add('modal__del-body');
        modalDel.modalTitle.classList.add('modal__del-title')

        modalDel.modalBody.append(p);
        modalDel.modalBody.append(deleteBtn);
        container.append(modal);

        return {
            deleteBtn
        } 
    }

    // Создаем и возвращаем форму добавления клиента
    function createAddClientForm(container, title) {
        const modalFade = document.createElement('div');
        const modalAdd = createModalContainer (modalFade) 
        const form = document.createElement('form');
        const lastNameInput = document.createElement('input');
        const nameInput = document.createElement('input');
        const sureNameInput = document.createElement('input');
        const contactWrapper = document.createElement('div');
        const addContacts = document.createElement('button');
        const contactsList = document.createElement('ul');
        const saveBtn  = document.createElement('button');

        modalFade.classList.add('modal', 'fade');
        modalFade.setAttribute('id', 'staticBackdrop');
        modalFade.setAttribute('data-backdrop', 'static');
        modalFade.setAttribute('aria-labelledby', 'staticBackdropLabel');
        modalAdd.modalTitle.textContent = title;
        lastNameInput.classList.add('form-control', 'modal-input', 'mb-3');
        lastNameInput.placeholder = 'Фамилия *'
        nameInput.classList.add('form-control', 'modal-input', 'mb-3');
        nameInput.placeholder = 'Имя *'
        sureNameInput.classList.add('form-control', 'modal-input', 'mb-3');
        sureNameInput.placeholder = 'Отчество';
        saveBtn.classList.add('btn', 'save-btn');
        saveBtn.textContent = 'Сохранить';
        saveBtn.setAttribute('type', 'submit');
        addContacts.textContent = 'Добавить контакт';
        addContacts.classList.add('btn', 'contacts__btn');
        form.classList.add('modal-form')
        form.setAttribute('style', 'display: flex; flex-direction: column; align-items: center');
        contactWrapper.classList.add('mb-3', 'modal__contact-wrapper');
        contactsList.classList.add('list-group', 'contacts-list');
        saveBtn.setAttribute('data-dismiss', 'modal');
        contactWrapper.append(contactsList);
        contactWrapper.append(addContacts);
        form.append(lastNameInput);
        form.append(nameInput);
        form.append(sureNameInput);
        form.append(contactWrapper);
        form.append(saveBtn);
        modalAdd.modalBody.append(form);
        container.append(modalFade);

        //Кнопка добавления контактов
        addContacts.addEventListener('click', (e, contact = createContactsItem(contactsList)) => {
            e.preventDefault();
            let numberContacts = document.getElementsByClassName('contact-group');
            if (numberContacts.length >=9) return;
        })

        //Кнопка сохранения и отправки данных о кленте на сервер
        saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!nameInput.value || !lastNameInput.value) return;

            const contactDataArr = document.querySelectorAll('.contact-input');
            let contactArr = [];
            if (contactDataArr)
                contactDataArr.forEach(input => contactArr.push({
                    type: input.type,
                    value: input.value
                }))

            const response = await fetch(URI, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        name: nameInput.value.trim(),
                        lastName: sureNameInput.value.trim(),
                        surname: lastNameInput.value.trim(),
                        contacts: contactArr,
                    },
                ),
                headers:
                {
                    'Content-Type': 'application/json',
                },
            });
            createClientTable();
            nameInput.value = "";
            sureNameInput.value = "";
            lastNameInput.value= "";
            document.querySelectorAll('.contact-group').forEach(item => item.remove());
        }); 

        return {
            saveBtn,
            form,
            lastNameInput,
            sureNameInput,
            nameInput,
            addContacts,
            contactsList,
        }
    }

    const modalAddClient = createAddClientForm(container, 'Новый клиент');
    const modalDelClient = delClientModal(container);
    const queryForm = createQueryForm();

    // Получаем дату из json
    function formatDate(str) {
        return str.slice(8, 10) + '.' + str.slice(5, 7) + '.' + str.slice(0, 4);
    }
    // Получаем время из json
    function formatTime(str) {
        return str.slice(11, 16);
    }

    //Создаем и возвращаем таблицу клиентов
    async function createClientTable()  {
        const table = document.getElementById('client-table');
        const response = await fetch(URI);
        const clientsList = await response.json();

        table.innerHTML ='';
        for (let i=0; i < clientsList.length; i++) {
            const createTime = clientsList[i].createdAt;
            const updateTime = clientsList[i].updatedAt;
            let contactList = {};
            const ul = document.createElement('ul');
            ul.classList.add('table_contacts-list');
            const actions = createEditWrapper();

            if ( typeof clientsList[i].lastname === 'undefined') {
                clientsList[i].lastname = '';
            };
            
            if (typeof clientsList[i].contacts !== 'undefined') {
                contactList = clientsList[i].contacts.map(item => {
                    const li = document.createElement('li');
                    li.textContent = item.value;
                    return li
                });
                contactList.forEach(item => ul.append(item));
            };

            const row = `<tr class='row, client__row'>
            <td>${clientsList[i].id}</td>
                <td class='client__item-cell' id ="fullname">${clientsList[i].name + ' ' + clientsList[i].lastName + ' ' + clientsList[i].surname}</td>
                <td class='client__item-cell' id ="create-time"><span class='day'>${formatDate(createTime)}</span><span class='time'> ${formatTime(createTime)}</span></td>
                <td class='client__item-cell' id ="last-Edits"><span class='day'>${formatDate(updateTime)}</span><span class='time'> ${formatTime(updateTime)}</span></td>
                <td class='client__item-cell' id ='contacts'></td>
                <td class='client__item-cell' id ='actions'></td>
            </tr>` 
           table.innerHTML += row;
           document.querySelectorAll('#contacts').forEach(td=> td.appendChild(ul));
           document.querySelectorAll('#actions').forEach(td=> td.appendChild(actions.wrapper));

           actions.delBtn.addEventListener('click', () => {
                objClient = clientsList[i]
            }) 
        }
    }

    // Создаем и возвращаем форму добавления контактов клиента
    function createContactsItem (container) {
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
        contactInput.classList.add('form-control', 'contact-form', 'contact-input');
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
        container.append(contactsItem);

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

        clearContactBtn.addEventListener('click', () => {
            contactsItem.remove()
        })

        return {
            contactsItem,
            contactSelect,
            contactInput,  
            clearContactBtn,
        }
    }   

    // Создаем функцию приложения
    function createAppCRM (container, title="Клиенты") {
        const appTitle = createAppTitle(title);
        const addClientBtn = createAddButton();

        createTableHead();
        createClientTable();

        container.prepend(appTitle);
        container.prepend(queryForm.formWrapper);
        container.append(addClientBtn.btnRow);

        modalDelClient.deleteBtn.addEventListener('click', async () => {
            const response = await fetch(`${URI}/${objClient.id}`, {
                method: 'DELETE',
            });
            createClientTable()
        })
    }

    createAppCRM(document.getElementById('container'));
})();