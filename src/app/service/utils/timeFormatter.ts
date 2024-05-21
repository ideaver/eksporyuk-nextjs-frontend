import { formatDistanceToNow } from "date-fns";
import { id } from "../../../../node_modules/date-fns/locale/id.js";
export function formatTime(dateString: string) {
  const updatedAt = new Date(dateString);
  const timeAgo = formatDistanceToNow(updatedAt, {
    addSuffix: true,
    locale: id,
  });
  return timeAgo;
}
