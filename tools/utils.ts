export function underscoreToCamelCase(value: string): string {
  return value
    .split("_")
    .map((val, index) => {
      if (index === 0) {
        return val;
      }

      return val.substring(0, 1).toUpperCase() + val.substring(1);
    })
    .join("");
}
