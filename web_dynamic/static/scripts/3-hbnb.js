$(document).ready(function () {
  const checkedAmenities = [];

  function updateStatusClass(status) {
    const apiStatusDiv = $("#api_status");

    if (status == "OK") {
      apiStatusDiv.addClass("available");
    } else {
      apiStatusDiv.removeClass("available");
    }
  }

  function createPlaceArticle(place) {
    return `
        <article>
        <div class="title_box">
            <h2>{{ place.name }}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
            <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
            <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif
                %}</div>
            <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1
                %}s{% endif %}</div>
        </div>
        <div class="user">
            <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
        </div>
        <div class="description">
            {{ place.description | safe }}
        </div>
    </article>
        `;
  }
  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    const status = data.status;
    updateStatusClass(status);
  });

  $('input[type="checkbox"]').on("change", function () {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");

    if ($(this).prop("checked")) {
      //checkbox checked, store Amenity id in array
      checkedAmenities.push({ id: amenityId, name: amenityName });
    } else {
      //checkbox checked, remove amenity ID from array
      const index = checkedAmenities.findIndex(
        (amenity) => amenity.id == amenityId
      );
      if (index !== -1) {
        checkedAmenities.splice(index, 1);
      }
    }
    const amenitiesList = checkedAmenities
      .map(function (amenity) {
        return amenity.name;
      })
      .join(",");
    console.log(amenitiesList);

    $(".amenities h4").text(amenitiesList);
  });
});

$.post("http://0.0.0.0:5001/api/v1/places_search/", {}, function (data) {
  const places = data;
  const placesSection = $(".places");

  places.forEach(function (place) {
    const placeArticle = createPlaceArticle(place);
    placesSection.append(placeArticle);
  });
});
