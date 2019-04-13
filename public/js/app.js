console.log('Client side JS File is loaded')
// fetching this url                                  then do with the response:
// fetch('http://localhost:3000/weather?address=xxa2').then((response)=>{
//     response.json().then((data)=>{ //in json format, do the following
//         console.log(data)
//     })
// })

const forma = document.querySelector('form')
const search = document.querySelector('input')
const firstP = document.querySelector('#message_1')
const secondP = document.querySelector('#message_2')

forma.addEventListener('submit', (e)=>{
    firstP.textContent ='loading'
    e.preventDefault()
    const location = search.value
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{ //in json format, do the following
            if(data.error){
                firstP.textContent ='Erro Processing the Request'
                secondP.textContent =`${data.error}`
            }else{
        firstP.textContent = `${data.location}`
        secondP.textContent = `${data.forecast}`
            }
    })
})
})
