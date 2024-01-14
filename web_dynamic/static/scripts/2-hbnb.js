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
