export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${month} ${year}`;
}