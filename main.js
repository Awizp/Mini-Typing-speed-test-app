let body = document.body
let message = document.querySelector(".message")
let playText = document.querySelector("textarea")
let url = "https://api.chucknorris.io/jokes/random?"
let btn = document.querySelector(".start")
let startTime, endTime
let dataValue
let scoreDiv = document.createElement("div")
let div1 = document.createElement("div")

btn.addEventListener("click", TypeTest)

function TypeTest() {
    if (btn.textContent == "Start") {
        //fetch the jokes from api,
        fetch(url)
            .then(function (res) {
                return res.json()
            })
            .then(function (data) {
                dataValue = data.value
                message.innerHTML = `<h2>${dataValue}</h2>`
            })
            .catch(err =>
                console.error(err))

        //to enable the play text area,
        playText.disabled = false
        btn.textContent = "Submit"
        playText.value = ""

        //calculate start time,
        let date = new Date()
        startTime = date.getTime()

        scoreDiv.innerHTML = ""
        div1.innerHTML = ""
    }
    else if (btn.textContent == "Submit") {
        //disbale the text area,
        playText.disabled = true
        btn.textContent = "Start"
        //assign the date again bcoz of if statement,
        let date = new Date()
        endTime = date.getTime()
        let totalTime = ((endTime - startTime) / 1000)
        //get the value of user typed,
        let typeString = playText.value
        let countWords = typeString.split(' ').length
        let speedOfType = Math.round((countWords / totalTime) * 60)
        let score = "Your type speed " + speedOfType + " words per minute"


        //create div element to give the score,
        if (typeString == dataValue) {
            scoreDiv.innerHTML = `<h3>${score}</h3><br/><p>Awesome work!</p>`
            body.appendChild(scoreDiv)
            wordsCompare(typeString, dataValue)
        }
        if (typeString != dataValue) {
            scoreDiv.innerHTML = `<p>There are some mistakes in your words, However</p><br/><h3>${score}</h3>`
            body.appendChild(scoreDiv)
            wordsCompare(typeString, dataValue)
        }
    }
}

function wordsCompare(typeString, dataValue) {
    let string1 = typeString.split(' ')
    let string2 = dataValue.split(' ')
    let count = 0
    string1.forEach((element, index) => {
        if (element == string2[index]) {
            count++
        }
    });

    div1.innerHTML = `${count} out of ${string2.length} is correct.`
    body.appendChild(div1)
}
