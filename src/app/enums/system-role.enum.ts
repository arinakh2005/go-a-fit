export enum SystemRole {
  Athlete = 'Атлет',
  Coach = 'Тренер',
  Admin = 'Адміністратор',
}

export const SystemRoleColors = new Map([
  [SystemRole.Athlete, 'bg-athlete'],
  [SystemRole.Coach, 'bg-coach'],
  [SystemRole.Admin, 'bg-admin'],
]);
