const userForm = document.querySelector('form')

userForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const userNumber = document.querySelector('input').value - 1
    fetch('/users').then((response)=>{
        response.json().then((data)=>{
            const messageOne = document.querySelector('#message-1')
            const messageTwo = document.querySelector('#message-2')
            messageOne.textContent = data[userNumber].name
            messageTwo.textContent = data[userNumber].age
        })
    })

})