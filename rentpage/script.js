function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function loadMessages() {
    const storedMessages = localStorage.getItem('guestbook-messages');
    if (storedMessages) {
        return JSON.parse(storedMessages);
    }
    return [];
}

function displayMessages() {
    const messages = loadMessages();
    const list = document.getElementById('guestbook-list');
    list.innerHTML = '';
    for (let i = 0; i < messages.length; i++) {
        const li = document.createElement('li');
        li.textContent = `${messages[i].name}: ${messages[i].message}`;
        
        // 수정 버튼
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'guestbook-button edit-button';
        editButton.onclick = function() { editMessage(i); };
        li.appendChild(editButton);

        // 삭제 버튼
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Del';
        deleteButton.className = 'guestbook-button delete-button';
        deleteButton.onclick = function() { deleteMessage(i); };
        li.appendChild(deleteButton);

        list.appendChild(li);
    }
}
function editMessage(index) {
    const messages = loadMessages();
    const newName = prompt("Change name:", messages[index].name);
    const newMessage = prompt("Edit comment:", messages[index].message);
    if (newName !== null && newMessage !== null) {
        messages[index].name = newName;
        messages[index].message = newMessage;
        localStorage.setItem('guestbook-messages', JSON.stringify(messages));
        displayMessages();
    }
}

function deleteMessage(index) {
    const messages = loadMessages();
    const confirmDelete = confirm("Are you sure you want to delete it?");
    if (confirmDelete) {
        messages.splice(index, 1);
        localStorage.setItem('guestbook-messages', JSON.stringify(messages));
        displayMessages();
    }
}



function submitMessage() {
    const nameField = document.getElementById('name');
    const messageField = document.getElementById('message');
    const messages = loadMessages();
    messages.push({ name: nameField.value, message: messageField.value });
    localStorage.setItem('guestbook-messages', JSON.stringify(messages));
    displayMessages();
}

// 처음 페이지를 로드할 때 저장된 메시지를 표시
displayMessages();

// GO TO TOP
let goTopBtn = document.getElementById("goTopBtn");
let lastScrollPos = 0; // 마지막 스크롤 위치를 저장하기 위한 변수

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop; // 현재 스크롤 위치

    if (currentScrollPos > lastScrollPos) {
        // 스크롤을 내렸을 때
        if (currentScrollPos > 300) { // 스크롤이 300px 넘어가면 버튼을 표시
            goTopBtn.style.display = "block";
        }
    } else {
        // 스크롤을 올렸을 때
        goTopBtn.style.display = "none";
    }

    lastScrollPos = currentScrollPos; // 스크롤 위치를 업데이트
}

function goToTop() {
    document.body.scrollTop = 0; // Safari 브라우저를 위한 코드
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera를 위한 코드
}