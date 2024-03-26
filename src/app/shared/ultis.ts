export function formatEnumValue(value: string, enumObj: any, enumText: { [key: number]: string }) : { val: string, label: string} | null {

  if (value) {
    const enumKey = enumObj[value];
    const label = enumText[enumKey];

    return (enumKey !== undefined && label) ? { val: value, label} : null;
  }

  return null;

}
