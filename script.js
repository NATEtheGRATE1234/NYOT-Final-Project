//API key is vhL3Gm6TGEGTxH3rR

function SearchFunction() {
    
    let request = new XMLHttpRequest();
    let AQI = document.getElementById('AQI');
    let userInput = (document.getElementById('userInput')).value;
    let secondPartOfInput = userInput.substring(userInput.indexOf(",") + 1);
    let key = "vhL3Gm6TGEGTxH3rR";
    
    let city = userInput.substring(0, userInput.indexOf(","));
    let state = secondPartOfInput.substring(0, secondPartOfInput.indexOf(","));
    let country = secondPartOfInput.substring(secondPartOfInput.indexOf(",") + 1);
    
    let url = "https://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=" + country + "&key=" + key;
    let aqiValue;
    
    let aqiSafeness;
    
    request.open("GET", url, true);

    request.onload = function() {
      
      let data = JSON.parse(this.response);
      
      
      if (request.status >= 200 && request.status <= 400) {
        aqiValue = data.data.current.pollution.aqius;
        if (aqiValue < 51) {
          let good = " good";
          aqiSafeness = good.fontcolor("#00cc00");
        } else if (aqiValue < 101) {
            let moderate = " moderate";
            aqiSafeness = moderate.fontcolor("orange");  
        } else if (aqiValue < 151) {
            let unhealthyForSensitiveGroups = " unhealthy for senesitive groups";
            aqiSafeness = unhealthyForSensitiveGroups.fontcolor("red");
        } else if (aqiValue < 201) {
             let unhealthy = " unhealthy";
             aqiSafeness = unhealthy.fontcolor("red");
        } else if (aqiValue < 501 && aqiValue > 300) {
             let hazardous = " hazardous";
             aqiSafeness = hazardous.fontcolor("purple");
        }
        
        AQI.innerHTML = "The Air Quality Index in your city is " + aqiValue + ", which is considered " + aqiSafeness + ".";
      } else {
        AQI.innerHTML = "Sorry, but there was an error trying to obtain the AQI for your city. Either there is no available data for this city, or you did not enter it in properly."
      }
    };
    request.send();
    
}

