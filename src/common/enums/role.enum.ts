/**
 * Two roles per institution: TEACHER holds full authority (manages the
 * institution itself - classes, members, shared materials, notifications -
 * on top of teaching), STUDENT is scoped to their own classes and work.
 * SYSTEM_ADMIN sits above institutions entirely (approves registrations).
 */
export enum Role {
  SYSTEM_ADMIN = 'system_admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}
