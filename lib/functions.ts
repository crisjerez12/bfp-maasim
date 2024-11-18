export const validateDates = (formData: FormData) => {
  const lastIssuance = formData.get("lastIssuance") as string;
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  const lastIssuanceDate = new Date(lastIssuance);
  if (lastIssuanceDate < oneYearAgo || lastIssuanceDate > oneYearFromNow) {
    return "Last issuance date must be within one year before or after today.";
  }
  return null;
};
