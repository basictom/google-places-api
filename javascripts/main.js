$(document).ready(function(){

  const apiKey = "";


  $("body").on("click", "li", (e) => {
    // console.log(e.target.innerHTML);
    returnPromise(e.target.innerHTML).then((data) => {
      console.log(data);
      writeName(data);
    }).catch((error) => {
      console.log(error);
    });
  });


  $(".output").on("click", ".place", (e) => {
    let placeId = e.target.id;
    loadDetail(placeId).then((results) => {
      writeAddress(results.adr_address);
      console.log(results);
      // console.log("Address Return", results.formatted_address);
    });
  });

  const loadDetail = (placeId) => {
    return new Promise((resolve, reject) => {
      $.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`)
      .done((data) => resolve(data.result))
      .fail((error) => reject(error));
    });
  };

  const returnPromise = (type) => {
    return new Promise((resolve, reject) => {
      $.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=+36.1627,-86.7816&radius=5000&type=${type}&key=${apiKey}`).done((data) => {
        resolve(data);
      }).fail((error) => {
        reject(error);
      });
    });
  };

  const writeAddress = (address) => {
    let outString = `<div class="address">${address}</div>`;
    $(".address-output").append(outString);
  }


  const writeName = (name) => {
    // clearDiv();
    let newString = "";
    for(let i=0;i<name.results.length;i++){
      newString += `<div class="names">`;
      newString += `<a href="#"><p class="place" id="${name.results[i].place_id}">${name.results[i].name}</p></a>`;
      newString += `</div>`;
    }
    $(".output").html(newString);
  };





});
