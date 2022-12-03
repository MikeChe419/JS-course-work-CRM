(() => {
    const URI = 'http://localhost:3000/api/clients';
    let objClient = {};
    let markupClient = {};
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

    //Создаем и возвращаем блок редактирования и удаления 
    function createEditWrapper() {
        const wrapper = document.createElement('div');
        wrapper.classList.add("table__btn-wrapper");
        const editBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-link', 'edit-client-btn');
        editBtn.setAttribute('data-target', '#editModal');
        editBtn.setAttribute('data-toggle', 'modal')
        editBtn.textContent = 'Изменить';
        delBtn.classList.add('btn', 'btn-link', 'del-client-btn');
        delBtn.setAttribute('data-target', '#delModal');
        delBtn.setAttribute('data-toggle', 'modal');   
        
        delBtn.textContent = 'Удалить';

        wrapper.append(editBtn);
        wrapper.append(delBtn);

        return {
            wrapper,
            delBtn,
            editBtn,
        }
    }

    // Получаем дату из json
    function formatDate(str) {
        return str.slice(8, 10) + '.' + str.slice(5, 7) + '.' + str.slice(0, 4);
    }
    // Получаем время из json
    function formatTime(str) {
        return str.slice(11, 16);
    }

    //Создаем контейнер тела таблицы 
     async function createTableBody() {
        const tableWrapper = document.createElement('div');
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        const response = await fetch(URI);
        const clientsList = await response.json();
        clientsList.forEach(client => tbody.append(createTableRow(client)))
     
        tableWrapper.classList.add('table-body');
        tbody.classList.add('clients-tbody')
        table.classList.add('client-table');
        table.appendChild(tbody)
        tableWrapper.append(table);
    
        return {
          tableWrapper,
          table,
          tbody
        }
      }

    function createTableRow(client) {
        const tr = document.createElement('tr');
        const tdId = document.createElement('td');
        const tdFullname = document.createElement('td');
        const tdCreateDate = document.createElement('td');
        const createDay = document.createElement('span');
        const createTime = document.createElement('span');
        const updateDay = document.createElement('span');
        const updateTime = document.createElement('span');
        const tdUpdateDate = document.createElement('td');
        const tdContacts = document.createElement('td');
        const tdActions = document.createElement('td');
        const actions = createEditWrapper();
        const contactsUl = document.createElement('ul');
        let contactList = {};
        const create = client.createdAt;
        const update = client.updatedAt;

        if ( typeof client.lastname === 'undefined') {
            client.lastname = '';
        };

        if (typeof client.contacts !== 'undefined') {
            contactList = client.contacts.map(item => {
                const li = document.createElement('li');
                li.textContent = item.value;
                return li
            });
            contactList.forEach(item => contactsUl.append(item));
        };

        tr.classList.add('row', 'client__row');
        tdId.classList.add('client__item-cell');
        tdFullname.classList.add('client__item-cell');
        tdCreateDate.classList.add('client__item-cell');
        tdUpdateDate.classList.add('client__item-cell');
        tdContacts.classList.add('client__item-cell');
        tdActions.classList.add('client__item-cell');
        tdId.setAttribute('id', 'td-id');
        tdFullname.setAttribute('id', 'td-fullname');
        tdCreateDate.setAttribute('id', 'td-create-date');
        tdUpdateDate.setAttribute('id', 'td-up-date');
        tdContacts.setAttribute('id', 'td-contacts');
        tdActions.setAttribute('id', 'td-actions');
        tdActions.append(actions.wrapper)
        createDay.classList.add('day');
        createTime.classList.add('time');
        updateDay.classList.add('day');
        updateTime.classList.add('time');
        tdId.innerText = client.id;
        tdFullname.innerText = `${client.name + ' ' + client.lastName + ' ' + client.surname}`
        createDay.innerText = `${formatDate(create)}`
        updateDay.innerText = `${formatDate(update)}`
        createTime.innerText = `${formatTime(create)}`
        updateTime.innerText = `${formatTime(update)}`
        contactsUl.classList.add('table_contacts-list');
    
        tdCreateDate.append(createDay);
        tdCreateDate.append(createTime);
        tdUpdateDate.append(updateDay);
        tdUpdateDate.append(updateTime);
        tdContacts.append(contactsUl);
        tr.append(tdId);
        tr.append(tdFullname);
        tr.append(tdCreateDate);
        tr.append(tdUpdateDate);
        tr.append(tdContacts);
        tr.append(tdActions);

        actions.delBtn.addEventListener("click", () => {
            objClient = client
            markupClient = tr
        })

        return tr
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
    const addClientBtn = createAddButton();

    //Создаем шаблон модального окна с использованием bootstrap
    function createModalTemp (container, title) {
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
        modalTitle.textContent = title;
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

        closeBtn.addEventListener('click', () => {
            let contactsList = document.querySelectorAll('.contact-group');
            if (contactsList) {
                contactsList.forEach(el => el.remove())  
            }
        })

        return {
            modalDialog,
            modalHeader,
            modalFooter,
            modalBody,
            modalTitle
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

    //Создаем форму добавления и редактирования клиентских данных
    function createClientFormTemp(container) {
        const form = document.createElement('form');
        const lastNameInput = document.createElement('input');
        const nameInput = document.createElement('input');
        const sureNameInput = document.createElement('input');
        const contactWrapper = document.createElement('div');
        const addContacts = document.createElement('button');
        const contactsList = document.createElement('ul');
        const saveBtn  = document.createElement('button');

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
        // saveBtn.setAttribute('data-dismiss', 'modal');

        contactWrapper.append(contactsList);
        contactWrapper.append(addContacts);
        form.append(lastNameInput);
        form.append(nameInput);
        form.append(sureNameInput);
        form.append(contactWrapper);
        form.append(saveBtn);
        container.append(form)

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

    // Создаем и возвращаем модальное  окно добавления клиента
    function createModalAddClient(container) {
        const modalFade = document.createElement('div');
        const modalAdd = createModalTemp (modalFade, 'Новый клиент');
        const modalForm =  createClientFormTemp(modalAdd.modalBody)
    
        modalFade.classList.add('modal', 'fade');
        modalFade.setAttribute('id', 'staticBackdrop');
        modalFade.setAttribute('data-backdrop', 'static');
        modalFade.setAttribute('aria-labelledby', 'staticBackdropLabel');
        container.append(modalFade);

        //Кнопка добавления контактов
        modalForm.addContacts.addEventListener('click', (e) => {
            e.preventDefault();
            createContactsItem(modalForm.contactsList)
            let numberContacts = document.getElementsByClassName('contact-group');
            if (numberContacts.length >=9) return;
        })

        addClientBtn.addBtn.addEventListener('click', () => {
            modalForm.saveBtn.removeAttribute('data-dismiss')
        })

        //Кнопка сохранения и отправки данных о кленте на сервер
        modalForm.saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!modalForm.nameInput.value || !modalForm.lastNameInput.value) return;
            modalForm.saveBtn.setAttribute('data-dismiss', 'modal')
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
                        name: modalForm.nameInput.value.trim(),
                        lastName: modalForm.sureNameInput.value.trim(),
                        surname: modalForm.lastNameInput.value.trim(),
                        contacts: contactArr,
                    },
                ),
                headers:
                {
                    'Content-Type': 'application/json',
                },
            });
            const client = await response.json();
            document.querySelector('.clients-tbody').append(createTableRow(client));
            modalForm.nameInput.value = "";
            modalForm.sureNameInput.value = "";
            modalForm.lastNameInput.value= "";
            document.querySelectorAll('.contact-group').forEach(item => item.remove());
        }); 
    }

    //Создаем и возвращаем модальное окно удаления клиента
    function createModalDelClient(container) {
        const modal = document.createElement('div');
        const modalDel = createModalTemp(modal, 'Удалить клиента');
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
        modalDel.modalBody.classList.add('modal__del-body');
        modalDel.modalTitle.classList.add('modal__del-title')
        modalDel.modalBody.append(p);
        modalDel.modalBody.append(deleteBtn);
        container.append(modal);

        return {
            deleteBtn
        } 
    }

    // Создаем и возвращаем модальное окно изменения данных клиента
    function createModalEditClient(container) {
        const modal = document.createElement('div');
        const modalEdit = createModalTemp (modal, 'Изменить данные');
        const modalEditForm =  createClientFormTemp(modalEdit.modalBody);

        modal.classList.add('modal', 'fade');
        modal.setAttribute('id', 'editModal');
        modal.setAttribute('data-backdrop', 'static');
        modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
        container.append(modal);
    }

    // Создаем функцию приложения
    async function createAppCRM (container, title="Клиенты") {
        
        const queryForm = createQueryForm();
        const appTitle = createAppTitle(title);
        const clientTable = await createTableBody();
        createModalAddClient(container);
        const modalDelClient = createModalDelClient(container);
        const modalEditClient = createModalEditClient(container);
        createTableHead();

        container.prepend(appTitle);
        container.prepend(queryForm.formWrapper);
        container.append(clientTable.tableWrapper)
        container.append(addClientBtn.btnRow);

        modalDelClient.deleteBtn.addEventListener('click', async () => {
            markupClient.remove()
            const response = await fetch(`${URI}/${objClient.id}`, {
                 method: 'DELETE',
            });
        })
    }

    createAppCRM(document.getElementById('container'));
})();
