export enum SystemRole {
  Athlete = 'Athlete',
  Coach = 'Coach',
  Admin = 'Admin',
}

export const SystemRoleColors = new Map([
  [SystemRole.Athlete, 'bg-athlete'],
  [SystemRole.Coach, 'bg-coach'],
  [SystemRole.Admin, 'bg-admin'],
]);
