export function getUniqId(key = 'id') {
  const timestamp = Date.now().toString(36); // Convert time to base-36 string
  const randomNum = Math.random()
    .toString(36)
    .substring(2, 5); // Generate a random alphanumeric string
  const uniqueId = (timestamp + randomNum).substring(0, 8); // Combine and trim to 8 characters
  return key + uniqueId;
}
