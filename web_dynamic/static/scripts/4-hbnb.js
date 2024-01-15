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

          <div class="description">
              {{ place.description | safe }}
          </div>
      </article>
          `;
  }

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    const status = data.status;
    alert("Status is");
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

  $("button").on("click", function () {
    // console.log("button clicked");
    // alert("Button clicked");
    $.post("http://0.0.0.0:5001/api/v1/places_search/", {}, function (data) {
      const places = data;
      const placesSection = $(".places");

      placesSection.empty();

      places.forEach(function (place) {
        const placeArticle = createPlaceArticle(place);
        placesSection.append(placeArticle);
      });
    }).fail(function (xhr, textStatus, errorThrown) {
      console.error("Error fetching places:", errorThrown);
      console.log("Status code:", xhr.status);
      console.log("textstatus", textStatus);
      console.log("Status text:", xhr.statusText);
      console.log("Response:", xhr.responseText);
    });
  });
});
