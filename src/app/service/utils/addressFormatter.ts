export function formatAddress(userAddress: any) {
  if (
    !userAddress ||
    !userAddress.name ||
    !userAddress.label ||
    !userAddress.subdistrict ||
    !userAddress.subdistrict.district ||
    !userAddress.subdistrict.district.city ||
    !userAddress.subdistrict.district.city.province ||
    !userAddress.subdistrict.district.city.province.country ||
    !userAddress.subdistrict.postalCode
  ) {
    return "Tidak ada Alamat";
  }

  return `${userAddress.name}, ${userAddress.label}, ${userAddress.subdistrict.name}, ${userAddress.subdistrict.district.name}, ${userAddress.subdistrict.district.city.name}, ${userAddress.subdistrict.district.city.province.name}, ${userAddress.subdistrict.district.city.province.country.name}, ${userAddress.subdistrict.postalCode}`;
}
