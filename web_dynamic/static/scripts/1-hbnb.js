$(document).ready(function () {
  const checkedAmenities = [];

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
