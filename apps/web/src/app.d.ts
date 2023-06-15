declare namespace App {
  interface Locals {
    pb: import('pocketbase').default;
    user: import('$lib/stores/user').User | null;
  }
  interface PageData {
    flash?: { type: 'success' | 'error'; message: string };
  }
  // interface Error {}
  // interface Platform {}
}
