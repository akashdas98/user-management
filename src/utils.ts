export function getBirthdateRange({
  minAge,
  maxAge,
}: {
  minAge?: number;
  maxAge?: number;
}): {
  minBirthDate?: { birthYear: number; birthMonth: number; birthDate: number };
  maxBirthDate?: { birthYear: number; birthMonth: number; birthDate: number };
} {
  const currentDate = new Date();

  let minBirthDate:
    | { birthYear: number; birthMonth: number; birthDate: number }
    | undefined = undefined;
  let maxBirthDate:
    | { birthYear: number; birthMonth: number; birthDate: number }
    | undefined = undefined;

  if (minAge) {
    const temp = new Date(
      currentDate.getFullYear() - minAge - 1,
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
    maxBirthDate = {
      birthYear: temp.getFullYear(),
      birthMonth: temp.getMonth() + 1,
      birthDate: temp.getDate(),
    };
  }

  if (maxAge) {
    const temp = new Date(
      currentDate.getFullYear() - maxAge,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    minBirthDate = {
      birthYear: temp.getFullYear(),
      birthMonth: temp.getMonth() + 1,
      birthDate: temp.getDate(),
    };
  }

  return { minBirthDate, maxBirthDate };
}

export function isValidDate(year: number, month: number, day: number): boolean {
  // Check if the provided values are numbers and within valid ranges
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  // Create a Date object with the provided values
  const date = new Date(year, month - 1, day);

  // Check if the date object is valid
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
