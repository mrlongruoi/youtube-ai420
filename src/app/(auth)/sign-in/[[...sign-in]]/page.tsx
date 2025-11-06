import { SignIn } from '@clerk/nextjs'

/**
 * Renders Clerk's sign-in UI.
 *
 * @returns A React element that displays Clerk's `SignIn` component.
 */
export default function Page() {
  return <SignIn />
}