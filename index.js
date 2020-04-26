var countriesData = []
var markers = {}
var list = ``
var opened = "none"
var globalCases = 0
var globalRecovs = 0
var globalActives = 0
var globalDeaths = 0
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
var date = dd + '/' + mm + '/' + yyyy
var bouncing

function createMarker(countryData) {
    const { country, cases, deaths, recovered, active, critical } = countryData
    const {lat, long: lng, iso2} = countryData.countryInfo

    globalCases+=cases
    globalRecovs+=recovered
    globalActives+=active
    globalDeaths+=deaths

    let html = `<div class="info-window"><div class="info-name"><b> ${country}</b> </div> <div class="info-status">${status}</div>
        <hr>
        <div style="color:#666">Total Cases: ${ cases }</div>
        <div style="color:#2771b1">Active Cases: ${ active }</div>
        <div style="color:#ee6c4d">Critical Cases: ${ critical }</div>
        <div style="color:#5dd39e">Recoveries: ${ recovered }</div>
        <div style="color:red">Total Deaths: ${ deaths }</div>
    `;

    
    let icon = {
        url: iso2 != null ? "./images/" + iso2 + "_64.png" : "./images/red_fade.png"
    }

    if(iso2 == null){ icon.scaledSize = new google.maps.Size(40, 40)}

    let marker = new google.maps.Marker({
        map: map,
        position: {lat, lng}, 
        icon: icon
    })

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html)
        infoWindow.open(map, marker)
        if (marker.getAnimation() != null) 
        {
            marker.setAnimation(null);
            infoWindow.close()
            bouncing = undefined
        } 
        else
        {
            if(bouncing!=undefined){bouncing.setAnimation(null)}
            marker.setAnimation(google.maps.Animation.BOUNCE)
            bouncing = marker
        }
        let newlat = lat + 1.5
        map.panTo({lat: newlat, lng})
    })

    markers[country] = marker
}

function createListItem(countryData) {
    const {country, countryInfo, cases, active, critical, recovered, deaths, todayCases, todayDeaths, casesPerOneMillion, testsPerOneMillion, deathsPerOneMillion} = countryData
    let html = `<div class="list-item" id="${country}">
                    <div class="item-top">
                        <span>${country}</span>
                        <div class="img-container">
                            ${countryInfo.iso2 != null ? '<img src="images/' + countryInfo.iso2 + '_48.png"/>' : "<div class='dummy-circle'>?</div>"}
                        </div>
                    </div>
                    <div class="item-details">
                        <span> Total cases: ${cases}</span>
                        <span> New cases: ${todayCases}</span>
                        <span> Active cases: ${active}</span>
                        <span> ICU cases: ${critical}</span>
                        <span> Recoveries: ${recovered}</span>
                        <span> Total deaths: ${deaths}</span>
                        <span> New deaths: ${todayDeaths}</span>
                        <span> Cases/million: ${casesPerOneMillion}</span>
                        <span> Deaths/million: ${deathsPerOneMillion}</span>
                        <span> Tests/million: ${testsPerOneMillion}</span>
                    </div>
                </div>
                <hr style="border: 0.2px solid #3d5a80; margin: 0 10px;"/>`
    list+=html
}

function getData(first = 1)
{
    let request = new XMLHttpRequest()
    request.open('GET', 'https://corona.lmao.ninja/v2/countries', true)

    request.onload = function() {
        let data = JSON.parse(this.response)
        if(first)
        {
            data.map(i => createMarker(i))

            let globalInfo = `<span class="title">Global information</span>
            <span>Total cases: ${globalCases}</span>
            <span>Active cases: ${globalActives}</span>
            <span>Recoveries: ${globalRecovs}</span>
            <span>Total deaths: ${globalDeaths}</span>
            <span>Last updated: ${date}</span>`
            document.getElementById("global-box").innerHTML = globalInfo
        }

        let searchInput = document.getElementById("search").value.toLowerCase()

        data.map(i => {

            let name = i.country.substring(0, searchInput.length).toLowerCase()
            let iso2 = i.countryInfo.iso2 === null ? null : i.countryInfo.iso2.toLowerCase()
            let iso3 = i.countryInfo.iso3 === null ? null : i.countryInfo.iso3.toLowerCase()

            if(searchInput == "" || searchInput == name || searchInput ==  iso2 || searchInput == iso3)
            {
                createListItem(i)
            }

        })


        document.getElementById("list-container").innerHTML = list
        list = ``

        let countries = document.getElementsByClassName("list-item")

        for(let e of countries){
            if(opened == e.id)
            {
                document.getElementById(opened).querySelector(".item-details").style.maxHeight = "13em"
            }
            e.addEventListener("click", () =>
            {
                if(opened != "none" && opened != e.id)
                {
                    if(document.getElementById(opened))
                    {
                        document.getElementById(opened).querySelector(".item-details").style.maxHeight = "0"
                    }
                }
                let details = e.querySelector(".item-details")
                if(details.style.maxHeight != "13em")
                {
                    details.style.maxHeight = "13em"
                    google.maps.event.trigger(markers[e.id], 'click')
                    opened = e.id
                }
                else{
                    details.style.maxHeight = "0"
                    infoWindow.close()
                    markers[e.id].setAnimation(null)
                    opened = "none"
                }
            })
        }
    }

    request.send()
}




