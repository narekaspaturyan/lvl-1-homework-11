let log = console.log
let appId = '5173f0e18d162ef55caebaacb2fe724e';
let units = "metric";
let cityName;
let data;
let season = new Date().getMonth()
let bd = document.getElementById('resultContainer')
let temp;
let c = "c";


//-- metric/imperial
let un = document.getElementById("imp_met")
un.addEventListener("click", () => {
    if (units === "metric") {
        units = "imperial"
        un.innerHTML = "metric"
        c = "f"
    } else {
        units = "metric"
        un.innerHTML = "imperial"
        c = "c"
    }
})

//-- Clear 
let clear = document.getElementById('clear')
clear.addEventListener('click', function cl() {
    bd.innerHTML = ''
    document.getElementById("input").value = ""
})



let body = document.getElementById("body")
body.addEventListener('keydown', emp)
let searchButton = document.getElementById('search')
searchButton.addEventListener('click', () => {

    cityName = document.getElementById("input").value
    if (cityName === "") {
        alert("Your list is empty")
        return;
    } else if (cityName - 1 < cityName) {
        alert("Please write a city name")
    } else {
        search()
        log(cityName)
    }
})


function emp(el) {
    if (el.which === 13) {
        cityName = document.getElementById("input").value
        log(typeof cityName - 1)
        if (cityName === "") {
            alert("Your list is empty")
            return;
        } else if (cityName - 1 < cityName) {
            alert("Please write a city name")
        } else {
            search()
            log(cityName)
        }
    }
}




async function search() {
    cityName = document.getElementById("input").value
    try {

        let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${appId}&units=${units}`)
        data = await response.json()
        if (data.cod >= 400 || data === undefined) {
            alert('city not found')
            cl()
        }
        temp = document.createElement("div")
        temp.classList.add("temp")

        let moreInfo = document.createElement("button")
        moreInfo.classList.add("moreInfo")
        moreInfo.innerHTML = "For more info click here"
        bd.insertBefore(temp, bd.firstChild)
        temp.innerHTML = data.main.temp + " " + c
        temp.appendChild(moreInfo)
        document.getElementById("input").value = ""

        let check = false
        let elem;

        moreInfo.addEventListener('click', () => {

            if (check === false) {
                elem = document.createElement("div")
                elem.classList.add("moreInfoListener")
                temp.appendChild(elem)
                let ul = document.createElement("ul")
                ul.classList.add("ul")
                let li = document.createElement('li')
                let li1 = document.createElement('li')
                let li2 = document.createElement('li')
                li.innerHTML = `Feels like ${data.main.feels_like} ${c}`
                li1.innerHTML = `Humidity ${data.main.humidity}%`
                li2.innerHTML = `Visibility ${data.visibility} m`
                elem.appendChild(ul)
                ul.appendChild(li)
                ul.appendChild(li1)
                ul.appendChild(li2)
                check = true
                log(check)
            } else {
                elem.innerHTML = ''
                check = false
                log(check)
            }
        })


        log(data)


    } catch {
        err => log(err.message)
    }
}

function seasonDef(se) {
    switch (se) {
        case 1:
        case 11:
        case 0:
            body.style.backgroundImage = `url('seasons/winter.jpg')`
            break;
        case 2:
        case 3:
        case 4:
            body.style.backgroundImage = `url('seasons/spring.jpg')`
            break;
        case 5:
        case 6:
        case 7:
            body.style.backgroundImage = `url('seasons/summer.jpg')` //randomPic
            break;
        case 8:
        case 9:
        case 10:
            body.style.backgroundImage = `url(seasons/autumn.jpg)`
            break;
    }
}
seasonDef(season)