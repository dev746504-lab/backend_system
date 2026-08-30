/**
 * Two roles total. TEACHER owns/manages their own classes (create classes, add
 * students, assign/grade, upload materials, notify their class). STUDENT is
 * scoped to the classes they're a member of. There is no separate admin role —
 * exactly one User carries `isAdmin: true` (seeded, never API-settable) on top
 * of an otherwise ordinary TEACHER role; see AuthenticatedUser.
 */
export enum Role {
  TEACHER = 'teacher',
  STUDENT = 'student',
}
