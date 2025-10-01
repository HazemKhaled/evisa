import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@repo/auth";
import Link from "next/link";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-8">
            <Link href="/">
              <h1 className="text-2xl font-bold">GetTravelVisa Admin</h1>
            </Link>
            <SignedIn>
              <nav className="flex gap-6">
                <Link
                  href="/countries"
                  className="hover:text-primary text-sm font-medium"
                >
                  Countries
                </Link>
                <Link
                  href="/visa-types"
                  className="hover:text-primary text-sm font-medium"
                >
                  Visa Types
                </Link>
                <Link
                  href="/eligibility"
                  className="hover:text-primary text-sm font-medium"
                >
                  Eligibility
                </Link>
                <Link
                  href="/blog-posts"
                  className="hover:text-primary text-sm font-medium"
                >
                  Blog Posts
                </Link>
              </nav>
            </SignedIn>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md border px-4 py-2 text-sm font-medium">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SignedOut>
          <div className="flex min-h-[400px] flex-col items-center justify-center">
            <h2 className="mb-4 text-3xl font-bold">Welcome to Admin Panel</h2>
            <p className="text-muted-foreground mb-8">
              Please sign in to access the admin panel
            </p>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Link href="/countries">
                <div className="bg-card text-card-foreground hover:bg-accent rounded-lg border p-6 shadow-sm transition-colors">
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Total Destinations
                  </h3>
                  <p className="text-3xl font-bold">0</p>
                </div>
              </Link>
              <Link href="/visa-types">
                <div className="bg-card text-card-foreground hover:bg-accent rounded-lg border p-6 shadow-sm transition-colors">
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Total Visas
                  </h3>
                  <p className="text-3xl font-bold">0</p>
                </div>
              </Link>
              <Link href="/blog-posts">
                <div className="bg-card text-card-foreground hover:bg-accent rounded-lg border p-6 shadow-sm transition-colors">
                  <h3 className="text-muted-foreground mb-2 text-sm font-medium">
                    Blog Posts
                  </h3>
                  <p className="text-3xl font-bold">0</p>
                </div>
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-xl font-semibold">Quick Actions</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/countries"
                  className="bg-card hover:bg-accent rounded-lg border p-4 text-center transition-colors"
                >
                  <p className="font-medium">Manage Countries</p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Add or edit destination countries
                  </p>
                </Link>
                <Link
                  href="/visa-types"
                  className="bg-card hover:bg-accent rounded-lg border p-4 text-center transition-colors"
                >
                  <p className="font-medium">Manage Visa Types</p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Configure visa options
                  </p>
                </Link>
                <Link
                  href="/eligibility"
                  className="bg-card hover:bg-accent rounded-lg border p-4 text-center transition-colors"
                >
                  <p className="font-medium">Set Eligibility</p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Define visa requirements
                  </p>
                </Link>
                <Link
                  href="/blog-posts"
                  className="bg-card hover:bg-accent rounded-lg border p-4 text-center transition-colors"
                >
                  <p className="font-medium">Create Content</p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Write new blog posts
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}
