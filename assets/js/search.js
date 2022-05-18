// Structure For Search Engine Functions. 
const test1 = false
const test2 = false
function searchEnginePromise() {
    return new Promise((resolve, reject) => {
        if (test1) {
          reject({
          message: 'test one reject'
           })
        }else if (test2) {
          reject({
          message: 'test two reject'   
            })
        }else {
            resolve('test success')
        }
 })
}
searchEnginePromise().then((message) => {
    console.log('Var should be -> ' +message)
}).catch((error) => {
    console.log(error.name + ''+error.message)
})
// Structure for condensing all API's to an array.
const covidApi = new Promise((resolve, reject) => {
    resolve('Covid Api Success')})
const weatherApi = new Promise((resolve, reject) => {
    resolve('Weather Api Success')})
const ticketApi = new Promise((resolve, reject) => {
    resolve('Ticket Api Success')})
Promise.all([
    covidApi,
    weatherApi,
    ticketApi
]).then((messages) => {
    console.log(messages)
})

