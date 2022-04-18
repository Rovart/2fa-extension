(function () {
  function faAddButton() {
    if(!document.getElementById("injector2fabutton")){
      var btn = document.createElement("div");
      btn.id = "injector2fabutton";
      let heightfield;
      let widthfield;
      if(document.querySelector("input[type='tel']")){
        heightfield = document.querySelector("input[type='tel']").clientHeight;
        widthfield = document.querySelector("input[type='tel']").clientWidth;
        document.querySelector("input[type='tel']").after(btn);
      }
      if(document.querySelector("input[type='number']")){
        heightfield = document.querySelector("input[type='number']").clientHeight;
        widthfield = document.querySelector("input[type='number']").clientWidth;
        document.querySelector("input[type='number']").after(btn);
      }
      let heightposition = "-"+(heightfield-15)+"px";
      let widthposition = (widthfield-20)+"px";
      btn.style.marginTop = heightposition;
      btn.style.marginLeft = widthposition;
      if(!document.getElementById("injector2fabutton")){
        return false;
      }else{
        faDefineEvents();
        return true;
      }
    }else{
      return true;
    }
  }
  const getHostname = (url) => {
    var pattern = /^((http|https):\/\/)/;

    if(!pattern.test(url)) {
      url = "http://" + url;
    }
    // use URL constructor and return hostname
    return new URL(url).hostname;
  }

  function faDefineEvents() {
    document
    .getElementById("injector2fabutton")
    .addEventListener("click", function (event) {
      //Busca en servidor local
      let totp = 000000;
      var patternhttp = /^((http):\/\/)/;
      let url = 'https://192.168.18.128:3333/api';
      if(patternhttp.test(window.location.toString())) {
        url = 'http://192.168.18.128:3332/api';
      }
      fetch(url).then(async function (out){
        out = await out.json();
        for(let i in out){
          if(getHostname(window.location.toString()).includes(getHostname(out[i].url))) {
            totp = out[i].key;
            break;
          }
        }
        faFill(totp);
      }).catch(function(err){
        console.log(err);
      });
    });
  }
  function faFill(str) {
    //Rellena
    if(document.querySelector("input[type='tel']") && str !== 000000){
      document.querySelector("input[type='tel']").value = str;
      document.querySelector("input[type='tel']").setAttribute('value',str);
    }
    if(document.querySelector("input[type='number']") && str !== 000000){
      document.querySelector("input[type='number']").value = str;
      document.querySelector("input[type='number']").setAttribute('value',str);
    }
  }
  faAddButton();
  const interval = setInterval(function() {
    faAddButton();
  }, 5000);
})();
