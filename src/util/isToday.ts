/**
 * 현재 날짜가 오늘인지 여부를 확인합니다.
 *
 * @param date 확인할 날짜 객체
 * @returns 현재 날짜가 오늘인 경우 true, 그렇지 않은 경우 false
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  console.log("LAST TEST");
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
