console.log('client js loaded')

fetch('http://puzzle.mead.io/puzzle').then( (response) => {
    response.json().then( (data) => {
        console.log(data)
    })
})




// selecting form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    
    msg1.textContent= 'Loading..'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then( (response) => {
    response.json().then( (data) => {
        if(data.error)
        {
            console.log(data.error)
            msg1.textContent= data.error
        }
        else
        {
            msg1.textContent= data.forcast
            msg2.textContent = data.location
            console.log(data.forcast)
        }
        
    })
})

})