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
        form.classList.add('input-group');
        input.classList.add('form-control');
        input.placeholder = 'Введите запрос';
        formWrapper.classList.add('queryform__wrapper', 'pt-3', 'pl-3', 'mb-3', 'pb-3');
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

    const queryForm = createQueryForm();
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
              <td class="head-td" id="ID"><span>ID</span><i class="far fa-arrow-up"></i></td>
              <td class="head-td" id="sort-name"><span>Фамилия Имя Отчество</span><i class="far fa-arrow-up"></i><span class ="full-name-span">А-Я</span></td>
              <td class="head-td" id ="sort-create-time"><span>Дата и время создания</span><i class="far fa-arrow-up"></i></td>
              <td class="head-td" id ="sort-last-edits"><span>Последние измения</span><i class="far fa-arrow-up"></i></td>
              <td>Контакты</td>
              <td>Действия</td>
              </tr>
         </tbody>`
        tableHead.innerHTML = headRow;
        return {
           tableHead
        }
    }

    //Создаем контейнер тела таблицы
    function createTableBody() {
        const tableWrapper = document.createElement('div');
        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        // clientsArr.forEach(client => tbody.append(createTableRow(client)))

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

    // Получаем дату из json
    function formatDate(str) {
        return str.slice(8, 10) + '.' + str.slice(5, 7) + '.' + str.slice(0, 4);
    }
    // Получаем время из json
    function formatTime(str) {
        return str.slice(11, 16);
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
        tdId.innerText = client.id.slice(-6);
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
        tr.append(tdId);
        tr.append(tdFullname);
        tr.append(tdCreateDate);
        tr.append(tdUpdateDate);
        tr.append(tdContacts);
        tr.append(tdActions);

        if (typeof client.contacts !== 'undefined') {
            const showAllContactsBtn = document.createElement('button')
            contactList = client.contacts.map(item => {
                const li = document.createElement('li');
                const popup = document.createElement('span');
                popup.classList.add('contact-popup');
                popup.textContent = `${item.type}:${item.value}`;
                popup.setAttribute('style', 'display: none');
                li.append(popup);
                li.classList.add('contact-item');
                li.addEventListener('mouseover', () => popup.removeAttribute('style'));
                li.addEventListener('mouseout', () => popup.setAttribute('style', 'display: none'));
                const img = document.createElement('img');
                img.setAttribute('style', 'padding-bottom: 2px;')
                li.append(img)
                 switch (true) {
                     case(item.type == 'phone'):
                     img.setAttribute('src', '/images/phone.svg');
                     break;
                     case(item.type == 'mail'):
                     img.setAttribute('src', '/images/mail.svg');
                     break;
                     case(item.type == 'fb'):
                     img.setAttribute('src', '/images/fb.svg');
                     break;
                     case(item.type == 'vk'):
                     img.setAttribute('src', '/images/Vk.svg');
                     break;
                     default:
                     img.setAttribute('src', '/images/other.svg');
                     break;
                 }
                return li
            });
            contactList.forEach(item => contactsUl.append(item))
            const contactNodes = contactsUl.childNodes;
            tdContacts.append(contactsUl);
            if (contactNodes.length > 4) {
                for (let i = 4; i < contactNodes.length; i++) contactNodes[i].setAttribute('style', 'display: none;')
                showAllContactsBtn.classList.add('show-contacts-btn');
                showAllContactsBtn.textContent = `+${contactNodes.length-4}`
                tdContacts.appendChild(showAllContactsBtn);
                showAllContactsBtn.addEventListener('click', () => {
                    showAllContactsBtn.setAttribute('style', 'display: none;')
                    contactNodes.forEach(elem => elem.removeAttribute('style'));
                })
            }
            
        };
         actions.delBtn.addEventListener("click", (e) => {
             objClient = client
             markupClient = tr
         })
        actions.editBtn.addEventListener("click", async () => {
                markupClient = {
                    edit: tr,
                    next: tr.nextSibling
                }
                await EditClientData(client)
         })

        return tr
    }

    //Создаем фунцию поиска
     function createSearchClients(obj) {
        queryForm.form.addEventListener('submit', (e) => {
            e.preventDefault();
            let search = queryForm.input.value.split(' ');
            const url = `${URI}?search=${search}`;
            let rows = obj.querySelectorAll('.client__row');
            const timeoutId =  setTimeout( async() => {
                const response = await fetch(url);
                let data = await response.json();
                rows.forEach(el => el.remove());
                data.forEach(client => obj.append(createTableRow(client)));
            }, 500)
        })
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
    function createModalTemp (container, title, closeBtnText) {
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
        headerCloseBtn.classList.add('close', 'header__close-btn');
        span.innerHTML = '&times';
        modalTitle.textContent = title;
        headerCloseBtn.append(span);
        closeBtn.setAttribute('data-dismiss', 'modal');
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.classList.add('btn', 'bottom-close-btn');
        closeBtn.textContent = closeBtnText
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
            closeBtn,
            headerCloseBtn,
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
        contactInput.setAttribute('type', 'tel');
        contactInput.setAttribute('id', 'phone');
        contactSelect.setAttribute('id', 'phone-select');
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
                case('fb'):
                    contactInput.setAttribute('type', 'text');
                    contactInput.setAttribute('id', 'fb');
                    contactSelect.setAttribute('id', 'fb-select');
                break;
                case('vk'):
                    contactInput.setAttribute('type', 'text');
                    contactInput.setAttribute('id', 'vk');
                    contactSelect.setAttribute('id', 'vk-select');
                break;
                case('other'):
                    contactInput.setAttribute('type', 'text');
                    contactInput.setAttribute('id', 'other');
                    contactSelect.setAttribute('id', 'other-select');
                break;
            }
        })

        clearContactBtn.addEventListener('click', () => {
            contactsItem.remove();
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
        lastNameInput.placeholder = 'Отчество'
        nameInput.classList.add('form-control', 'modal-input', 'mb-3');
        nameInput.placeholder = 'Имя*'
        sureNameInput.classList.add('form-control', 'modal-input', 'mb-3');
        sureNameInput.placeholder = 'Фамилия*';
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
        form.append(sureNameInput);
        form.append(nameInput);
        form.append(lastNameInput);
        form.append(contactWrapper);
        form.append(saveBtn);
        container.append(form);

         //Кнопка добавления контактов
        addContacts.addEventListener('click', (e) => {
            e.preventDefault();
            createContactsItem(contactsList)
            let numberContacts = document.getElementsByClassName('contact-group');
            if (numberContacts.length >=9) return;
        })

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

    function createContactsArray() {
        const contactDataArr = document.querySelectorAll('.contact-input');
        let contactArr = [];
        if (contactDataArr)
            contactDataArr.forEach(input => contactArr.push({
                type: input.id,
                value: input.value
        }))
        return contactArr
    }
    function removeContactsList() {
        document.querySelectorAll('.contact-group').forEach(item => item.remove());
    }
    function clearModalForm() {
        removeContactsList()
        document.querySelectorAll('.modal-input').forEach(input => input.value = "")
    }
    // Создаем и возвращаем модальное  окно добавления клиента
    function createModalAddClient(container) {
        const modalFade = document.createElement('div');
        const modalAdd = createModalTemp (modalFade, 'Новый клиент', 'Отмена');
        const modalForm =  createClientFormTemp(modalAdd.modalBody)

        modalFade.classList.add('modal', 'fade');
        modalFade.setAttribute('id', 'staticBackdrop');
        modalFade.setAttribute('data-backdrop', 'static');
        modalFade.setAttribute('aria-labelledby', 'staticBackdropLabel');
        container.append(modalFade);

        modalAdd.headerCloseBtn.addEventListener('click', () => {
            clearModalForm()
        })
        modalAdd.closeBtn.addEventListener('click', () => {
            clearModalForm()
        })

        addClientBtn.addBtn.addEventListener('click', () => {
            modalForm.saveBtn.removeAttribute('data-dismiss')
        })
        //Кнопка сохранения и отправки данных о кленте на сервер
        modalForm.saveBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (!modalForm.nameInput.value || !modalForm.sureNameInput.value) return;
            modalForm.saveBtn.setAttribute('data-dismiss', 'modal');

            const response = await fetch(URI, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        name: modalForm.nameInput.value.trim(),
                        lastName: modalForm.lastNameInput.value.trim(),
                        surname: modalForm.sureNameInput.value.trim(),
                        contacts: createContactsArray(),
                    },
                ),
                headers:
                {
                    'Content-Type': 'application/json',
                },
            });
            const client = await response.json();
            document.querySelector('.clients-tbody').append(createTableRow(client));
            await getCLients();
            modalForm.nameInput.value = "";
            modalForm.sureNameInput.value = "";
            modalForm.lastNameInput.value= "";
            removeContactsList();
        });
    }
    //Создаем и возвращаем модальное окно удаления клиента
    function createModalDelClient(container) {
        const modal = document.createElement('div');
        const modalDel = createModalTemp(modal, 'Удалить клиента', 'Отмена');
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
        modalDel.modalTitle.classList.add('modal__del-title');
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
        const modalEdit = createModalTemp (modal, 'Изменить данные', 'Удалить клиента');
        const modalEditForm = createClientFormTemp(modalEdit.modalBody);
        const spanId = document.createElement('span');
        modal.classList.add('modal', 'fade');
        modal.setAttribute('id', 'editModal');
        modal.setAttribute('data-backdrop', 'static');
        modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
        spanId.classList.add('modal__edit-span-id');
        modalEdit.modalHeader.append(spanId);
        container.append(modal);

        return {
            modalEdit,
            modalEditForm,
            spanId
        }
    }

    async function deleteRequest(client) {
        const response = await fetch(`${URI}/${client.id}`, {
            method: 'DELETE',
      }); 
    }

    const modalEditClient = createModalEditClient(document.getElementById('container'))
    // Функция изменения данных клиента в модальном окне
    async function EditClientData (client) {
        let response = await fetch(`${URI}/${client.id}`);
        let item = await response.json();
        modalEditClient.spanId.textContent = `ID: ${item.id.slice(-6)}`;
        modalEditClient.modalEditForm.nameInput.value = item.name;
        modalEditClient.modalEditForm.lastNameInput.value = item.lastName;
        modalEditClient.modalEditForm.sureNameInput.value = item.surname;
          if (client.contacts.length > 0) {
              client.contacts.forEach(el => {
                  let contactItem = createContactsItem(modalEditClient.modalEditForm.contactsList);
                  contactItem.contactInput.value = el.value;
                  switch (el.type) {
                      case('phone'):
                          contactItem.contactSelect.value = 'phone'
                      break;
                      case('mail'):
                          contactItem.contactSelect.value = 'mail';
                          contactItem.contactSelect.id = 'mail-select';
                          contactItem.contactInput.type = 'email';
                          contactItem.contactInput.id = 'mail';
                      break;
                      case('fb'):
                          contactItem.contactSelect.value = 'fb';
                          contactItem.contactSelect.id = 'fb-select';
                          contactItem.contactInput.type = 'text';
                          contactItem.contactInput.id = 'fb';
                      break;
                      case('vk'):
                          contactItem.contactSelect.value = 'vk';
                          contactItem.contactSelect.id = 'vk-select';
                          contactItem.contactInput.type = 'text';
                          contactItem.contactInput.id = 'vk';
                      break;
                      case('other'):
                          contactItem.contactSelect.value = 'other';
                          contactItem.contactSelect.id = 'other-select';
                          contactItem.contactInput.type = 'text';
                          contactItem.contactInput.id = 'other';
                      break;
                  }
              })
          }

        modalEditClient.modalEdit.headerCloseBtn.addEventListener('click', ()=>{
            removeContactsList();
            item = {}
        })
        modalEditClient.modalEdit.closeBtn.addEventListener('click', async() => {
            markupClient.edit.remove()
            await deleteRequest(item)
        })
         modalEditClient.modalEditForm.saveBtn.addEventListener('click', async(e) => {
            console.log(item, client)
             e.preventDefault();
             markupClient.edit.remove();
             modalEditClient.modalEditForm.saveBtn.setAttribute('data-dismiss', 'modal');
             console.log(modalEditClient.modalEditForm.nameInput.value.trim())
             const responce = await fetch(`${URI}/${item.id}`, {
                 method: 'PATCH',
                 body: JSON.stringify(
                     {
                         name: modalEditClient.modalEditForm.nameInput.value.trim(),
                         lastName: modalEditClient.modalEditForm.lastNameInput.value.trim(),
                         surname: modalEditClient.modalEditForm.sureNameInput.value.trim(),
                         contacts: createContactsArray()
                     },
                 ),
                 headers:
                 {
                     'Content-Type': 'application/json',
                 },
            })
            const updateClient = await responce.json();
            document.querySelector('.clients-tbody').insertBefore(createTableRow(updateClient), markupClient.next);
            removeContactsList();
            item = {}
         })
    }

    async function getCLients () {
        const response = await fetch(URI);
        const clientsList = await response.json();
        return clientsList
    }

    function clearRows(/*elClick, array, tableBody*/) {
        // elClick.addEventListener('click',() => {
        const removeRows = document.querySelectorAll('.client__row');
        removeRows.forEach(el => el.remove());
    }

    //Сортировка по ID
    function sortID(array, tableBody) {
        const ID = document.querySelector('#ID');
        ID.addEventListener('click', ()=> {
            clearRows()
            let arrow =  ID.querySelector('.fa-transform')
            if (arrow === null) {
                array.sort((a, b) => b.id - a.id);
            } else {
                array.sort((a, b) => a.id - b.id);
            }
            ID.querySelector('.fa-arrow-up').classList.toggle('fa-transform');
            array.forEach(client => tableBody.append(createTableRow(client)));
        })
        return array
    }

    //Сортировка по ФИО
    function sortFullName(array, tableBody) {
        const fullName = document.querySelector('#sort-name'); 
        const  span = document.querySelector('.full-name-span')
        fullName.addEventListener('click', () => {
            clearRows()
            let arrow = fullName.querySelector('.fa-transform')
            if (arrow === null) {
                array.sort ((a, b) => {
                    if ((a.surname < b.surname) || ((a.surname == b.lastname)&& (a.name < b.name)) || (((a.surname == b.lastname) && (a.name == b.name)) && (a.lastName < b.lastName))) return -1;
                    if ((a.surname < b.surname) || ((a.surname == b.lastname)&& (a.name < b.name)) || (((a.surname == b.lastname)&& (a.name == b.name)) && (a.lastName < b.lastName))) return 1; 
                })
                span.textContent = 'А-Я';
            }
            else {
                array.sort ((a, b) => {
                    if ((b.surname < a.surname) || ((b.surname == a.lastname)&& (b.name < a.name)) || (((b.surname == a.lastname)&& (b.name == a.name)) && (b.lastName < a.lastName))) return -1;
                    if ((b.surname < a.surname) || ((b.surname == a.lastname)&& (b.name < a.name)) || (((b.surname == a.lastname)&& (b.name == a.name)) && (b.lastName < a.lastName))) return 1; 
                })
                span.textContent = 'Я-А';
            }
            fullName.querySelector('.fa-arrow-up').classList.toggle('fa-transform');
            array.forEach(client => tableBody.append(createTableRow(client)));
            
        })
    }

    //сортировка по дате и времени создания/изменения
    function sortTime (elClick, array, tableBody) {
        elClick.addEventListener('click',() => {
            clearRows()
            let arrow = elClick.querySelector('.fa-transform')
            if (elClick == document.querySelector('#sort-create-time')) {
                if (arrow === null) {
                    array.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else {
                    array.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                }
            }
            else if(elClick == document.querySelector('#sort-last-edits')) {
                if (arrow === null) {
                    array.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                } else {
                    array.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
                }
            }
            elClick.querySelector('.fa-arrow-up').classList.toggle('fa-transform');
            array.forEach(client => tableBody.append(createTableRow(client)));
        }) 
    }

    // Создаем функцию приложения
    async function createAppCRM (container, title="Клиенты") {
        const appTitle = createAppTitle(title);
        const clientTable = createTableBody();
        const clientsList = await getCLients();
        createModalAddClient(container);
        const modalDelClient = createModalDelClient(container);
        createTableHead();
        console.log(clientsList)

        container.prepend(appTitle);
        container.prepend(queryForm.formWrapper);
        container.append(clientTable.tableWrapper);
        container.append(addClientBtn.btnRow);
        clientsList.forEach(client => clientTable.tbody.append(createTableRow(client)))
        sortID(clientsList, clientTable.tbody);
        sortFullName(clientsList, clientTable.tbody);
        sortTime (document.querySelector('#sort-create-time'), clientsList, clientTable.tbody);
        sortTime (document.querySelector('#sort-last-edits'), clientsList, clientTable.tbody);
        createSearchClients(clientTable.tbody);
        
        modalDelClient.deleteBtn.addEventListener('click', async () => {
            markupClient.remove()
            await deleteRequest(objClient)
        })
    }

    createAppCRM(document.getElementById('container'));
})();
