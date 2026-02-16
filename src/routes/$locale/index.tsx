import { createFileRoute } from '@tanstack/react-router'
import Hello from '@/components/Hello'

export const Route = createFileRoute('/$locale/')({
  component: Home,
})

function Home() {
  return <Hello />
}