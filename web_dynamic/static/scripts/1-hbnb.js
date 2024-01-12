$(document).ready(function () {
  const checkedAmenities = [];

  $('input[type="checkbox"]').on("change", function () {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");

    if ($(this).prop("checked")) {
      //checkbox checked, store Amenity id in array
      checkedAmenities.push(amenityId);
    } else {
      //checkbox checked, remove amenity ID from array
      const index = checkedAmenities.indexOf(amenityId);
      if (index !== -1) {
        checkedAmenities.splice(index, 1);
      }
    }
    const amenitiesList = checkedAmenities
      .map(function (id) {
        return amenityName;
      })
      .join(",");

    $(".popover h4").text(amenitiesList);
  });
});
