declare namespace App {
  interface Locals {
    pb: import('pocketbase').default;
    user: import('$lib/stores/user').User | null;
  }
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}
